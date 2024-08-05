import { Router } from "express";
import { getAllUsers, signUpUser, verifyUser } from "../controllers/userController.js";
import { validate, signUpValidator, loginValidator } from "../utils/validator.js";
import { loginUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), signUpUser);
userRouter.post("/login", validate(loginValidator), loginUser);
userRouter.get('/auth-status', verifyToken, verifyUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map