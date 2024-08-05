import { Router } from "express";
import userRouter from "./userRouter.js";
import chatsRouter from "./chatsRouter.js";
const mainRouter = Router();
mainRouter.use("/user", userRouter);
mainRouter.use("/chat", chatsRouter);
export default mainRouter;
//# sourceMappingURL=mainRouter.js.map