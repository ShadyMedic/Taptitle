function Dictionary()
{
    //Initialization
    if (['', null, undefined].indexOf(window.localStorage.getItem('dictionary')) !== -1) {
        window.localStorage.setItem('dictionary', JSON.stringify([]))
    }

    //Wrapper functions
    this.getDictionary = function() {
        return JSON.parse(window.localStorage.getItem('dictionary'))
    }
    this.saveDictionary = function(dictionary) {
        window.localStorage.setItem('dictionary', JSON.stringify(dictionary))
    }

    //Methods
    this.addWord = function(original, translation) {
        let dict = this.getDictionary()
        dict.push({"word": original, "translation": translation})
        this.saveDictionary(dict)
    }

    this.removeLastWord = function() {
        let dict = this.getDictionary()
        dict.pop()
        this.saveDictionary(dict)
    }

    this.exportJson = function() {
        return JSON.stringify(this.getDictionary())
    }

    this.exportCsv = function() {
        let csv = 'original,translation\n' //Header line
        let dict = this.getDictionary()
        dict.forEach(function(item) {
            csv += item.word + ',' + item.translation + '\n'
        })
        return csv
    }

    this.exportApkg = function() {
        //TODO
        console.log('Exporting as Anki package is not supported yet.')
        return null
    }

    this.clear = function() {
        this.saveDictionary([])
    }
}
