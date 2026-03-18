export interface EnochDate {
  gregorian: string; // YYYY-MM-DD
  enochMonth: number; // 1~12
  enochDay: number; // 1~31
  weekday: string; // 일~토
  monthName: string; // 에녹력 월 이름 (예: 1월, 2월...)
  nthDay: number; // 1년 중 몇 번째 날인지
  feast: string; // 절기 이름 (없으면 빈 문자열)
  isEquinox?: boolean; // 춘분점 여부
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: EnochDate[];
}
