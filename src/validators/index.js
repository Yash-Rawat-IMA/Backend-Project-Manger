import { body } from "express-validator";


const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({min: 3})
            .withMessage("Username must be atleast 3 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({min: 8})
            .withMessage("Password must be atleast 8 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
            .withMessage("Password must contain special character with at least one Uppercase, lowercase, and a number")
            .not().contains(" ")
            .withMessage("Password must not contain spaces"),
        body("fullname")
            .optional()
            .trim(),
            
    ]
}

export {
    userRegisterValidator
}