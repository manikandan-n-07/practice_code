const SPREADSHEET_ID = "1StxqVPQj7Wbju-FhkuZogIhU6shZbdeftY5F52ap-TA"; // 🔴 REQUIRED
const SHEET_NAME = "Sheet1"; // change if needed

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse("error", "Sheet not found");
    }

    if (data.action === "signup") {
      return signupUser(data, sheet);
    }

    if (data.action === "login") {
      return loginUser(data, sheet);
    }

    return jsonResponse("error", "Invalid action");

  } catch (err) {
    return jsonResponse("error", "Server error");
  }
}

/************ SIGNUP ************/
function signupUser(data, sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    const emails = sheet
      .getRange(2, 2, lastRow - 1, 1)
      .getValues()
      .flat();

    if (emails.includes(data.email)) {
      return jsonResponse("error", "Email already exists");
    }
  }

  sheet.appendRow([
    data.name,
    data.email,
    data.phone,
    data.password
  ]);

  return jsonResponse("success", "Signup successful");
}

/************ LOGIN ************/
function loginUser(data, sheet) {
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const email = rows[i][1];
    const password = rows[i][3];

    if (email === data.email && password === data.password) {
      return jsonResponse("success", "Login successful");
    }
  }

  return jsonResponse("error", "Invalid email or password");
}

/************ RESPONSE ************/
function jsonResponse(status, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ status, message })
  ).setMimeType(ContentService.MimeType.JSON);
}
