import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").trim().isEmail().withMessage("Respect email format"),
    body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
export const signUpValidator = [
    body("nom").notEmpty().withMessage("Nom is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validator.js.map