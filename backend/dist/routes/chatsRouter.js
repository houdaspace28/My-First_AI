import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { generateChatCompletion } from "../controllers/chatControllers.js";
const chatsRouter = Router();
chatsRouter.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
export default chatsRouter;
//# sourceMappingURL=chatsRouter.js.map