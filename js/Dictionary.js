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

    this.getWordCount = function() {
        return this.getDictionary().length
    }

    this.exportJson = function() {
        return JSON.stringify(this.getDictionary())
    }

    this.exportCsv = function() {
        let dict = this.getDictionary()
        csv = ""
        dict.forEach(function(item) {
            csv += item.word + ',' + item.translation + '\n'
        })
        return csv.trimEnd()
    }

    this.exportApkg = function(cardStyle, addReversed) {
        if (addReversed === true) {
            cardStyle += " (+ reversed card)"
        }

        let modelFactory = new AnkiModelGenerator()
        const m = modelFactory.getModel(cardStyle)
        const deck = new Deck(+ new Date(), "Demo Deck")

        let dict = this.getDictionary()
        dict.forEach(function(item) {
            deck.addNote(m.note([item.word, item.translation]))
        })

        const ankiPackage = new Package()
        ankiPackage.addDeck(deck)
        return ankiPackage
    }

    this.clear = function() {
        this.saveDictionary([])
    }
}
