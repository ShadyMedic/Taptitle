$(function() {
    $("#watch-form").on('submit', loadVideo)
    $("#video").on('play', playSubtitles)
    $("#video").on('pause', pauseSubtitles)
    $("#video").on('ended', displaySummary)

    //Summary buttons
    $("#summary .replay-button").on('click', replayVideo)
    $('#summary .apkg-download').on('click', function() { displayDictionaryExportInfo('#apkg-download-info') })
    $("#summary .csv-download").on('click', function() { displayDictionaryExportInfo('#csv-download-info') })
    $("#summary .keep-dictionary").on('click', function() { displayDictionaryExportInfo('#keep-dictionary-info') })
    $("#summary .empty-dictionary").on('click', function() { displayDictionaryExportInfo('#empty-dictionary-info') })

    //Summary popups buttons
    $(".dictionary-export-info-close").on('click', closeDictionaryExportInfo)
    $(".apkg-download-file").on('click', downloadApkgDictionary)
    $(".csv-download-file").on('click', downloadCsvDictionary)
    $(".keep-dictionary-confirm").on('click', resetView)
    $(".empty-dictionary-confirm").on('click', emptyDictionary)
    $(".post-export-dictionary-wipe").on('click', postExportDictionaryWipe)

    if (['', null, undefined].indexOf(window.localStorage.getItem('lastSourceLang')) === -1) {
        $("#source-language-input").val(window.localStorage.getItem('lastSourceLang'))
    }
    if (['', null, undefined].indexOf(window.localStorage.getItem('lastTargetLang')) === -1) {
        $("#target-language-input").val(window.localStorage.getItem('lastTargetLang'))
    }
})

var sourceLanguage = ""
var targetLanguage = ""
const proxyUrl = "http://taptitle-backend.local/translate.php"

var dictionary = new Dictionary()
var subtitlesReader
var subtitlesUpdater
var translatedWord
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

    sourceLanguage = $("#source-language-input").val()
    targetLanguage = $("#target-language-input").val()

    window.localStorage.setItem('lastSourceLang', sourceLanguage)
    window.localStorage.setItem('lastTargetLang', targetLanguage)

    $("#watch-form").hide()
    $("#watch-video").show()
    $("body").css('background-color', '#222');
    $("#current-subtitles").css('visibility', 'visible');
}

function playSubtitles()
{
    subtitlesUpdater = setInterval(updateSubtitles, 500)
    closeTranslation()
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
    if ($(".translatable-unit .translation-area .translation-bubble").get(0) !== undefined) {
        //A different word is already being translated – don't do anything
        return
    }

    $("#video").get(0).pause()
    translatedWord = $(event.target).text().replace(/[\s,.?!]+$/, '').replace(/^[\s,.?!]+/, '')

    //Send word to DeepL
    let xhr = new XMLHttpRequest()
    xhr.open("POST", proxyUrl)

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            displayTranslation(xhr.responseText)
        }}
    let data = "text=" + translatedWord + "&source_lang=" + sourceLanguage + "&target_lang=" + targetLanguage

    xhr.send(data)

    //Display the translation bubble
    let element = $("#translation-bubble-wrapper").html()
    $(event.target).closest(".translatable-unit").find(".translation-area").html(element)
    $(".translation-area .close-button").on("click", closeTranslation)

    alignTranslationBubble($(event.target))
}

function displayTranslation(deepLResponse)
{
    //Receive the translation
    let response = JSON.parse(deepLResponse)
    let word = response.translations[0].text

    if ($(".translatable-unit .translation-area .translation-bubble").get(0) === undefined) {
        //The bubble has been closed, most likely the translation was requested by accident – don't to anything
        return
    }

    //Display the translation
    let $activeBubble = $(".translation-area .translation-bubble")

    word = word.replace(/[\s,.?!]+$/, '').replace(/^[\s,.?!]+/, '')
    $activeBubble.find(".translation-bubble-word").text(word)
    $activeBubble.find(".translation-bubble-undo").on("click", undoDictionaryEntry)

    $activeBubble.find(".translation-bubble-loading").hide()
    $activeBubble.find(".translation-bubble-content").show()

    alignTranslationBubble($(".translation-area .translation-bubble").closest(".translatable-unit").find('.subtitle-word'))

    dictionary.addWord(translatedWord, word)
}

function closeTranslation()
{
    $(".translation-area").html("")
    $("#video").get(0).play()
}

function undoDictionaryEntry()
{
    dictionary.removeLastWord()
    $(".translation-area .translation-bubble .dictionary-notification").hide()
    alignTranslationBubble($(".translation-area .translation-bubble").closest(".translatable-unit").find('.subtitle-word'))
}

function alignTranslationBubble($clickedSubtitle)
{
    //Horizontal align (center the bubble above the word)
    let wordWidth = Number($clickedSubtitle.css('width').match(/\d+/)[0]) //Doesn't round - discards the decimal part
    let bubbleWidth = Number($(".translation-area .translation-bubble").css("width").match(/\d+/)[0])
    let leftOffset = ((bubbleWidth / 2) - (wordWidth / 2)) * -1
    $(".translation-area .translation-bubble").css("margin-left", leftOffset + "px");

    //Vertical align (move the bubble above the word)
    let bubbleHeight = Number($(".translation-area .translation-bubble").css("height").match(/\d+/)[0])
    let topOffset = ((bubbleHeight) + 16) * -1 //16px is the height of the bubble's "beak"
    $(".translation-area .translation-bubble").css("top", topOffset + "px");
}

function displaySummary()
{
    $(".wordcount").text(dictionary.getWordCount())
    $("#csv-export-field").text(dictionary.exportCsv())

    $("body").css('background-color', 'unset');
    $("#current-subtitles").css('visibility', 'hidden');
    $("#watch-video").hide()
    $("#summary").show()
}

function replayVideo()
{
    //Rewind the video a little (to the beginning, if it's less than 10 seconds long)
    $("#video").get(0).currentTime = ($("#video").get(0).currentTime > 10) ? ($("#video").get(0).currentTime - 5) : 0

    $("body").css('background-color', '#222');
    $("#current-subtitles").css('visibility', 'visible');
    $("#watch-video").show()
    $("#summary").hide()
}

function displayDictionaryExportInfo(wrapperId)
{
    $(wrapperId).show()
    $("#dictionary-export-details").show()
}

function closeDictionaryExportInfo()
{
    $("#dictionary-export-details").hide()
    $("#dictionary-export-details > section").hide()
}

function downloadApkgDictionary() {
    alert("This feature is not available yet.")
}

function downloadCsvDictionary() {
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += dictionary.exportCsv()
    let encodedUri = encodeURI(csvContent)
    $("#csv-file-handle").attr("href", encodedUri)
    $("#csv-file-handle").attr("download", "Taptitle_dictionary.csv")
    $("#csv-file-handle").get(0).click()
}

function resetView() {
    $("#video-input").val("")
    $("#subtitles-input").val("")

    closeDictionaryExportInfo()
    $("#summary").slideUp()
    $("#watch-video").hide()
    $("#watch-form").slideDown()

    $("#current-subtitles").text('Play the video to start.');
}

function emptyDictionary() {
    dictionary.clear()
    closeDictionaryExportInfo()
    resetView()
}

function postExportDictionaryWipe() {
    closeDictionaryExportInfo()
    displayDictionaryExportInfo('#empty-dictionary-info')
}
