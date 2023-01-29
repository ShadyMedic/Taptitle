function Subtitle(num, timeFrom, timeTo, duration, text)
{
    this.num = num
    this.timeFrom = timeFrom
    this.timeTo = timeTo
    this.duration = duration
    this.text = text

    this.generateSubtitleElements = function() {
        const elements = []
        let template = $("#subtitle-word-wrapper").html()
        let words = this.text.replaceAll('\n', ' ').split(' ')
        words.forEach(function (item) {
            item = item.trim()
            let element = template.replace("{{{content}}}", item)
            elements.push(element)
        })
        return elements
    }
}
