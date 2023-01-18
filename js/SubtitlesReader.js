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
                replaceAll('\r\n', '\n'). //Unify line endings
                    replaceAll('\n\n\n','\n\n') //Remove double empty lines

        let srtParser = new SRT()
        let subtitlesArr = srtParser.parse(subtitlesTrimmed)

        //Create the Subtitle objects
        this.subtitles = []
        let self = this
        subtitlesArr.forEach(function (item) {
            let num = Number(item.id)
            let timeFrom = item.time.start
            let timeTo = item.time.end
            let duration = item.time.duration
            let text = item.content.join('\n');
            self.subtitles.push(new Subtitle(num, timeFrom, timeTo, duration, text))
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
