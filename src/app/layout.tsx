import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enoch Calendar - Biblical Solar 364-Day Calendar",
  description: "사독 제사장의 사해문서에서 발견된 성경적 364일 히브리 양력, 에녹달력을 만나보세요. 노아의 방주와 성경 속 시간의 질서를 회복하는 정밀한 계산법을 제공합니다.",
  keywords: [
    "Enoch Calendar", "Priest Zadok", "Dead Sea Scrolls", "Hebrew Solar Calendar", "364-day calendar", "360-day calendar", "Noaic Calendar", "Biblical Calendar Calculation",
    "에녹달력", "사독달력", "사독 제사장", "사해문서", "히브리 양력", "364일 달력", "360일 달력", "성경적 달력 계산법", "노아의 방주 달력 계산법", "계시계", "성경 달력",
    "以诺历", "撒督祭司", "死海古卷",
    "Calendario de Enoc", "Sacerdote Sadoc", "Rollos del Mar Muerto",
    "Календарь Еноха", "Священник Садок", "Свитки Мертвого моря",
    "Calendário de Enoque", "Sacerdote Zadoque", "Manuscritos do Mar Morto",
    "हनोक कैलेंडर", "पुजारी सादोक", "मृत सागर स्क्रॉल",
    "Enoch-Kalender", "Priester Zadok", "Schriftrollen vom Toten Meer",
    "לוח חנוך", "הכהן צדוק", "מגילות ים המלח",
    "エノクの暦", "祭司サドク", "死海文書"
  ],
  authors: [{ name: "ENOCH CALENDAR TEAM" }],
  openGraph: {
    title: "Enoch Calendar - 에녹달력 (성경적 364일 히브리 양력)",
    description: "성경 속 잃어버린 시간의 조각, 사독 제사장의 364일 에녹달력을 확인해보세요.",
    type: "website",
    url: "https://enoch-calendar.web.app", // 실제 URL로 변경 가능
    images: [
      {
        url: "/img/enoch_bg.webp",
        width: 1200,
        height: 630,
        alt: "Enoch Calendar Background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enoch Calendar - 에녹달력 (성경적 364일 히브리 양력)",
    description: "성경 속 잃어버린 시간의 조각, 사독 제사장의 364일 에녹달력을 확인해보세요.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-gray-900`}>{children}</body>
    </html>
  );
}
