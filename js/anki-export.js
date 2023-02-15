var SQL;
var timer;
var modelFactory;
$(function() {
    $("#export-form").on('submit', exportAsPackage)
    $("#anki-model-data-holders").on('change', checkModelDataLoaded)

    //Initialize the SQL library
    config = {locateFile: filename => `/js/3rd-party-libraries/sql/sql-wasm.wasm`}
    initSqlJs(config).then(function (sql) {
        //Create the database
        SQL = sql
    })
})

function exportAsPackage(event) {
    event.preventDefault()

    let selectedCardStyle = $(".carousel-displayed").find(".card-style-name").text()
    let addReversed = ($("input[name=add-reversed]:checked").get(0) !== undefined)

    if (addReversed === true) {
        selectedCardStyle += " (+ reversed card)"
    }

    modelFactory = new AnkiModelGenerator()
    modelFactory.loadModel(selectedCardStyle)
    timer = setInterval(checkModelDataLoaded, 100) //Wait for the model data to load
}

function checkModelDataLoaded() {
    let stylesheet = $("#anki-stylesheet-holder").text()
    let template = $("#anki-template-holder").text()
    let questionHtml1 = $("#anki-question-html-holder-1").text()
    let answerHtml1 = $("#anki-answer-html-holder-1").text()
    let questionHtml2 = $("#anki-question-html-holder-2").text()
    let answerHtml2 = $("#anki-answer-html-holder-2").text()

    if (!(
        stylesheet === "Loading" || template === "Loading" ||
        questionHtml1 === "Loading" || answerHtml1 === "Loading" ||
        questionHtml2 === "Loading" || answerHtml2 === "Loading"
    )) {
        clearInterval(timer)
        generatePackage()
    }
}

function generatePackage() {
    let css = $("#anki-stylesheet-holder").text()
    let template = JSON.parse($("#anki-template-holder").text())

    for (let i = 0; i < template.length; i++) {
        template[i]["qfmt"] = $("#anki-question-html-holder-" + (i+1)).text()
        template[i]["afmt"] = $("#anki-answer-html-holder-" + (i+1)).text()
    }

    const model = modelFactory.getModel(css, template)

    console.log(model)

    let dictionary = new Dictionary()
    let apkg = dictionary.exportApkg(model)

    apkg.writeToFile('Taptitle-dictionary.apkg')

    $("#anki-stylesheet-holder").text("")
    $("#anki-template-holder").text("")
    $("#anki-question-html-holder-1").text("")
    $("#anki-answer-html-holder-1").text("")
    $("#anki-question-html-holder-2").text("")
    $("#anki-answer-html-holder-2").text("")
}
