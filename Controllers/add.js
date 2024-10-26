const { validationResult } = require('express-validator')
const Query = require( "../Models/Query");
const add = async (req, res) => {
    try {
        const {
            pnr,
            title,
            image,
            content,
            solutionbyai,
            contact,

        } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const img = `https://robohash.org/${req.body.title}.png`;

        const note = new Query({
            pnr,
            title,
            image,
            content,
            solutionbyai,
            contact,
        });
        const savedNote = await note.save();

        // res.json(savedNote);
        var json = JSON.stringify(savedNote);

        res.send(json);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = add;