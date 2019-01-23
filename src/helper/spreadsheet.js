import config from "./config";
/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:T"
      })
      .then(
        response => {
          const data = response.result.values;
          const DataSets = data.map((dataSet, index) => ({
            biomarkergroup: dataSet[0],
            biomarkertype: dataSet[1],
            sample: dataSet[2],
            technology: dataSet[3],
            purpose: dataSet[4],
            indication: dataSet[5],
            sponsor: dataSet[6],
            phase: dataSet[7]
          })) || [];
          callback({
            DataSets
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}