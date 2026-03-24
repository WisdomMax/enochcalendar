"use client";

import { useState } from "react";
import { EnochDate } from "@/types/calendar";
import { isToday } from "@/utils/enoch-calendar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ViewMode } from "@/types/calendar";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DayCellProps {
  day: EnochDate;
  colIndex: number;
  rowIndex: number;
  language: string;
  viewMode: ViewMode;
}

export default function DayCell({ day, colIndex, rowIndex, language, viewMode }: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const today = isToday(day.gregorian);
  const isSabbath = day.weekday === "안식일" || (day.feast && day.feast.includes("안식일"));
  
  // "안식일"이라는 글자만 있는 경우는 일반 안식일로 처리 (배경색 변경 방지)
  const hasSpecialFeast = !!day.feast && day.feast !== "안식일";
  const hasAnyFeast = !!day.feast;

  // 위치 전략
  const isLeftSide = colIndex <= 1;
  const isRightSide = colIndex >= 5;
  const isFirstRow = rowIndex === 0;

  // 번역 데이터 가져오기
  const i18n = require("@/lib/i18n");
  const t = i18n.translations[language || 'ko'];

  // 날짜 숫자 결정
  const mainDate = viewMode === 'enoch' ? day.enochDay : parseInt(day.gregorian.split('-')[2] || "0");
  const subDateText = viewMode === 'enoch' ? "" : (day.enochMonth > 0 ? `${day.enochMonth}/${day.enochDay}` : "");

  // 절기 텍스트 실시간 번역 헬퍼
  const translateFeastInText = (text: string) => {
    if (!text || !t.feastNames) return text;
    
    // 한국어 설정인 경우 원본 유지 (안식일 자동 추가 규칙만 적용 가능하지만 일단 유지)
    if (language === 'ko') return text;

    let translated = text;
    const isUnleavened = text.includes("무교절");
    const isTabernacles = text.includes("장막절") || text.includes("초막절");
    const numMatch = text.match(/\d+/);
    const dayNum = numMatch ? parseInt(numMatch[0]) : null;

    // 1. 기본 번역 수행 (긴 문자열부터)
    const sortedKeys = Object.keys(t.feastNames).sort((a, b) => b.length - a.length);
    sortedKeys.forEach(ko => {
      if (ko !== "일차" && translated.includes(ko)) {
        translated = translated.split(ko).join(t.feastNames[ko]);
      }
    });

    // 2. '일차' 특수 처리 및 안식일 규칙 적용
    if (text.includes("일차") && dayNum !== null) {
      const unit = t.feastNames["일차"] || "Day";
      let baseFeast = "";
      if (isUnleavened) baseFeast = t.feastNames["무교절"];
      else if (isTabernacles) baseFeast = t.feastNames["초막절"] || t.feastNames["장막절"];

      // 언어별 조합 (예: Unleavened Bread Day 1)
      if (baseFeast) {
        if (language === 'en' || language === 'es' || language === 'pt' || language === 'de') {
          translated = `${baseFeast} ${unit} ${dayNum}`;
        } else if (language === 'ja' || language === 'zh') {
          translated = `${baseFeast} ${dayNum}${unit}`;
        } else {
          translated = `${baseFeast} ${dayNum}${unit}`;
        }
      } else {
        // 절기명이 명확하지 않은 일반 n일차
        translated = language === 'en' ? `${unit} ${dayNum}` : `${dayNum}${unit}`;
      }

      // 3. 성경적 안식일 규칙 자동 추가 (무교절 1,7 / 초막절 1,8)
      const isBiblicalSabbath = (isUnleavened && (dayNum === 1 || dayNum === 7)) || 
                               (isTabernacles && (dayNum === 1 || dayNum === 8));
      
      if (isBiblicalSabbath) {
        const sabbathLabel = t.feastNames["절기안식일"] || t.sabbath;
        translated += `\n(${sabbathLabel})`;
      }
    }

    return translated;
  };

  const renderFeast = (text: string, isTooltip: boolean = false) => {
    // [초강력 긴급 보정]: 한국어 설정인 경우 툴팁 포함 모든 영역에서 데이터베이스 원천 텍스트를 절대로 변형하지 않고 원본 그대로 1:1 출력합니다.
    if (language === 'ko') {
      if (!text) return null;
      const lines = text.split('\n');
      return (
        <div className={cn(
          "flex flex-col items-center justify-center w-full",
          !isTooltip && "md:flex-row md:flex-wrap md:gap-x-1.5",
          isTooltip ? "gap-2" : "leading-[1.05]"
        )}>
          {lines.map((line, i) => (
            <span key={i} className={cn(
              "block w-full md:w-auto text-center font-bold",
              isTooltip ? "text-lg md:text-2xl" : (
                // 7글자까지는 한 줄에 나오도록 강제 (예: 무교절 1일차)
                line.length > 7 
                  ? "text-[7px] sm:text-[8.5px] md:text-lg break-all md:break-normal md:whitespace-nowrap tracking-tighter" 
                  : line.length > 5
                    ? "text-[7.5px] sm:text-[9.5px] md:text-xl whitespace-nowrap tracking-tighter"
                    : "text-[9px] sm:text-[10px] md:text-xl whitespace-nowrap"
              )
            )}>
              {line}
            </span>
          ))}
        </div>
      );
    }

    const translatedText = translateFeastInText(text);
    
    // 텍스트 길이에 따른 폰트 크기 계산 (보수적으로 전면 재조정)
    const getFontSizeClass = (str: string) => {
      if (isTooltip) return "text-sm md:text-2xl";
      if (!str) return "";
      
      const len = str.length;
      const isLatin = /[a-zA-Z]/.test(str);
      
      if (isLatin) {
        if (len > 25) return "text-[5.5px] sm:text-[6.5px] md:text-[8px]"; 
        if (len > 18) return "text-[6px] sm:text-[7.5px] md:text-[9px]";
        if (len > 12) return "text-[7.5px] sm:text-[8.5px] md:text-xs";
        if (len > 7) return "text-[8px] sm:text-[9.5px] md:text-sm"; // Sabbath (7), Trumpets (8) 대응
        return "text-[9.5px] sm:text-xs md:text-base";
      } else {
        // 비-라틴어(중국어, 일본어, 히브리어 등)
        if (len > 10) return "text-[6.5px] sm:text-[7.5px] md:text-sm";
        if (len > 6) return "text-[7.5px] sm:text-[8.5px] md:text-base";
        if (len > 4) return "text-[8.5px] sm:text-[9.5px] md:text-lg";
        return "text-[10px] sm:text-xs md:text-xl";
      }
    };

    const isLatin = /[a-zA-Z]/.test(translatedText);

    // 괄호가 있는 경우 (예: "속죄일 (절기안식일)")
    if (translatedText.includes("(")) {
      const parts = translatedText.split("(");
      const mainPart = parts[0].trim();
      const subPart = parts[1].replace(")", "").trim();
      
      const mainLines = mainPart.split("\n");
      
      return (
        <div className={cn(
          "flex flex-col items-center justify-center leading-[1.05] w-full",
          !isTooltip && "md:flex-row md:flex-wrap md:gap-x-1.5"
        )}>
          {mainLines.map((line, i) => (
            <span key={i} className={cn(
              getFontSizeClass(line), 
              "font-bold block w-full md:w-auto text-center tracking-tighter md:whitespace-nowrap md:break-normal",
              isLatin ? (line.length > 10 ? "break-all" : "whitespace-nowrap") : "break-keep"
            )}>
              {line}
            </span>
          ))}
          <span className={cn(
            "font-normal opacity-90 block w-full text-center",
            isTooltip ? "text-sm mt-1" : "text-[6px] sm:text-[9px] md:text-[11px] mt-0.5"
          )}>
            ({subPart})
          </span>
        </div>
      );
    }

    const lines = translatedText.split("\n");
    return (
      <div className={cn(
        "flex flex-col items-center justify-center leading-[1.05] w-full",
        !isTooltip && "md:flex-row md:flex-wrap md:gap-x-1.5"
      )}>
        {lines.map((line, i) => (
          <span key={i} className={cn(
            getFontSizeClass(line),
            "block w-full md:w-auto text-center font-bold tracking-tighter sm:tracking-normal md:whitespace-nowrap md:break-normal",
            isLatin ? (line.length > 8 ? "break-words" : "whitespace-nowrap") : "break-keep"
          )}>
            {line}
          </span>
        ))}
      </div>
    );
  };

  // 그레고리력 요일 계산
  const getGregorianWeekday = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : language, { weekday: 'long' });
  };

  if (day.isEquinox) {
    const equinoxLabel = t.equinox;
    const isLongEquinox = equinoxLabel.length > 8; // 단어가 길어질 때 기준 강화

    return (
      <div className="relative min-h-[82px] md:min-h-[110px] p-0.5 sm:p-1 md:p-3 flex items-center justify-center bg-gradient-to-br from-yellow-500/40 to-amber-700/30 glow-gold font-bold backdrop-blur-md overflow-hidden group border border-yellow-500/50">
        <div className="absolute inset-0 bg-yellow-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
        <div className="flex flex-col items-center relative z-10 transition-transform group-hover:scale-105 duration-500 w-full px-1">
          <span className="text-[7px] sm:text-[9px] md:text-sm text-yellow-200 uppercase tracking-tighter md:tracking-[0.25em] font-black mb-0.5 md:mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap overflow-hidden text-ellipsis">
            EQUINOX
          </span>
          <span className={cn(
            "text-white font-black drop-shadow-[0_0_15px_rgba(251,191,36,1)] text-center w-full leading-[1.1]",
            isLongEquinox 
              ? (equinoxLabel.length > 12 
                  ? "text-[9px] sm:text-base md:text-2xl break-all" 
                  : "text-[9px] sm:text-base md:text-2xl break-keep tracking-tight")
              : "text-[9px] sm:text-lg md:text-3xl whitespace-nowrap"
          )}>
            {equinoxLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => {
        if (!showTooltip) setShowTooltip(true);
      }}
      className={cn(
        "relative min-h-[82px] md:min-h-[110px] p-0.5 sm:p-1 md:p-2 cursor-pointer transition-all duration-300 hover:bg-white/20 flex flex-col group border-transparent",
        today ? "bg-cyan-500/30 glow-cyan ring-2 ring-cyan-300/60 shadow-[0_0_30px_rgba(0,242,255,0.3)]" : "bg-slate-900/60 hover:bg-slate-800/80",
        hasSpecialFeast && "bg-indigo-900/40",
        showTooltip ? "z-[100]" : (today ? "z-30" : "z-0")
      )}
    >
      {/* 오늘 날짜 하이라이트 레이어 */}
      {today && (
        <div className="absolute inset-0 border-2 border-cyan-300 shadow-[inset_0_0_25px_rgba(0,242,255,0.2)] pointer-events-none z-[60] animate-pulse" />
      )}

      {/* 상단: 날짜 및 오늘 라벨 - PC 버전에서 구석으로 더 이동 */}
      <div className="flex items-start justify-between relative z-20 min-h-0 ml-1 mt-0.5 md:-ml-0.5 md:-mt-1 w-full pr-1">
        <div className="flex flex-col items-start">
          <span
            className={cn(
              "text-xl sm:text-2xl md:text-4xl font-black tracking-tighter leading-none transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]",
              isSabbath ? "text-amber-400" : "text-white/90 group-hover:text-white",
              today && "text-cyan-300 drop-shadow-[0_0_20px_rgba(0,242,255,1)]"
            )}
          >
            {mainDate}
          </span>
          {today && (
            <div className="flex flex-col items-start pt-0.5 md:pt-1">
              <span className="text-[7px] md:text-[10px] bg-cyan-400 text-slate-950 px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded-md font-black shadow-[0_0_15px_rgba(0,242,255,0.7)] scale-90 md:scale-100 origin-left uppercase tracking-tighter md:tracking-[0.1em] animate-pulse whitespace-nowrap">
                {t.today}
              </span>
            </div>
          )}
        </div>
        
        {/* 서브 날짜 표시 (그레고리안 모드일 때 에녹 날짜) */}
        {viewMode === 'gregorian' && subDateText && (
          <span className="text-[9px] md:text-sm font-bold text-white/30 group-hover:text-white/50 transition-colors pt-1">
            {subDateText}
          </span>
        )}
      </div>

      {/* 셀 중심 정보 (절기/안식일) - 가독성 극대화 */}
      <div className="flex-1 flex flex-col items-center pointer-events-none w-full justify-center text-center py-1 relative z-20 min-h-0">
        {(day.feast || (isSabbath ? "안식일" : "")) && (
          <div className="w-full text-center px-1">
            <div className="text-white text-[10px] sm:text-xs md:text-lg font-black leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
              {renderFeast(day.feast || (isSabbath ? "안식일" : ""))}
            </div>
          </div>
        )}
      </div>

      {showTooltip && (
        <div 
          className={cn(
            "fixed md:absolute z-[999] w-[160px] md:w-80 glass-card p-4 md:p-8 rounded-xl md:rounded-2xl animate-in fade-in zoom-in slide-in-from-bottom-6 duration-500 pointer-events-none backdrop-blur-[40px] shadow-[0_30px_80px_rgba(0,0,0,1)] border-white/30 bg-slate-900/95",
            rowIndex < 2 ? "top-1/4 mt-16 md:top-full md:mt-6" : "top-1/4 mt-[-60px] md:bottom-full md:mb-8 md:top-auto",
            "left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0",
            !isLeftSide && !isRightSide && "md:left-1/2 md:-translate-x-1/2",
            isLeftSide && "md:left-0",
            isRightSide && "md:right-0"
          )}
        >
          <div className="space-y-2 md:space-y-4">
            <div className="text-center space-y-1.5 md:space-y-3">
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg md:text-3xl font-black text-white font-mono tracking-tighter drop-shadow-xl">
                  {day.gregorian.replace(/-/g, '. ')}
                </p>
                <p className="text-xs md:text-xl font-bold text-cyan-50 bg-cyan-500/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-cyan-400/30 shadow-inner">
                  {getGregorianWeekday(day.gregorian)}
                </p>
              </div>
            </div>
            
            {day.feast && (
              <div className="pt-3 md:pt-4 border-t border-white/20">
                <div className="text-sm md:text-2xl font-black text-white tracking-tight text-center leading-snug drop-shadow-2xl bg-amber-500/10 py-2 md:py-4 rounded-xl md:rounded-3xl border border-amber-400/20 shadow-inner">
                  {renderFeast(day.feast, true)}
                </div>
              </div>
            )}
          </div>
          
          {/* 장식용 화살표 (더 강조된 앵커) */}
          <div className={cn(
            "absolute w-6 h-6 bg-slate-900 border-white/30 border rotate-45 hidden md:block",
            rowIndex < 2 ? "-top-3 left-1/2 -translate-x-1/2 border-b-0 border-r-0" : "-bottom-3 left-1/2 -translate-x-1/2 border-t-0 border-l-0"
          )} />
        </div>
      )}
    </div>
  );
}
