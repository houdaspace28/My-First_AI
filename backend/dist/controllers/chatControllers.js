import { configureOpenai } from "../config/openai-config.js";
import userModel from "../models/user.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await userModel.findOne({ email: res.locals.jwtData.email });
        if (!user) {
            res.status(401).json({ message: "User not registered or token malfunction" });
        }
        const chats = user.chats.map(({ role, content }) => {
            return { role, content };
        });
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const config = configureOpenai();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", cause: error.message });
    }
};
//# sourceMappingURL=chatControllers.js.map