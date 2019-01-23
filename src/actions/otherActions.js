import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const exportExcel = (data, columns) => {
	let dataSheets = []
	let titles = []

	columns.forEach((col) => {
		if(col !== "(All)") titles.push(col)
	})
	dataSheets.push(titles)

	data.forEach((entry) => {
		let content = []
		columns.forEach((col) => {
			let key = ""
			content.push(entry[key])
		})
		dataSheets.push(content)
	})

	let wb = XLSX.utils.book_new()
	wb.SheetNames.push("Test Sheet")
	let ws_data = dataSheets
	console.log(dataSheets)
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

