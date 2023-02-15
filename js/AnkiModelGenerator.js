function AnkiModelGenerator()
{
    const modelIds = {
        "Lame": 1675587030878,
        "Lame (+ reversed card)": 1675607468632,
        "Flashcard": 1675587101872,
        "Flashcard (+ reversed card)": 1675609685997,
        "Histological Hell": 1676386050567,
        "Histological Hell (+ reversed card)": 1676386090503,
        "Cornflower": 1676386115330,
        "Cornflower (+ reversed card)": 1676386121051,
        "Forest": 1676386175007,
        "Forest (+ reversed card)": 1676386187324,
        "Office": 1676386190860,
        "Office (+ reversed card)": 1676386193962,
        "Leporelo": 1676386197352,
        "Leporelo (+ reversed card)": 1676386200775,
        "Programmers Can't Design": 1676386818398,
        "Programmers Can't Design (+ reversed card)": 1676386823897,
    }

    const modelTemplates = {
        "Lame": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Lame/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Lame/Card 1/answer.html",
            },
        ],
        "Lame (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Lame/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Lame/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Lame/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Lame/Card 2/answer.html",
            },
        ],
        "Flashcard": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Flashcard/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Flashcard/Card 1/answer.html",
            },
        ],
        "Flashcard (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Flashcard/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Flashcard/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Flashcard/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Flashcard/Card 2/answer.html",
            },
        ],
        "Histological Hell": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Histological Hell/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Histological Hell/Card 1/answer.html",
            },
        ],
        "Histological Hell (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Histological Hell/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Histological Hell/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Histological Hell/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Histological Hell/Card 2/answer.html",
            },
        ],
        "Cornflower": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Cornflower/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Cornflower/Card 1/answer.html",
            },
        ],
        "Cornflower (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Cornflower/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Cornflower/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Cornflower/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Cornflower/Card 2/answer.html",
            },
        ],
        "Forest": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Forest/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Forest/Card 1/answer.html",
            },
        ],
        "Forest (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Forest/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Forest/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Forest/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Forest/Card 2/answer.html",
            },
        ],
        "Office": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Office/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Office/Card 1/answer.html",
            },
        ],
        "Office (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Office/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Office/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Office/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Office/Card 2/answer.html",
            },
        ],
        "Leporelo": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Office/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Office/Card 1/answer.html",
            },
        ],
        "Leporelo (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Leporelo/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Leporelo/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Leporelo/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Leporelo/Card 2/answer.html",
            },
        ],
        "Programmers Can't Design": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Programmers Can't Design/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Programmers Can't Design/Card 1/answer.html",
            },
        ],
        "Programmers Can't Design (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": "../anki-export/card-styles/Programmers Can't Design/Card 1/question.html",
                "afmt": "../anki-export/card-styles/Programmers Can't Design/Card 1/answer.html",
            },
            {
                "name": "Card 2",
                "qfmt": "../anki-export/card-styles/Programmers Can't Design/Card 2/question.html",
                "afmt": "../anki-export/card-styles/Programmers Can't Design/Card 2/answer.html",
            },
        ],
    }

    const modelStylesheets = {
        "Lame": "../anki-export/card-styles/Lame/style.css",
        "Lame (+ reversed card)": "../anki-export/card-styles/Lame/style.css",
        "Flashcard": "../anki-export/card-styles/Flashcard/style.css",
        "Flashcard (+ reversed card)": "../anki-export/card-styles/Flashcard/style.css",
        "Histological Hell": "../anki-export/card-styles/Histological Hell/style.css",
        "Histological Hell (+ reversed card)": "../anki-export/card-styles/Histological Hell/style.css",
        "Cornflower": "../anki-export/card-styles/Cornflower/style.css",
        "Cornflower (+ reversed card)": "../anki-export/card-styles/Cornflower/style.css",
        "Forest": "../anki-export/card-styles/Forest/style.css",
        "Forest (+ reversed card)": "../anki-export/card-styles/Forest/style.css",
        "Office": "../anki-export/card-styles/Office/style.css",
        "Office (+ reversed card)": "../anki-export/card-styles/Office/style.css",
        "Leporelo": "../anki-export/card-styles/Leporelo/style.css",
        "Leporelo (+ reversed card)": "../anki-export/card-styles/Leporelo/style.css",
        "Programmers Can't Design": "../anki-export/card-styles/Programmers Can't Design/style.css",
        "Programmers Can't Design (+ reversed card)": "../anki-export/card-styles/Programmers Can't Design/style.css",
    }

    const requiredFields = {
        "Lame": [
            [0, "all", [0]],
        ],
        "Lame (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Flashcard": [
            [0, "all", [0]],
        ],
        "Flashcard (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Histological Hell": [
            [0, "all", [0]],
        ],
        "Histological Hell (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Cornflower": [
            [0, "all", [0]],
        ],
        "Cornflower (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Forest": [
            [0, "all", [0]],
        ],
        "Forest (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Office": [
            [0, "all", [0]],
        ],
        "Office (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Leporelo": [
            [0, "all", [0]],
        ],
        "Leporelo (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Programmers Can't Design": [
            [0, "all", [0]],
        ],
        "Programmers Can't Design (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
    }

    this.cardStyle = undefined

    /**
     * Method triggering loading of the stylesheet and HTML code for the model
     * @param cardStyle
     */
    this.loadModel = function(cardStyle) {
        this.cardStyle = cardStyle

        let stylesheetFL = new FileLoader(modelStylesheets[cardStyle])
        $("#anki-stylesheet-holder").text("Loading")
        stylesheetFL.loadContents("anki-stylesheet-holder")

        let template = modelTemplates[cardStyle]
        $("#anki-template-holder").text("Loading")
        for (let i = 0; i < template.length; i++) {
            let questionHtmlFL = new FileLoader(template[i]["qfmt"])
            let answerHtmlFL = new FileLoader(template[i]["afmt"])

            template[i]["qfmt"] = "{{{questionHtml}}}"
            template[i]["afmt"] = "{{{answerHtml}}}"

            $("anki-question-html-holder-" + (i+1)).text("Loading")
            $("anki-answer-html-holder-" + (i+1)).text("Loading")

            questionHtmlFL.loadContents("anki-question-html-holder-" + (i+1))
            answerHtmlFL.loadContents("anki-answer-html-holder-" + (i+1))
        }

        $("#anki-template-holder").text(JSON.stringify(template))
    }

    /**
     * Method compiling all the loaded data into an Anki model and returns it
     * @param css Loaded stylesheet
     * @param templates Template array with the loaded HTML code filled in
     * @returns {Model}
     */
    this.getModel = function(css, templates) {
        return m = new Model({
            name: this.cardStyle,
            id: modelIds[this.cardStyle],
            flds: [
                {name: "Front"},
                {name: "Back"}
            ],
            req: requiredFields[this.cardStyle],
            css: css,
            tmpls: templates
        })
    }
}
