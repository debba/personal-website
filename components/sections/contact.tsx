import React, {FormEvent, FormEventHandler, useState} from 'react';

export const ContactFormSection = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [errors, setErrors] = useState({});

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");

    const handleValidation = () => {
        let tempErrors = {
            firstName: false,
            lastName: false,
            email: false,
            phone: false,
            subject: false,
            message: false
        };
        let isValid = true;

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

        setErrors({ ...tempErrors });
        console.log("errors", errors);
        return isValid;
    };

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText("Sending");
            const res = await fetch("/api/send", {
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    phone,
                    subject,
                    message
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { error } = await res.json();
            if (error) {
                console.log(error);
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText("Send");
                return;
            }
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setButtonText("Send");
        }
    };

    return (
    <section id="contact" className="my-1 md:my-[100px]">
        <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">CONTACT
            ME</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="first-name">First name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="first-name" name="first-name" className="text-gray-800 form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  id="last-name" name="last-name" className="text-gray-800 form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="text-gray-800 form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone">
                            <div className="flex align-items">
                                Phone
                                <span className="ml-auto opacity-75">Optional</span>
                            </div>
                        </label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" name="phone" className="text-gray-800 form-input px-3 py-2 rounded-md"/>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} id="subject" name="subject" className="text-gray-800 form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="subject">
                            <div className="flex align-items">
                                Message
                                <span className="ml-auto opacity-75">Max. 500 characters</span>
                            </div>
                        </label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={4} id="subject" name="subject"
                                  className="text-gray-800 form-input px-3 py-2 rounded-md" required/>
                    </div>
                </div>
                <div className="flex justify-end py-4">
                    <button type="submit"
                            className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    </section>
    )
};
