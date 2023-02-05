var SQL;
$(function() {
    $("#export-form").on('submit', exportAsPackage)

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

    let dictionary = new Dictionary()
    let apkg = dictionary.exportApkg(selectedCardStyle, addReversed)

    apkg.writeToFile('Taptitle-dictionary.apkg')
}
