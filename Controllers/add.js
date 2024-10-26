const { validationResult } = require('express-validator')
const Query = require("../Models/Query");

// gemini part
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = 'AIzaSyA_G686AHsscoyEKCyLf37_wxIjoIcY-tE'
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "the problem statement i am giving is from the someone who is travelling through train and want to complain the system they are facing and i want to give you two things that is first that the problem is genuine or not by just yes or no and the solution you can give according to you to someone who is having authority in simple words and give them in json format {genuine:\" \",solution:\"\"} make it plain don't use markdown to look it good and really plain not even the \n for new line or something so that i can use it my api backend and access it easily",
  });
  
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prob) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
  
    const result = await chatSession.sendMessage("problem: i am getting bad quality of food from the train vendors");
    return result.response.text()
    
  }
  
  

// add req opart
const add = async (req, res) => {
    try {
        const {
            pnr,
            title,
            image,
            content,
            contact,

        } = req.body;
        const solutionbyai = await run({prob:content});
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

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