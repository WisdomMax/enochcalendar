import { EnochDate } from "@/types/calendar";

// 에녹달력 특징: 3, 6, 9, 12월은 31일, 나머지는 30일 (총 364일)
const DAYS_IN_MONTH = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];

const START_DAY_MAP: Record<number, number> = {
  1: 3, 2: 5, 3: 0, 4: 3, 5: 5, 6: 0, 
  7: 3, 8: 5, 9: 0, 10: 3, 11: 5, 12: 0
};

// [중요 로직 보정]: 3월 19일 2027 등이 여전히 2026년으로 묶이도록 연도 판별 기준을 수정
// 364일로 나누면 하루 차이로 2027년으로 넘어가버리는 현상이 발생하여, 
// 그레고리력 새해 주기(약 365.25일)에 가까운 값을 기준으로 연도(그룹)를 판별합니다.
export const getEnochYearFromGregorian = (gregorianStr: string): number => {
  const gDate = new Date(gregorianStr);
  if (isNaN(gDate.getTime())) return 2025;
  const baseDate = new Date("2025-03-21");
  const diffTime = gDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 365일을 기준으로 나누면 2027년 3월 19일도 2025 + Math.floor(728 / 365) = 2026년에 남습니다.
  return 2025 + Math.floor(diffDays / 365);
};

export const getDaysInMonth = (year: number, month: number, externalFeasts: Partial<EnochDate>[] = [], weekdays: string[] = [], langMonths?: string[]): EnochDate[] => {
  const daysCount = DAYS_IN_MONTH[month - 1];
  const days: EnochDate[] = [];
  const weekdaysList = weekdays.length > 0 ? weekdays : ["첫째날", "둘째날", "셋째날", "넷째날", "다섯째날", "여섯째날", "안식일"];
  const startIndex = START_DAY_MAP[month] || 0;
  
  for (let d = 1; d <= daysCount; d++) {
    const weekdayIndex = (startIndex + d - 1) % 7;
    const weekday = weekdaysList[weekdayIndex];

    const foundExternals = externalFeasts.filter(item => {
      if (!item.gregorian || item.enochMonth !== month || item.enochDay !== d) return false;
      const itemEnochYear = getEnochYearFromGregorian(item.gregorian);
      return itemEnochYear === year;
    });
    
    const gregorian = foundExternals[0]?.gregorian || "";
    const feast = foundExternals.map(f => f.feast).filter(Boolean).join('\n');

    days.push({
      enochMonth: month,
      enochDay: d,
      monthName: langMonths ? langMonths[month - 1] : `${month}월`,
      nthDay: 0, // 사용하지 않으므로 0 처리
      weekday,
      gregorian,
      feast,
      isEquinox: false
    });
  }

  return days;
};

export const isToday = (gregorianDate: string): boolean => {
  if (!gregorianDate) return false;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return gregorianDate === todayStr;
};

export const getMonthName = (month: number, langMonths?: string[]): string => langMonths ? langMonths[month - 1] : `${month}월`;
export const getStartIndex = (month: number): number => START_DAY_MAP[month] || 0;
