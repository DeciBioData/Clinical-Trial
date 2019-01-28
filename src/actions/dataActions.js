import { FETCH_DATA, UPDATE_DATA } from './types'

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
    const matchPrefix = (prefix, str) => {
      if(!prefix.match(/^[a-zA-Z0-9\s]+$/)) return false
      prefix = prefix.toLowerCase()
      str = str.toLowerCase()

      let search = prefix.split(" ")

      for (let i = 0, len = search.length; i < len; i++) {
        let regex = new RegExp(search[i], 'i')
        if (regex.test(str) === false) {
          return false
        }
      }

      return true
    }

    const includeInArray = (list1, list2) => {
      list2 = list2 ? list2.split(',') : []
      let set = new Set(list1)
      for(let i = 0; i < list2.length; i++) {
        if(set.has(list2[i])) return true
      }
      return false
    }

    let processedData = []
    for(let i = 0; i < dataSet.length; i++) {
      let data = dataSet[i]

      if(filters.trialstartdate[0] === 2000) { filters.trialstartdate[0] = 0 }
      if(filters.completiondate[0] === 2000) { filters.completiondate[0] = 0 }

      if(filters.nctnumber !== "" && !matchPrefix(filters.nctnumber, data.nctnumber)) continue

      if(filters.sponsor.length !== 0 && !includeInArray(filters.sponsor, data.sponsor)) continue
      if(filters.phase.length !== 0 && !includeInArray(filters.phase, data.phase)) continue
      if(filters.enrollmentstatus.length !== 0 && !includeInArray(filters.enrollmentstatus, data.enrollmentstatus)) continue
      if(filters.biomarker.length !== 0 && !includeInArray(filters.biomarker, data.biomarker)) continue
      if(filters.biomarkertype.length !== 0 && !includeInArray(filters.biomarkertype, data.biomarkertype)) continue
      if(filters.purpose.length !== 0 && !includeInArray(filters.purpose, data.purpose)) continue
      if(filters.technology.length !== 0 && !includeInArray(filters.technology, data.technology)) continue

      if(filters.enrollmentvol[0] > parseInt(data.enrollmentvol) || filters.enrollmentvol[1] < parseInt(data.enrollmentvol)) continue
      if(filters.biomarkercount[0] > parseInt(data.biomarkercount) || filters.biomarkercount[1] < parseInt(data.biomarkercount)) continue
      if(filters.trialstartdate[0] > parseInt(data.trialstartdate) || filters.trialstartdate[1] < parseInt(data.trialstartdate)) continue
      if(filters.completiondate[0] > parseInt(data.completiondate) || filters.completiondate[1] < parseInt(data.completiondate)) continue

      processedData.push(data)
    }

    processedData.sort((a, b) => parseInt(b.enrollementvol) - parseInt(a.enrollementvol))
    processedData.forEach((data, index) => data.rank = index + 1)

  dispatch({
    type: UPDATE_DATA,
    payload: processedData
  })
}























