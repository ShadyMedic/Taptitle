function FileLoader(path) {
    this.filepath = path

    this.loadContents = function(outputElementId) {
        let rawFile = new XMLHttpRequest()
        rawFile.outputElementId = outputElementId //Save as object to pass by reference
        rawFile.open("GET", this.filepath, true)
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status === 200) {
                $("#" + rawFile.outputElementId).text(rawFile.responseText)
            }
        }
        rawFile.send()
    }
}
