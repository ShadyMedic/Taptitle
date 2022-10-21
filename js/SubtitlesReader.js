function SubtitlesReader(subtitlesFile) {
    this.subtitlesFile = subtitlesFile
    this.subtitlesFileContents = undefined
    this.subtitles = undefined

    this.loadFile = function () {
        let fr = new FileReader()
        let self = this
        fr.onload = function () {
            self.subtitlesFileContents = fr.result
            self.processFile()
        }

        fr.readAsText(this.subtitlesFile)
    }

    this.processFile = function () {
        let subtitlesTrimmed = this.subtitlesFileContents.
            trim().
            replace(/^\s+|\s+$/g,''). //Trim linebreaks
            replaceAll('\r\n', '\n') //Unify line endings

        let subtitlesArr = subtitlesTrimmed.split('\n\n')
        //Create the Subtitle objects
        this.subtitles = []
        let self = this
        let timestampParser = new TimestampParser()
        subtitlesArr.forEach(function (item) {
            let record = item.
                replace(/^\s+|\s+$/g,''). //Trim linebreaks
                split('\n')

            let num = Number(record[0])
            let timestampStrings = record[1].split(' --> ')
            let timeFrom = timestampParser.parseTimestamp(timestampStrings[0])
            let timeTo = timestampParser.parseTimestamp(timestampStrings[1])

            let text = record[2]

            self.subtitles.push(new Subtitle(timeFrom, timeTo, text))
        })
    }

    this.getPreviousLine = function (timestamp) {
        //TODO
    }

    this.getCurrentLine = function (timestamp) {
        //TODO
    }

    this.getNextLine = function (timestamp) {
        //TODO
    }
}
