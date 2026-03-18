import { EnochDate } from "@/types/calendar";

/**
 * 구글 Apps Script 웹 앱 URL로부터 절기 데이터를 가져옵니다.
 * 구글 시트 구조 예시:
 * | enochMonth | enochDay | feast |
 * |------------|----------|-------|
 * | 1          | 1        | 새해  |
 */
export async function fetchFeastData(url: string): Promise<Partial<EnochDate>[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from Google Sheets");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching feast data:", error);
    return [];
  }
}
