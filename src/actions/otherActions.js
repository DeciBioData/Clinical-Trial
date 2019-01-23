import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const exportExcel = (data) => {
	let dataSheets = []
	let titles = ["Rank", "NCTID", "Title", "Sponsor", "Completion Date"]

	dataSheets.push(titles)

	data.forEach((entry) => {
		let content = []
		titles.forEach((col) => {
			let key = ""
			switch(col) {
				case "Rank": key = "rank"; break
				case "NCTID": key = "nctnumber"; break
				case "Title": key = "title"; break
				case "Sponsor": key = "sponsor"; break
				case "Completion Date": key = "completiondate"; break
				default: break
			}
			content.push(entry[key])
		})
		dataSheets.push(content)
	})

	let wb = XLSX.utils.book_new()
	wb.SheetNames.push("Test Sheet")
	let ws_data = dataSheets
	var ws = XLSX.utils.aoa_to_sheet(ws_data)
	wb.Sheets["Test Sheet"] = ws
	let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'})

	function s2ab(s) {
          var buf = new ArrayBuffer(s.length)
          var view = new Uint8Array(buf)
          for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
          return buf;
    }
	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Data.xlsx')
}

