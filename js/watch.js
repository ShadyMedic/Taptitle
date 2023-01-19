$(function() {
    $("#watch-form").on('submit', loadVideo)
    $("#video").on('play', playSubtitles)
    $("#video").on('pause', pauseSubtitles)
})

var subtitlesReader
var subtitlesUpdater
var displayedText

function loadVideo(event)
{
    event.preventDefault()

    let videoFile = $("#video-input").get(0).files[0]

    $("#video-src").attr("src", URL.createObjectURL(videoFile))
    $("#video-src").attr("type", videoFile.type)
    $("#video").get(0).load()
    
    let subtitlesFile = $("#subtitles-input").get(0).files[0]
    subtitlesReader = new SubtitlesReader(subtitlesFile)
    subtitlesReader.loadFile()
    
    $("#watch-form").slideUp()
    $("#watch-video").slideDown()
}

function playSubtitles()
{
    subtitlesUpdater = setInterval(updateSubtitles, 500)
}

function pauseSubtitles()
{
    clearInterval(subtitlesUpdater)
}

function updateSubtitles()
{
    let line = subtitlesReader.getCurrentLine($("#video").get(0).currentTime)

    if (line === null) {
        //No subtitles available for this timestamp
        line = new Subtitle(null, null, null, null, "")
    }

    if (displayedText === line.text) {
        //Subtitles don't need to be updated
        return
    }

    let words = line.generateSubtitleElements()
    $("#current-subtitles").html(words)
    $(".subtitle-word").on("click", translate)
    displayedText = line.text
}

function translate(event) {
    $("#video").get(0).pause()
    let word = $(event.target).text()
    //TODO send word to DeepL
    //TODO receive the translation
    //TODO display the translation
    //TODO save the word into memory
    alert(word)
    $("#video").get(0).play()
}
