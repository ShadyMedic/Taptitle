$(function() {
    $("#watch-form").on('submit', loadVideo)
    $("#video").on('play', playSubtitles)
    $("#video").on('pause', pauseSubtitles)
    $("#video").on('ended', displaySummary)

    //Summary buttons
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
    $(".post-export-dictionary-wipe").on('click', emptyDictionary)

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

    $("#watch-form").slideUp()
    $("#watch-video").slideDown()
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
    $(".translation-area .translation-bubble-close").on("click", closeTranslation)
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
}

function displaySummary()
{
    $(".wordcount").text(dictionary.getWordCount())
    $("#csv-export-field").text(dictionary.exportCsv())

    $("#watch-video").slideUp()
    $("#summary").slideDown()
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
    $("#watch-video").slideUp()
    $("#watch-form").slideDown()
}

function emptyDictionary() {
    dictionary.clear()
    closeDictionaryExportInfo()
    resetView()
}