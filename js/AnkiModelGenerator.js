function AnkiModelGenerator()
{
    const modelIds = {
        "Lame": 1675587030878,
        "Flashcard": 1675587101872,
        "Lame (+ reversed card)": 1675607468632,
        "Flashcard (+ reversed card)": 1675609685997,
    }

    const modelTemplates = {
        "Lame": [
            {
                "name": "Card 1",
                "qfmt": '<div style="font-family: arial;font-size: 20px;text-align: center;color: black;background-color: white;">\n\t{{Front}}\n</div>',
                "afmt": '<div style="font-family: arial;font-size: 20px;text-align: center;color: black;background-color: white;">\n\t{{Front}}\n\n\t<hr id=answer>\n\n\t{{Back}}\n</div>',
            },
        ],
        "Flashcard": [
            {
                "name": "Card 1",
                "qfmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;">\n\t<div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;">\n\t\t<span>{{Front}}</span>\n\t</div>\n</div>',
                "afmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;">\n\t<div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;">\n\t\t<span>{{Back}}</span>\n\t</div>\n</div>',
            },
        ],
        "Lame (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": '{{Front}}',
                "afmt": '{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}',
            },
            {
                "name": "Card 2",
                "qfmt": '{{Back}}',
                "afmt": '{{FrontSide}}\n\n<hr id=answer>\n\n{{Front}}',
            },
        ],
        "Flashcard (+ reversed card)": [
            {
                "name": "Card 1",
                "qfmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;"><div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;"><span>{{Front}}</span></div></div>',
                "afmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;"><div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;"><span>{{Back}}</span></div></div>',
            },
            {
                "name": "Card 2",
                "qfmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;"><div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;"><span>{{Back}}</span></div></div>',
                "afmt": '<div style="height: 93vh;width: 100%;display: flex;justify-content: center\t;align-items: center;font-family: Arial;font-size: 24px;text-align: center;color: black;background-color: #fbfbfb;"><div style="width: 400px;height: 200px;border-radius: 30px;border: 4px solid #222;box-shadow: 5px 5px 10px gray;background-color: white;display:flex;justify-content: center;align-items: center;"><span>{{Front}}</span></div></div>',
            },
        ],
    }

    const requiredFields = {
        "Lame": [
            [0, "all", [0]],
        ],
        "Flashcard": [
            [0, "all", [0]],
        ],
        "Lame (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
        "Flashcard (+ reversed card)": [
            [0, "all", [0]],
            [1, "all", [1]],
        ],
    }

    this.getModel = function(cardStyle) {
        return new Model({
            name: cardStyle,
            id: modelIds[cardStyle],
            flds: [
                {name: "Front"},
                {name: "Back"}
            ],
            req: requiredFields[cardStyle],
            tmpls: modelTemplates[cardStyle]
        })
    }
}