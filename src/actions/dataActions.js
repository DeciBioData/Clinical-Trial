import { FETCH_LIST, FETCH_DATA, UPDATE_DATA } from './types'

export const fetchData = () => dispatch => {
  fetch('https://sheetlabs.com/DECI/biomapCT')
    .then(response => response.json())
    .then(dataSet => {
        let data = dataSet.map((entry) => ({
          "nctnumber": entry["nctnumber"],
          "trialstartdate": entry["trialstartdate"],
          "firstposted": entry["firstposted"],
          "completiondate": entry["completiondate"],
          "lastupdateddate": entry["lastupdateddate"],
          "primarycompletiondate": entry["primarycompletiondate"],
          "title": entry["title"],
          "name": entry["name"],
          "phase": entry["phase"],
          "enrollmentstatus": entry["enrollmentstatus"],
          "enrollmentvol": entry["enrollmentvol"],
          "studytype": entry["studytype"],
          "monocombo": entry["monocombo"],
          "url": entry["url"],
          "biomarker": entry["biomarker"],
          "technology": entry["technology"],
          "sampletype": entry["sampletype"],
          "purpose": entry["purpose"],
          "indication": entry["indication"],
          "biomarkertype": entry["biomarkertype"],
          "sponsor": entry["sponsor"]
        })) || []

        data.sort((a, b) => parseInt(b.enrollmentvol) - parseInt(a.enrollmentvol))
        data.forEach((entry, index) => entry.rank = index + 1)

        return dispatch({
          type: FETCH_DATA,
          payload: data
        })
    })
}

export const updateData = (dataSet, filters) => dispatch => {

}























