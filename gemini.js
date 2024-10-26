const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = 'AIzaSyA_G686AHsscoyEKCyLf37_wxIjoIcY-tE'
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "the problem statement i am giving is from the someone who is travelling through train and want to complain the system they are facing and i want to give you two things that is first that the problem is genuine or not and the solution you can give according to you to someone who is having authority in simple words and give them in json format {genuine:\" \",solution:\"\"}",
  });
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "problem: i am getting bad quality of food from the train vendors"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n\"genuine\": \"Yes, poor food quality is a genuine concern for travelers on trains.\",\n\"solution\": \"Ensure better quality control and hygiene standards for food vendors. Consider introducing contracts with established food providers with proven quality and hygiene records. Implementing regular inspections and training for vendors on food handling and preparation practices could also be beneficial. Informing passengers about vendor complaints and feedback channels will also improve service quality.\"\n}\n``` \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("problem: i am getting bad quality of food from the train vendors");
    console.log(result.response.text());
  }
  
  run();