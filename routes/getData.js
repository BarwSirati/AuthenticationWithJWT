const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const { google } = require('googleapis');

router.get("/", middleware, async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const spreadsheetId = "1tYcmZBa0HN4MsSoqArMY2MebRm5-pHWmURB5gW3NFeU";

    //Create client instance for auth
    const client = await auth.getClient();

    //Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    //Read rows form spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1"
    });

    res.send(getRows.data.values)
  } catch (err) {
    return res.status(403).send({ msg: "WHO ARE YOU??" });
  }
});

module.exports = router;
