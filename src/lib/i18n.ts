export type Language = 'ko' | 'en' | 'zh' | 'es' | 'ru' | 'pt' | 'hi' | 'de' | 'he' | 'ja';

export interface Translations {
  title: string;
  subtitle: string;
  descTitle: string;
  descBody: string;
  sabbathInfo: string;
  sabbathDesc: string;
  youtubeButton: string;
  today: string;
  prevYear: string;
  nextYear: string;
  prevMonth: string;
  nextMonth: string;
  equinox: string;
  sabbath: string;
  weekdays: string[];
  months: string[];
  selectLanguage: string;
  poweredBy: string;
  yearUnit: string;
  zadokTitle: string;
  zadokDesc1: string;
  zadokDesc2: string;
  basisTitle: string;
  basisDesc1: string;
  basisDesc2: string;
  basisDesc3: string;
  basisLabel1: string;
  basisLabel2: string;
  basisLabel3: string;
  systemInfo: string;
  feastNames: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
  ko: {
    title: "Enoch Calendar",
    subtitle: "사독 제사장이 사용한",
    descTitle: "사해 문서에서 발견된",
    descBody: "히브리 전통 양력 달력",
    sabbathInfo: "불변의 질서",
    sabbathDesc: "매년 날짜와 요일이 고정됩니다.",
    youtubeButton: "YouTube 채널 바로가기",
    today: "오늘",
    prevYear: "이전 연도",
    nextYear: "다음 연도",
    prevMonth: "이전 달",
    nextMonth: "다음 달",
    equinox: "춘분점",
    sabbath: "안식일",
    weekdays: ["첫째날", "둘째날", "셋째날", "넷째날", "다섯째날", "여섯째날", "안식일"],
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    selectLanguage: "언어 선택",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "년",
    zadokTitle: "사독 제사장이란?",
    zadokDesc1: "다윗 시대부터 이어진 정통 제사장 가문의 시조입니다.",
    zadokDesc2: "에스겔서에서 '참된 제사장'으로 인정받은 가문입니다.",
    basisTitle: "364일 달력의 근거",
    basisDesc1: "노아 홍수 기사 등에서 한 달을 30일(12개월)로 계산하는 방식이 나타납니다.",
    basisDesc2: "천체론 장에서 해와 달, 별들의 운행 법칙을 통해 364일의 완전한 주기를 명시합니다.",
    basisDesc3: "매년 날짜와 요일이 고정되어 하나님의 창조 질서를 완벽히 반영합니다.",
    basisLabel1: "성경적 근거",
    basisLabel2: "에녹 1서",
    basisLabel3: "불변의 질서",
    systemInfo: "364일 / 360일 체계",
    feastNames: {
      "유월절": "유월절", "무교절": "무교절", "초실절": "초실절", "오순절": "오순절", "나팔절": "나팔절", "속죄일": "속죄일", "초막절": "초막절", "춘분점": "춘분점", "안식일": "안식일", "절기안식일": "절기안식일", "일차": "일차", "새해시작": "새해시작", "새달일": "새달일", "성경적 새해": "성경적 새해", "성경적새해": "성경적 새해"
    }
  },
  en: {
    title: "Enoch Calendar",
    subtitle: "Used by Priest Zadok",
    descTitle: "Found in the Dead Sea Scrolls",
    descBody: "Hebrew Traditional Solar Calendar",
    sabbathInfo: "Immutable Order",
    sabbathDesc: "Dates and weekdays are fixed every year.",
    youtubeButton: "Visit YouTube Channel",
    today: "Today",
    prevYear: "Prev Year",
    nextYear: "Next Year",
    prevMonth: "Prev Month",
    nextMonth: "Next Month",
    equinox: "Equinox",
    sabbath: "Sabbath",
    weekdays: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Sabbath"],
    months: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"],
    selectLanguage: "Select Language",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "Who is Priest Zadok?",
    zadokDesc1: "Ancestor of the authentic priestly line from David's time.",
    zadokDesc2: "Recognized as the 'True Priest' in the Book of Ezekiel.",
    basisTitle: "Basis of 364-Day Calendar",
    basisDesc1: "Accounts such as Noah's flood show a system of 12 months with 30 days each.",
    basisDesc2: "The Astronomical Book specifies a complete 364-day cycle through the celestial laws.",
    basisDesc3: "Dates and weekdays are fixed every year, perfectly reflecting God's order of creation.",
    basisLabel1: "Biblical Basis",
    basisLabel2: "1 Enoch",
    basisLabel3: "Immutable Order",
    systemInfo: "364-Day / 360-Day System",
    feastNames: {
      "유월절": "Passover", "무교절": "Unleavened Bread", "초실절": "First Fruits", "오순절": "Pentecost", "나팔절": "Trumpets", "속죄일": "Atonement", "초막절": "Tabernacles", "춘분점": "Equinox", "안식일": "Sabbath", "절기안식일": "Feast Sabbath", "일차": "Day", "새해시작": "New Year Start", "새달일": "New Month Day", "성경적 새해": "Biblical New Year", "성경적새해": "Biblical New Year"
    }
  },
  zh: {
    title: "以诺历",
    subtitle: "祭司撒督所使用",
    descTitle: "发现于死海古卷",
    descBody: "希伯来传统太阳历",
    sabbathInfo: "永恒的秩序",
    sabbathDesc: "每年日期和星期固定。",
    youtubeButton: "访问 YouTube 频道",
    today: "今天",
    prevYear: "上一年",
    nextYear: "下一年",
    prevMonth: "上个月",
    nextMonth: "下个月",
    equinox: "春分点",
    sabbath: "安息日",
    weekdays: ["第一日", "第二日", "第三日", "第四日", "第五日", "第六日", "安息日"],
    months: ["1月", "2月", "3月", "4月", "5월", "6月", "7월", "8월", "9月", "10月", "11月", "12月"],
    selectLanguage: "选择语言",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "年",
    zadokTitle: "祭司撒督是谁？",
    zadokDesc1: "自大卫时代以来正统祭司世系的祖先。",
    zadokDesc2: "在以西结书中被承认为'真实的祭司'的家族。",
    basisTitle: "364天历法的依据",
    basisDesc1: "诺亚方舟的记载等显示了一个每月30天，共12个月的体系。",
    basisDesc2: "天文书通过天体运行规律明确规定了364天的完整周期。",
    basisDesc3: "每年日期和星期固定，完美体现上帝的创造秩序。",
    basisLabel1: "圣经依据",
    basisLabel2: "以诺一书",
    basisLabel3: "永恒秩序",
    systemInfo: "364天 / 360天 体系",
    feastNames: {
      "유월절": "逾越节", "무교절": "无酵节", "초실절": "初熟节", "五旬节": "五旬节", "나팔절": "吹角节", "속죄일": "赎罪日", "초막절": "住棚节", "춘분점": "春分点", "안식일": "安息日", "절기안식일": "节期安息日", "일차": "日", "새해시작": "新年伊始", "새달일": "新月日", "성경적 새해": "圣经新年", "성경적새해": "圣经新年"
    }
  },
  es: {
    title: "Calendario de Enoc",
    subtitle: "Usado por el Sacerdote Sadoc",
    descTitle: "Encontrado en los Rollos del Mar Muerto",
    descBody: "Calendario solar tradicional hebreo",
    sabbathInfo: "Orden Inmutable",
    sabbathDesc: "Las fechas y días de la semana son fijos.",
    youtubeButton: "Visitar Canal de YouTube",
    today: "Hoy",
    prevYear: "Año Anterior",
    nextYear: "Año Siguiente",
    prevMonth: "Mes Anterior",
    nextMonth: "Mes Siguiente",
    equinox: "Equinoccio",
    sabbath: "Sábado",
    weekdays: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6", "Sábado"],
    months: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6", "Mes 7", "Mes 8", "Mes 9", "Mes 10", "Mes 11", "Mes 12"],
    selectLanguage: "Seleccionar Idioma",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "¿Quién es el Sacerdote Sadoc?",
    zadokDesc1: "Ancestro de la línea sacerdotal auténtica desde la época de David.",
    zadokDesc2: "Reconocida como la familia de 'Sacerdotes Verdaderos' en el Libro de Ezequiel.",
    basisTitle: "Base del Calendario de 364 Días",
    basisDesc1: "Relatos como el diluvio de Noé muestran un sistema de 12 meses con 30 días cada uno.",
    basisDesc2: "El Libro Astronómico especifica un ciclo completo de 364 días mediante las leyes celestiales.",
    basisDesc3: "Las fechas y días de la semana son fijos cada año, reflejando el orden de la creación de Dios.",
    basisLabel1: "Base Bíblica",
    basisLabel2: "1 Enoc",
    basisLabel3: "Orden Inmutable",
    systemInfo: "Sistema de 364 días / 360 días",
    feastNames: {
      "유월절": "Pascua", "무교절": "Panes sin Levadura", "초실절": "Primicias", "오순절": "Pentecostés", "나팔절": "Trompetas", "속죄일": "Expiación", "초막절": "Tabernáculos", "춘분점": "Equinoccio", "안식일": "Sábado", "절기안식일": "Sábado de Fiesta", "일차": "Día", "새해시작": "Inicio de Año Nuevo", "새달일": "Día de Luna Nueva", "성경적 새해": "Año Nuevo Bíblico", "성경적새해": "Año Nuevo Bíblico"
    }
  },
  ru: {
    title: "Календарь Еноха",
    subtitle: "Использовался священником Садоком",
    descTitle: "Найден в Свитках Мертвого моря",
    descBody: "Еврейский традиционный солнечный календарь",
    sabbathInfo: "Неизменный порядок",
    sabbathDesc: "Числа и дни недели фиксированы ежегодно.",
    youtubeButton: "Перейти на YouTube канал",
    today: "Сегодня",
    prevYear: "Предыдущий год",
    nextYear: "Следующий год",
    prevMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    equinox: "Равноденствие",
    sabbath: "Шаббат",
    weekdays: ["День 1", "День 2", "День 3", "День 4", "День 5", "День 6", "Шаббат"],
    months: ["Месяц 1", "Месяц 2", "Месяц 3", "Месяц 4", "Месяц 5", "Месяц 6", "Месяц 7", "Месяц 8", "Месяц 9", "Месяц 10", "Месяц 11", "Месяц 12"],
    selectLanguage: "Выберите язык",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: " г.",
    zadokTitle: "Кто такой священник Садок?",
    zadokDesc1: "Предок подлинной священнической линии со времен Давида.",
    zadokDesc2: "Признан семьей 'истинных священников' в Книге Иезекииля.",
    basisTitle: "Основание 364-дневного календаря",
    basisDesc1: "Сказания о потопе Ноя показывают систему из 12 месяцев по 30 дней в каждом.",
    basisDesc2: "Астрономическая книга предписывает цикл из 364 дней согласно небесным законам.",
    basisDesc3: "Числа и дни недели фиксированы ежегодно, отражая Божий порядок творения.",
    basisLabel1: "Библейское основание",
    basisLabel2: "1 Енох",
    basisLabel3: "Неизменный порядок",
    systemInfo: "364-дневная / 360-дневная система",
    feastNames: {
      "유월절": "Пасха", "무교절": "Опресноки", "초실절": "Первые плоды", "오순절": "Пятидесятница", "나팔절": "Трубы", "속죄일": "Искупление", "초막절": "Кущи", "춘분점": "Равноденствие", "안식일": "Шаббат", "절기안식일": "Праздничный Шаббат", "일차": "День", "새해시작": "Начало Нового года", "새달일": "День Новой Луны", "성경적 새해": "Библейский Новый год", "성경적새해": "Библейский Новый год"
    }
  },
  pt: {
    title: "Calendário Enoque",
    subtitle: "Usado pelo Sacerdote Zadoque",
    descTitle: "Encontrado nos Manuscritos do Mar Morto",
    descBody: "Calendário solar tradicional hebraico",
    sabbathInfo: "Ordem Imutável",
    sabbathDesc: "As datas e os dias da semana são fixos.",
    youtubeButton: "Visite o canal no YouTube",
    today: "Hoje",
    prevYear: "Ano Anterior",
    nextYear: "Próximo Ano",
    prevMonth: "Mês Anterior",
    nextMonth: "Próximo Mês",
    equinox: "Equinócio",
    sabbath: "Shabat",
    weekdays: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5", "Dia 6", "Shabat"],
    months: ["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6", "Mês 7", "Mês 8", "Mês 9", "Mês 10", "Mês 11", "Mês 12"],
    selectLanguage: "Selecionar Idioma",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "Quem é o Sacerdote Zadoque?",
    zadokDesc1: "Ancestral da linha sacerdotal autêntica desde o tempo de Davi.",
    zadokDesc2: "Reconhecida como a família de 'Sacerdotes Verdadeiros' no Livro de Ezequiel.",
    basisTitle: "Base do Calendario de 364 Dias",
    basisDesc1: "Relatos como o dilúvio de Noé mostram um sistema de 12 meses com 30 dias cada.",
    basisDesc2: "O Livro Astronômico especifica um ciclo de 364 dias através das leis celestiais.",
    basisDesc3: "As datas e os dias da semana são fixos todos os anos, refletindo a ordem de Deus.",
    basisLabel1: "Base Bíblica",
    basisLabel2: "1 Enoque",
    basisLabel3: "Ordem Imutável",
    systemInfo: "Sistema de 364 dias / 360 dias",
    feastNames: {
      "유월절": "Páscoa", "무교절": "Pães Asmos", "초실절": "Primícias", "오순절": "Pentecostes", "나팔절": "Trompetas", "속죄일": "Expiação", "초막절": "Tabernáculos", "춘분점": "Equinócio", "안식일": "Shabat", "절기안식일": "Shabat de Festa", "일차": "Dia", "새해시작": "Início do Ano Novo", "새달일": "Dia da Lua Nova", "성경적 새해": "Ano Novo Bíblico", "성경적새해": "Ano Novo Bíblico"
    }
  },
  hi: {
    title: "हनोक कैलेंडर",
    subtitle: "पुजारी सादोक द्वारा उपयोग किया गया",
    descTitle: "मृत सागर स्क्रॉल में मिला",
    descBody: "हि브리 पारंपरिक सौर कैलेंडर",
    sabbathInfo: "अपरिवर्तनीय आदेश",
    sabbathDesc: "हर साल तारीखें और दिन निश्चित होते हैं।",
    youtubeButton: "YouTube चैनल",
    today: "आज",
    prevYear: "पिछला वर्ष",
    nextYear: "अगला वर्ष",
    prevMonth: "पिछला महीना",
    nextMonth: "अगला महीना",
    equinox: "विषुव",
    sabbath: "शाबात",
    weekdays: ["दिन 1", "दिन 2", "दिन 3", "दिन 4", "दिन 5", "दिन 6", "शाबात"],
    months: ["महीना 1", "महीना 2", "महीना 3", "महीना 4", "महीना 5", "महीना 6", "मही나 7", "महीना 8", "महीना 9", "महीना 10", "महीना 11", "महीना 12"],
    selectLanguage: "भाषा चुनें",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "पुजारी सादोक कौन हैं?",
    zadokDesc1: "डेविड के समय से प्रामाणिक पुजारियों के वंशज।",
    zadokDesc2: "ईजेकील की पुस्तक में 'सच्चे पुजारी' के रूप में मान्यता प्राप्त परिवार।",
    basisTitle: "364-दिवसीय कैलेंडर का आधार",
    basisDesc1: "नूह के जलप्रलय के विवरण 12 महीनों and 30 दिनों की प्रणाली दर्शाते हैं।",
    basisDesc2: "खगोलीय पुस्तक खगोलीय नियमों के माध्यम से 364 दिनों के चक्र को निर्दिष्ट करती.है।",
    basisDesc3: "हर साल तारीखें और दिन निश्चित होते हैं, जो परमेश्वर के सृष्टि के क्रम को दर्शाते हैं।",
    basisLabel1: "बाइबिल का आधार",
    basisLabel2: "1 हनोक",
    basisLabel3: "अपरिवर्तनीय आदेश",
    systemInfo: "364-दिन / 360-दिन प्रणाली",
    feastNames: {
      "유월절": "फसह", "무교절": "बेखमीर रोटी", "초실절": "प्रथम फल", "오순절": "पिन्तेकुस्त", "나팔절": "तुरही", "속죄일": "प्रायश्चित", "초막절": "तंबू", "춘분점": "विषुव", "안식일": "शाबात", "절기안식일": "पर्व शाबात", "일차": "दिन", "새해시작": "नया साल शुरू", "새달일": "नया महीना दिन", "성경적 새해": "बाइबिल नया साल", "성경적새해": "बाइबिल नया साल"
    }
  },
  de: {
    title: "Enoch-Kalender",
    subtitle: "Verwendet von Priester Zadok",
    descTitle: "Gefunden in den Schriftrollen vom Toten Meer",
    descBody: "Hebräischer traditioneller Sonnenkalender",
    sabbathInfo: "Unveränderliche Ordnung",
    sabbathDesc: "Daten und Wochentage sind jedes Jahr gleich.",
    youtubeButton: "YouTube-Kanal",
    today: "Heute",
    prevYear: "Letztes Jahr",
    nextYear: "Nächstes Jahr",
    prevMonth: "Letzter Monat",
    nextMonth: "Nächster Monat",
    equinox: "Tagundnachtgleiche",
    sabbath: "Sabbat",
    weekdays: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Sabbat"],
    months: ["Monat 1", "Monat 2", "Monat 3", "Monat 4", "Monat 5", "Monat 6", "Monat 7", "Monat 8", "Monat 9", "Monat 10", "Monat 11", "Monat 12"],
    selectLanguage: "Sprache wählen",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "Wer ist Priester Zadok?",
    zadokDesc1: "Ahnherr der authentischen priesterlichen Linie seit der Zeit Davids.",
    zadokDesc2: "Im Buch Hesekiel als Familie der 'wahren Priester' anerkannt.",
    basisTitle: "Basis des 364-Tage-Kalenders",
    basisDesc1: "Berichte wie Noahs Flut zeigen ein System von 12 Monaten mit je 30 Tagen.",
    basisDesc2: "Das Astronomische Buch legt durch Himmelsgesetze einen 364-Tage-Zyklus fest.",
    basisDesc3: "Daten und Wochentage sind jedes Jahr gleich und spiegeln Gottes Ordnung wider.",
    basisLabel1: "Biblische Basis",
    basisLabel2: "1 Henoch",
    basisLabel3: "Unveränderliche Ordnung",
    systemInfo: "364-Tage / 360-Tage System",
    feastNames: {
      "유월절": "Passah", "무교절": "Ungesäuerte Brote", "초실절": "Erstlingsfrüchte", "오순절": "Pfingsten", "나팔절": "Posaunen", "속죄일": "Versöhnung", "초막절": "Laubhütten", "춘분점": "Tagundnachtgleiche", "안식일": "Sabbat", "절기안식일": "Festsabbat", "일차": "Tag", "새해시작": "Neujahrsbeginn", "새달일": "Neumondstag", "성경적 새해": "Biblisches Neujahr", "성경적새해": "Biblisches Neujahr"
    }
  },
  he: {
    title: "לוח חנוך",
    subtitle: "בשימוש הכהן צדוק",
    descTitle: "נמצא במגילות ים המלח",
    descBody: "לוח שנה שמשי עברי מסורתי",
    sabbathInfo: "סדר בלתי משתנה",
    sabbathDesc: "התאריכים וימי השבוע קבועים בכל שנה.",
    youtubeButton: "ערוץ היוטיוב",
    today: "היום",
    prevYear: "שונה שעברה",
    nextYear: "שנה הבאה",
    prevMonth: "חודש שעבר",
    nextMonth: "חודש הבא",
    equinox: "נקודת השוויון",
    sabbath: "שבת",
    weekdays: ["יום 1", "יום 2", "יום 3", "יום 4", "יום 5", "יום 6", "שבת"],
    months: ["חודש 1", "חודש 2", "חודש 3", "חודש 4", "חודש 5", "חודש 6", "חודש 7", "חודש 8", "חודש 9", "חודש 10", "חודש 11", "חודש 12"],
    selectLanguage: "בחר שפה",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "",
    zadokTitle: "מי היה הכהן צדוק?",
    zadokDesc1: "אבי השושלת הכהנית האותנטית מימי דוד המלך.",
    zadokDesc2: "הוכר כמשפחת 'הכוהנים האמיתיים' בספר יחזקאל.",
    basisTitle: "הבסיס ללוח 364 הימים",
    basisDesc1: "סיפורי המבול של נח מציגים מערכת של 12 חודשים עם 30 יום בכל אחד.",
    basisDesc2: "הספר האסטרונומי קובע מחזור של 364 ימים באמצעות חוקי השמיים.",
    basisDesc3: "התאריכים וימי השבוע קבועים בכל שנה, ומשקפים את סדר הבריאה.",
    basisLabel1: "בסיס מקראי",
    basisLabel2: "חנוך א'",
    basisLabel3: "סדר בלתי משתנה",
    systemInfo: "מערכת 364 ימים / 360 ימים",
    feastNames: {
      "유월절": "פסח", "무교절": "חג המצות", "초실절": "ביכורים", "오순절": "שבועות", "나팔절": "יום תרועה", "속죄일": "יום כיפור", "초막절": "סוכות", "춘분점": "נקודת השוויון", "안식일": "שבת", "절기안식일": "שבת מועד", "일차": "יום", "새해시작": "תחילת שנה חדשה", "새달일": "יום ראש חודש", "성경적 새해": "ראש השנה המקראי", "성경적새해": "ראש השנה המקראי"
    }
  },
  ja: {
    title: "エノクの暦",
    subtitle: "祭司サドクが使用した",
    descTitle: "死海文書から発見された",
    descBody: "ヘブライ伝統の太陽暦",
    sabbathInfo: "不変の秩序",
    sabbathDesc: "毎年、日付と曜日が固定され、神の創造の秩序を反映しています。",
    youtubeButton: "YouTubeチャンネルへ",
    today: "今日",
    prevYear: "前年",
    nextYear: "次年",
    prevMonth: "先月",
    nextMonth: "来月",
    equinox: "春分点",
    sabbath: "安息日",
    weekdays: ["第一日", "第二日", "第三日", "第四日", "第五日", "第六日", "安息日"],
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    selectLanguage: "言語選択",
    poweredBy: "POWERED BY MASISA TV",
    yearUnit: "年",
    zadokTitle: "祭司サドクとは？",
    zadokDesc1: "ダビデの時代から続く正統な祭司の家系の祖先です。",
    zadokDesc2: "エゼキエル書で'真の祭司'として認められた家族です。",
    basisTitle: "364日暦の根拠",
    basisDesc1: "ノアの洪水記などは、1ヶ月を30日とする12ヶ月体系を示しています。",
    basisDesc2: "天文の書は、天体の運行法則を通じて364日の完全な周期を明示しています。",
    basisDesc3: "毎年、日付と曜日が固定され、神の創造の秩序를 완전히 반영합니다.",
    basisLabel1: "聖書的根拠",
    basisLabel2: "エ노크의 第一の書",
    basisLabel3: "不変の秩序",
    systemInfo: "364日 / 360日 体系",
    feastNames: {
      "유월절": "過越の祭", "무교절": "種入れぬパンの祭", "초실절": "初穂の祭", "오순절": "五旬節", "나팔절": "ラッパ의 祭", "속죄일": "贖죄의 日", "초막절": "仮庵の祭", "춘분점": "春分点", "안식일": "安息日", "절기안식일": "祭司安息日", "일차": "日目", "새해시작": "新年の始まり", "새달일": "新月の日", "성경적 새해": "聖書的新年", "성경적새해": "聖書的新年"
    }
  }
};
