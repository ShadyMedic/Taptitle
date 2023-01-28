$(function() {
    $("#watch-form").on('submit', loadVideo)
    $("#video").on('play', playSubtitles)
    $("#video").on('pause', pauseSubtitles)
})

const language = "CS"
const proxyUrl = "http://taptitle-backend.local/translate.php"
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
    $(".subtitle-word").on("click", sendToTranslate)
    displayedText = line.text
}

function sendToTranslate(event) {
    $("#video").get(0).pause()
    let word = $(event.target).text().replace(/[\s,.?!]+$/, '').replace(/^[\s,.?!]+/, '')

    //Send word to DeepL
    let xhr = new XMLHttpRequest()
    xhr.open("POST", proxyUrl)

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            displayTranslation(xhr.responseText);
        }};
    let data = "text=" + word + "&target_lang=" + language;

    xhr.send(data);

    //Display the translation bubble
    let element = $(".translation-bubble-wrapper").html()
    $("#current-translation").html(element)
    $("#current-translation .translation-bubble-close").on("click", closeTranslation)
}

function displayTranslation(deepLResponse)
{
    //Receive the translation
    let response = JSON.parse(deepLResponse)
    let word = response.translations[0].text

    if ($("#current-translation").html() === "") {
        //The bubble has been closed, most likely the translation was requested by accident – don't to anything
        return
    }

    //Display the translation
    let $activeBubble = $("#current-translation .translation-bubble");

    word = word.replace(/[\s,.?!]+$/, '').replace(/^[\s,.?!]+/, '')
    $activeBubble.find(".translation-bubble-word").text(word)
    $activeBubble.find(".translation-bubble-undo").on("click", undoDictionaryEntry)

    $activeBubble.find(".translation-bubble-loading").hide();
    $activeBubble.find(".translation-bubble-content").show();

    //TODO save the word into memory
}

function closeTranslation()
{
    $("#current-translation").html("")
    $("#video").get(0).play()
}

function undoDictionaryEntry()
{
    //TODO
    console.log("Adding to dictionary is not supported yet.");
}
