const Query = require( "../Models/Query");

const get = async (req, res) => {
    try {


        const notes = await Query.find();
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = get;