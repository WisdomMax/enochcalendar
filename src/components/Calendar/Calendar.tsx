"use client";

import { useEffect, useState, useMemo } from "react";
import { EnochDate } from "@/types/calendar";
import { getDaysInMonth, getMonthName, getStartIndex, getEnochYearFromGregorian, getGregorianDaysInMonth } from "@/utils/enoch-calendar";
import { fetchFeastData } from "@/utils/fetch-enoch-data";
import DayCell from "./DayCell";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Info, 
  Globe, 
  X, 
  Search, 
  Menu,
  Youtube,
  ExternalLink,
  Home,
  ChevronsLeft, 
  ChevronsRight,
  RefreshCw
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { translations, Language } from '@/lib/i18n';
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { ViewMode } from "@/types/calendar";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [days, setDays] = useState<EnochDate[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("enoch");
  const [externalFeasts, setExternalFeasts] = useState<Partial<EnochDate>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>('ko');
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const GS_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL || "";

  // 브라우저 언어 자동 감지
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    const supportedLangs: Language[] = ['ko', 'en', 'zh', 'es', 'ru', 'pt', 'hi', 'de', 'he', 'ja'];
    if (supportedLangs.includes(browserLang as Language)) {
      setCurrentLang(browserLang as Language);
    } else {
      setCurrentLang('en'); // 기본값 영어
    }
  }, []);

  const t = translations[currentLang];

  // 데이터 기반 가용 월 목록 생성
  const availableMonthsList = useMemo(() => {
    if (!externalFeasts || externalFeasts.length === 0) return [];

    const monthMap = new Map<string, { year: number; month: number }>();
    externalFeasts.forEach(item => {
      if (!item.gregorian || !item.enochMonth) return;
      const year = getEnochYearFromGregorian(item.gregorian);
      const key = `${year}-${item.enochMonth}`;
      if (!monthMap.has(key)) {
        monthMap.set(key, { year, month: item.enochMonth });
      }
    });

    return Array.from(monthMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  }, [externalFeasts]);

  const currentIndex = useMemo(() => {
    return availableMonthsList.findIndex(m => m.year === currentYear && m.month === currentMonth);
  }, [availableMonthsList, currentYear, currentMonth]);

  // [사용자 요청]: 상단 헤더에 현재 에녹 월이 걸쳐 있는 그레고리력 연도 범위를 동적으로 계산
  const displayYearRange = useMemo(() => {
    if (days.length === 0) return `${currentYear}${t.yearUnit}`;
    
    const gregYears = days
      .map(d => d.gregorian ? new Date(d.gregorian).getFullYear() : null)
      .filter((y): y is number => y !== null);
    
    if (gregYears.length === 0) return `${currentYear}${t.yearUnit}`;
    
    const minYear = Math.min(...gregYears);
    const maxYear = Math.max(...gregYears);
    
    if (minYear === maxYear) {
      // 해당 월이 한 그레고리 연도 안에만 있으면 2026~2027년 형식을 위해 한 해 전을 붙여주거나, 
      // 사용자 요청대로 "에녹력은 연도가 따로 없다"는 취지를 살려 범위를 보여줍니다.
      // 여기서는 사용자가 언급한 "2026~2027년" 스타일을 존중하여 해당 에녹 연도의 범위를 보여줍니다.
      return `${currentYear}~${currentYear + 1}${t.yearUnit}`;
    }
    return `${minYear}~${maxYear}${t.yearUnit}`;
  }, [days, currentYear]);

  useEffect(() => {
    async function loadData() {
      if (GS_API_URL) {
        setIsLoading(true);
        try {
          const data = await fetchFeastData(GS_API_URL);
          if (data && data.length > 0) setExternalFeasts(data);
        } catch (error) { console.error("로드 실패:", error); } 
        finally { setIsLoading(false); }
      }
    }
    loadData();
  }, [GS_API_URL]);

  useEffect(() => {
    if (availableMonthsList.length > 0 && currentYear === 2025 && currentMonth === 1) {
      const today = new Date();
      const monthStr = String(today.getMonth() + 1).padStart(2, '0');
      const dayStr = String(today.getDate()).padStart(2, '0');
      const todayGreg = `${today.getFullYear()}-${monthStr}-${dayStr}`;
      
      const match = externalFeasts.find(f => f.gregorian === todayGreg);
      if (match) {
        const year = getEnochYearFromGregorian(match.gregorian!);
        setCurrentYear(year);
        setCurrentMonth(match.enochMonth!);
      } else {
        setCurrentYear(availableMonthsList[0].year);
        setCurrentMonth(availableMonthsList[0].month);
      }
    }
  }, [availableMonthsList, externalFeasts]);

  useEffect(() => {
    if (viewMode === 'enoch') {
      setDays(getDaysInMonth(currentYear, currentMonth, externalFeasts, t.weekdays, t.months));
    } else {
      setDays(getGregorianDaysInMonth(currentYear, currentMonth, externalFeasts));
    }
  }, [currentYear, currentMonth, externalFeasts, t, viewMode]);

  const handlePrevMonth = () => {
    if (currentIndex > 0) {
      const prev = availableMonthsList[currentIndex - 1];
      setCurrentYear(prev.year);
      setCurrentMonth(prev.month);
    }
  };
  const handleNextMonth = () => {
    if (currentIndex < availableMonthsList.length - 1) {
      const next = availableMonthsList[currentIndex + 1];
      setCurrentYear(next.year);
      setCurrentMonth(next.month);
    }
  };
  const handlePrevYear = () => {
    const prevYearIndex = availableMonthsList.findLastIndex(m => m.year < currentYear && m.month === currentMonth);
    if (prevYearIndex !== -1) {
      const prev = availableMonthsList[prevYearIndex];
      setCurrentYear(prev.year);
      setCurrentMonth(prev.month);
    } else {
      const nearest = availableMonthsList.findLast(m => m.year < currentYear);
      if (nearest) { setCurrentYear(nearest.year); setCurrentMonth(nearest.month); }
    }
  };
  const handleNextYear = () => {
    const nextYearIndex = availableMonthsList.findIndex(m => m.year > currentYear && m.month === currentMonth);
    if (nextYearIndex !== -1) {
      const next = availableMonthsList[nextYearIndex];
      setCurrentYear(next.year);
      setCurrentMonth(next.month);
    } else {
      const nearest = availableMonthsList.find(m => m.year > currentYear);
      if (nearest) { setCurrentYear(nearest.year); setCurrentMonth(nearest.month); }
    }
  };

  const handleToday = () => {
    const today = new Date();
    const monthStr = String(today.getMonth() + 1).padStart(2, '0');
    const dayStr = String(today.getDate()).padStart(2, '0');
    const todayGreg = `${today.getFullYear()}-${monthStr}-${dayStr}`;
    
    const match = externalFeasts.find(f => f.gregorian === todayGreg);
    if (match) {
      const year = getEnochYearFromGregorian(match.gregorian!);
      setCurrentYear(year);
      setCurrentMonth(match.enochMonth!);
    }
  };

  const weekdays = ["첫째날", "둘째날", "셋째날", "넷째날", "다섯째날", "여섯째날", "안식일"];
  const startIndex = viewMode === 'enoch' ? getStartIndex(currentMonth) : new Date(currentYear, currentMonth - 1, 1).getDay();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#050b18] z-[999]">
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
          <div className="absolute inset-2 border-2 border-b-blue-500 rounded-full animate-spin-slow opacity-60" />
        </div>
        <p className="text-sm font-black cosmic-gradient-text tracking-[0.4em] animate-pulse uppercase" style={{ fontFamily: "'Kanit', sans-serif" }}>
          {t.title} Loading...
        </p>
      </div>
    );
  }

  if (GS_API_URL && externalFeasts.length === 0) {
    return <div className="p-20 text-white font-bold text-center">불러올 수 있는 에녹 달력 데이터가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center lg:items-start justify-center w-full max-w-[1600px] gap-1 sm:gap-4 lg:gap-14 px-1 md:px-6 py-2 md:py-8 relative min-h-screen lg:min-h-[900px] lg:overflow-visible overflow-x-hidden">
      {/* 불필요한 장식용 네뷸라 효과 제거 */}

      {/* [PC 사이드바 / 모바일 상단 타이틀] */}
      <div className="w-full lg:w-[360px] lg:min-w-[320px] lg:max-w-[380px] flex-shrink-0 flex flex-col gap-4 lg:gap-8 relative z-30 min-w-0">
        <div className="flex flex-col items-center lg:items-start transition-all">
          <div className="lg:hidden w-full px-4 mb-0 relative min-h-[44px] flex items-center justify-start gap-2.5">
             <div className="relative w-8 h-8 shrink-0">
               <img src="/img/icon.svg" alt="Enoch Calendar Icon" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
             </div>
             <h1 className="text-[19px] sm:text-4xl font-black gold-gradient-text tracking-tight sm:tracking-[0.4em] drop-shadow-xl uppercase text-left shadow-amber-500/20 whitespace-nowrap leading-none max-w-[calc(100%-100px)] overflow-hidden text-ellipsis" style={{ fontFamily: "'Kanit', sans-serif" }}>
               {t.title}
             </h1>
             <div className="flex items-center gap-2 absolute right-6">
                {/* 뷰 전환 스위치 (모바일) */}
                <button
                  onClick={() => setViewMode(prev => prev === 'enoch' ? 'gregorian' : 'enoch')}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all text-white shrink-0 shadow-lg active:scale-95"
                  title={t.toggleView}
                >
                  <RefreshCw className={cn("w-4 h-4 transition-transform duration-500", viewMode === 'gregorian' ? "text-cyan-400 rotate-180" : "text-amber-400")} />
                </button>

                <button 
                  onClick={() => setIsLangModalOpen(true)}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all text-white shrink-0 shadow-lg active:scale-95"
                  title={t.selectLanguage}
                >
                  <Globe className="w-4 h-4" />
                </button>
             </div>
          </div>
          
           <div className="hidden lg:flex flex-col gap-8">
            {/* 타이틀 영역 - 대형화 및 다크 글래스 패널 적용 */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-5 backdrop-blur-xl shadow-2xl relative group/card break-words">
              <h1 className="text-3xl lg:text-[40px] font-black text-white leading-[1.1] tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] break-words">
                <span className="cosmic-gradient-text block mb-2 text-xl lg:text-2xl break-words">{t.subtitle}</span>
                {t.title}
              </h1>
              <div className="space-y-3">
                <p className="text-sm lg:text-base font-bold text-cyan-300 tracking-wide border-l-2 border-cyan-500/50 pl-3 py-1 drop-shadow-md leading-tight break-words">
                  {t.descTitle}<br/>
                  {t.descBody}
                </p>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                  {t.systemInfo}
                </p>
              </div>

              {/* 뷰 전환 스위치 (PC) */}
              <button
                onClick={() => setViewMode(prev => prev === 'enoch' ? 'gregorian' : 'enoch')}
                className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500",
                    viewMode === 'enoch' ? "bg-amber-500/20 text-amber-400" : "bg-cyan-500/20 text-cyan-400"
                  )}>
                    <RefreshCw className={cn("w-5 h-5 transition-transform duration-700", viewMode === 'gregorian' && "rotate-180")} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{t.toggleView}</span>
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {viewMode === 'enoch' ? t.enochView : t.gregorianView}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* 사독 제사장 설명 섹션 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-sm break-words">
              <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                {t.zadokTitle}
              </h3>
              <ul className="space-y-2 text-[11px] text-white/70 leading-relaxed font-medium">
                <li className="flex gap-2">
                  <span className="text-cyan-500 font-bold">·</span>
                  <span>{t.zadokDesc1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-500 font-bold">·</span>
                  <span>{t.zadokDesc2}</span>
                </li>
              </ul>
            </div>

            {/* 364일 달력의 근거 섹션 - 가독성 강화 (다크 글래스) */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-2xl break-words">
              <h3 className="text-amber-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                {t.basisTitle}
              </h3>
              <ul className="space-y-3 text-[11px] text-white/70 leading-relaxed font-medium">
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong className="text-white">{t.basisLabel1}:</strong> {t.basisDesc1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong className="text-white">{t.basisLabel2}:</strong> {t.basisDesc2}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong className="text-white">{t.basisLabel3}:</strong> {t.basisDesc3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 유튜브 & 홈페이지 버튼 (PC에서는 사이드바 하단) */}
         <div className="w-full hidden lg:flex flex-row gap-3">
             <a href="https://www.youtube.com/@마지막시대사람들TV" target="_blank" rel="noopener noreferrer" className="flex-1 group flex flex-col items-center justify-center gap-2 p-4 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/60 text-white rounded-2xl transition-all shadow-xl border border-white/10 active:scale-95 scale-100 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-8 h-6 transition-transform group-hover:scale-110 duration-300 shrink-0 flex items-center justify-center">
                <img src="/img/youtube_logo.png" alt="YouTube Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
              </div>
              <span className="text-[10px] font-black relative z-10 cosmic-gradient-text drop-shadow-md whitespace-nowrap uppercase tracking-tighter">YouTube</span>
            </a>
            <a href="https://masisa.whyimstillalive.com/" target="_blank" rel="noopener noreferrer" className="flex-1 group flex flex-col items-center justify-center gap-2 p-4 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/60 text-white rounded-2xl transition-all shadow-xl border border-white/10 active:scale-95 scale-100 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-8 h-8 transition-transform group-hover:scale-110 duration-300 shrink-0 flex items-center justify-center bg-cyan-500/20 rounded-lg p-1.5 border border-cyan-500/30">
                <Home className="w-full h-full text-cyan-300" />
              </div>
              <span className="text-[10px] font-black relative z-10 text-cyan-400 drop-shadow-md whitespace-nowrap uppercase tracking-tighter">Homepage</span>
            </a>
         </div>

        {/* 하단 카피라이트 박스 디자인 - 센터 정렬 및 가독성 최적화 */}
        <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 mt-auto shadow-2xl drop-shadow-xl">
          <p className="text-[10px] font-black text-white tracking-[0.3em] mb-1 opacity-90 uppercase" style={{ fontFamily: "'Kanit', sans-serif" }}>
            © {currentYear} ENOCH CALENDAR
          </p>
          <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">
            POWERED BY MASISA TV
          </p>
        </div>
      </div>

      {/* [캘린더 메인 영역] */}
      <div className="flex-1 w-full max-w-[1000px] min-w-0 flex flex-col gap-2 md:gap-6 relative z-30 lg:overflow-visible">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 bg-slate-900/60 backdrop-blur-xl p-0.5 md:p-5 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center sm:items-start pl-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2 md:gap-3 drop-shadow-lg">
              <span className="cosmic-gradient-text">{displayYearRange}</span>
              <span className="text-white/80">{viewMode === 'enoch' ? getMonthName(currentMonth, t.months) : `${currentMonth}월`}</span>
            </h2>
          </div>

          <div className="w-full md:w-auto flex flex-row items-center justify-between gap-1 md:gap-3 mt-2 md:mt-0 px-1 md:px-0">
            <div className="flex items-center glass-card p-1 rounded-xl bg-white/5 border border-white/10 flex-1 md:w-auto md:min-w-[100px] justify-between h-[48px] shrink-0">
              <button onClick={handlePrevYear} disabled={!availableMonthsList.some(m => m.year < currentYear)} className="flex-1 px-2 hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white border-r border-white/5 disabled:opacity-10 flex justify-center items-center h-full" title={t.prevYear}>
                <ChevronsLeft className="w-5 h-5 md:w-4 md:h-4 font-bold" />
              </button>
              <button onClick={handleNextYear} disabled={!availableMonthsList.some(m => m.year > currentYear)} className="flex-1 px-2 hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white disabled:opacity-10 flex justify-center items-center h-full" title={t.nextYear}>
                <ChevronsRight className="w-5 h-5 md:w-4 md:h-4 font-bold" />
              </button>
            </div>

            <button onClick={handleToday} className="hidden md:block px-5 py-2 h-[48px] bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] hover:bg-blue-600/30 hover:border-blue-400/60 transition-all shadow-lg active:scale-95 blur-backdrop-sm">
              {t.today}
            </button>
            <button onClick={handleToday} className="md:hidden flex-1 px-2 py-2 h-[48px] bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-xl font-black text-[11px] uppercase tracking-[0.05em] hover:bg-blue-600/30 transition-all shadow-lg active:scale-95 flex items-center justify-center shrink-0">
              {t.today}
            </button>
            
            <div className="flex items-center glass-card p-1 rounded-xl bg-white/5 border border-white/10 flex-1 md:w-auto md:min-w-[100px] justify-between h-[48px] shrink-0">
              <button onClick={handlePrevMonth} disabled={currentIndex <= 0} className="flex-1 px-2 hover:bg-white/10 rounded-lg transition-all disabled:opacity-10 border-r border-white/5 flex justify-center items-center h-full" title={t.prevMonth}>
                <ChevronLeft className="w-5 h-5 md:w-5 md:h-5 text-white/50 hover:text-white" />
              </button>
              <button onClick={handleNextMonth} disabled={currentIndex < 0 || currentIndex >= availableMonthsList.length - 1} className="flex-1 px-2 hover:bg-white/10 rounded-lg transition-all disabled:opacity-10 flex justify-center items-center h-full" title={t.nextMonth}>
                <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-white/50 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full relative rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-visible bg-slate-900/40 backdrop-blur-md px-0 md:px-0">
          <div className="glass-card rounded-3xl border border-white/10 shadow-3xl overflow-visible backdrop-blur-xl relative bg-slate-900/60">
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl pointer-events-none" />
          
          {/* 요일 헤더 - overflow-visible을 위해 상단 모서리 라운딩 처리 직접 적용 */}
          <div className="grid grid-cols-7 border-b border-white/10 bg-white/10 relative z-20 rounded-t-3xl overflow-hidden">
            {(viewMode === 'enoch' ? t.weekdays : t.gregorianWeekdays).map((day, i) => (
              <div key={day} className={cn(
                "py-3 md:py-5 text-center font-black tracking-tighter sm:tracking-widest uppercase flex items-center justify-center px-0.5",
                // 텍스트 길이에 따라 폰트 크기 조절
                day.length > 5 ? "text-[8px] sm:text-[10px] md:text-sm" : "text-[10px] md:text-sm",
                (viewMode === 'enoch' ? i === 6 : i === 0) ? "text-amber-400/90 bg-amber-400/5" : "text-white/40"
              )}>
                <span className="break-all line-clamp-2">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 h-auto min-h-[430px] md:h-[660px] relative divide-x divide-y divide-white/5 bg-slate-900/40 z-10 rounded-b-3xl overflow-visible">
              {Array.from({ length: startIndex }).map((_, i) => {
                if (viewMode === 'enoch' && currentMonth === 1 && i === startIndex - 1) {
                  const equinoxDay: EnochDate = { enochMonth: 1, enochDay: 0, monthName: t.months[0], nthDay: 0, weekday: t.weekdays[1], gregorian: "", feast: t.equinox, isEquinox: true };
                  return <DayCell key="equinox-start" day={equinoxDay} colIndex={i} rowIndex={0} language={currentLang} viewMode={viewMode} />;
                }
                return <div key={`empty-${i}`} className="bg-slate-950/20" />;
              })}

              {days.map((day, index) => (
                <DayCell 
                  key={`${currentYear}-${day.enochMonth}-${day.enochDay}-${day.gregorian}`} 
                  day={day} 
                  colIndex={(startIndex + index) % 7} 
                  rowIndex={Math.floor((startIndex + index) / 7)} 
                  language={currentLang}
                  viewMode={viewMode}
                />
              ))}

              {Array.from({ length: 42 - (days.length + startIndex) }).map((_, i) => {
                const globalIndex = days.length + startIndex + i;
                if (currentMonth === 12 && i === 0) {
                  const equinoxDay: EnochDate = { enochMonth: 12, enochDay: 32, monthName: t.months[11], nthDay: 365, weekday: "", gregorian: "", feast: t.equinox, isEquinox: true };
                  return <DayCell key="equinox-end" day={equinoxDay} colIndex={globalIndex % 7} rowIndex={Math.floor(globalIndex / 7)} language={currentLang} viewMode={viewMode} />;
                }
                return <div key={`fill-${i}`} className="bg-transparent/5" />;
              })}
            </div>
          </div>
        </div>

         <div className="lg:hidden w-full pt-4 pb-12 flex justify-center mt-2">
           <div className="flex items-center justify-between w-full max-w-sm px-6 py-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
             <div className="flex items-center gap-4">
               <a href="https://www.youtube.com/@마지막시대사람들TV" target="_blank" rel="noopener noreferrer" className="group shrink-0">
                  <div className="relative w-10 h-8 flex items-center justify-center transition-transform hover:scale-110">
                    <img src="/img/youtube_logo.png" alt="YouTube" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                  </div>
               </a>
               <a href="https://masisa.whyimstillalive.com/" target="_blank" rel="noopener noreferrer" className="group shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-300 transition-transform hover:scale-110 active:scale-95">
                    <Home className="w-5 h-5 shadow-[0_0_10px_rgba(34,211,238,0.4)]" />
                  </div>
               </a>
             </div>
            <div className="flex flex-col items-end text-right">
               <p className="text-[10px] font-black text-white tracking-[0.2em] mb-1 opacity-90 uppercase" style={{ fontFamily: "'Kanit', sans-serif" }}>
                 © {currentYear} ENOCH CALENDAR
               </p>
               <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">
                 POWERED BY MASISA TV
               </p>
            </div>
          </div>
        </div>
        {/* 언어 선택 모달 */}
        {isLangModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsLangModalOpen(false)} />
            <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden animate-scale-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                  <Globe className="w-6 h-6 text-amber-500" />
                  {t.selectLanguage}
                </h3>
                <button 
                  onClick={() => setIsLangModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'ko', name: '한국어', flag: '🇰🇷' },
                  { id: 'en', name: 'English', flag: '🇺🇸' },
                  { id: 'zh', name: '中文', flag: '🇨🇳' },
                  { id: 'es', name: 'Español', flag: '🇪🇸' },
                  { id: 'ru', name: 'Русский', flag: '🇷🇺' },
                  { id: 'pt', name: 'Português', flag: '🇧🇷' },
                  { id: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
                  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
                  { id: 'he', name: 'עברית', flag: '🇮🇱' },
                  { id: 'ja', name: '日本語', flag: '🇯🇵' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setCurrentLang(lang.id as Language);
                      setIsLangModalOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all hover:scale-105 active:scale-95 group",
                      currentLang === lang.id 
                        ? "bg-amber-500/10 border-amber-500 text-amber-100" 
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{lang.flag}</span>
                    <span className="text-xs font-bold tracking-wider">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
