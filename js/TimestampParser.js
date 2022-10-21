function TimestampParser()
{
    this.parseTimestamp = function (timestampString)
    {
        let timestampColonSeparated = timestampString.replace(',', ':') // 01:13:42,500 → 01:13:42:500
        let dateElements = timestampColonSeparated.split(':')

        let hours = Number(dateElements[0])
        let minutes = Number(dateElements[1])
        let seconds = Number(dateElements[2])
        let milliseconds = Number(dateElements[3])

        return (
            hours * 3600 +
                minutes * 60 +
                    seconds +
                        milliseconds / 1000
        ) //4422.500
    }
}