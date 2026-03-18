/**
 * 사용자의 구글 시트 형식에 맞춘 에녹달력 데이터 추출 스크립트
 * 
 * [시트 헤더 대응]
 * '그레고리력' -> gregorian
 * '에녹월' -> enochMonth (숫자만 추출)
 * '에녹일' -> enochDay (숫자만 추출)
 * '구분' -> feast
 */

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const result = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      let value = row[index];

      if (header === "에녹월") {
        obj["enochMonth"] = parseInt(String(value).replace(/[^0-9]/g, ""));
      } else if (header === "에녹일") {
        obj["enochDay"] = parseInt(String(value).replace(/[^0-9]/g, ""));
      } else if (header === "구분") {
        obj["feast"] = value;
      } else if (header === "그레고리력") {
        // 날짜 형식 변환 (YYYY-MM-DD)
        if (value instanceof Date) {
          obj["gregorian"] = Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
        } else {
          obj["gregorian"] = String(value);
        }
      }
    });
    return obj;
  }).filter(item => item.enochMonth && item.enochDay); // 유효한 데이터만 리턴

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
