import {ContactRequest} from "../interfaces/api";

export const validateForm = (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    subject: string,
    message: string
): { is_valid: boolean, errors: Record<keyof ContactRequest, boolean> } => {

    let isValid = true;

    let tempErrors : Record<keyof ContactRequest, boolean> = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        subject: false,
        message: false
    };

    if (firstName.length <= 0) {
        tempErrors["firstName"] = true;
        isValid = false;
    }
    if (lastName.length <= 0) {
        tempErrors["lastName"] = true;
        isValid = false;
    }
    if (email.length <= 0) {
        tempErrors["email"] = true;
        isValid = false;
    }
    if (subject.length <= 0) {
        tempErrors["subject"] = true;
        isValid = false;
    }
    if (message.length <= 0) {
        tempErrors["message"] = true;
        isValid = false;
    }

    return {is_valid: isValid, errors: tempErrors};
}
