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
/*
    this.getPreviousLine = function (timestamp) {
        let currentLineIndex = this.performBinarySearchInSubtitles(timestamp);

        return (currentLineIndex === 0) ? null : this.subtitles[currentLineIndex - 1].text;
    }
*/
    this.getCurrentLine = function (timestamp) {
        let index = this.performBinarySearchInSubtitles(timestamp);
        if (index === null) {
            return null;
        }
        return this.subtitles[index].text;
    }
/*
    this.getNextLine = function (timestamp) {
        let currentLineIndex = this.performBinarySearchInSubtitles(timestamp);
        return (currentLineIndex === this.subtitles.length - 1) ? null : this.subtitles[currentLineIndex + 1].text;
    }
*/
    this.performBinarySearchInSubtitles = function (timestamp, bottomIndex = -1, upperIndex = -1, startIndex = -1) {
        let self = this

        let minIndex = (bottomIndex === -1 ) ? 0 : bottomIndex
        let maxIndex = (upperIndex === -1) ? self.subtitles.length - 1 : upperIndex
        let currentIndex = (startIndex === -1) ? Math.floor(self.subtitles.length / 2) : startIndex

        //console.log(minIndex + " --> " + currentIndex + " --> " + maxIndex);

        if (minIndex > maxIndex) {
            //We are at the index between two subtitles, one of which is previous and the other one the next.
            //For the current timestamp, there is no subtitle available
            return null;
        }

        if (minIndex === maxIndex) {
            if (self.subtitles[currentIndex].timeFrom < timestamp && self.subtitles[currentIndex].timeTo > timestamp) {
                return minIndex;
            } else {
                //We are at the index between two subtitles, one of which is previous and the other one the next.
                //For the current timestamp, there is no subtitle available
                return null;
            }
        }

        if (self.subtitles[currentIndex].timeFrom < timestamp) {
            if (self.subtitles[currentIndex].timeTo > timestamp) {
                return currentIndex
            } else {
                //console.log("low");
                return this.performBinarySearchInSubtitles(timestamp,
                    currentIndex + 1,
                    maxIndex,
                    currentIndex + Math.max(1, Math.floor((maxIndex - currentIndex) / 2)),
                )
            }
        } else {
            //console.log("high");
            return this.performBinarySearchInSubtitles(timestamp,
                minIndex,
                currentIndex - 1,
                currentIndex - Math.max(1, Math.floor((currentIndex - minIndex) / 2)),
            )
        }
    }
}
