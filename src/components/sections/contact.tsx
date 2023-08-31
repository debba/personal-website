import React, {FormEvent, useState} from 'react';
import {validateForm} from "../../helpers/validate.form";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";

export const ContactFormSection = () => {

    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);

    const sendingButtonText = t('section_contactme_sending') as string;
    const submitButtonText = t('section_contactme_submit') as string;

    const [formSending, setFormSending] = useState<'ready' | 'pending'>('ready');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [errors, setErrors] = useState({});

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [buttonText, setButtonText] = useState(submitButtonText);

    const totalNumbersChars = 500;

    const [countMessageCharsRemaining, setCountMessageCharsRemaining] = useState<number>(totalNumbersChars);

    const goBackForm = () => {
        setShowSuccessMessage(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
    }

    const handleValidation = () => {

        const {is_valid, errors} = validateForm(firstName, lastName, email, phone, subject, message);
        setErrors({...errors});
        return is_valid;
    };

    const handleMessageChange = (message: string) => {
        setMessage(message);
        setCountMessageCharsRemaining(totalNumbersChars-(message.length));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormSending('pending');

        let isValidForm = handleValidation();

        if (isValidForm) {
            setButtonText(sendingButtonText);
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

            const {error} = await res.json();
            if (error) {
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setButtonText(submitButtonText);
            } else {
                setShowSuccessMessage(true);
                setShowFailureMessage(false);
                setButtonText(submitButtonText);
            }
        }
        setFormSending('ready');
    };

    return (
        <section id="contacts" className="py-3 md:py-[100px]">
            <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl mb-4 leading-normal break-words tracking-tight">
                {t('section_contactme') as string}
            </h2>
            {
                showSuccessMessage ? (
                    <div className="mt-2 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                         role="alert">
                        <p className="font-bold">
                            {t('section_contactme_emailsent') as string}
                        </p>
                        <p className="text-sm">
                            {t('section_contactme_emailsent_desc') as string}
                        </p>
                        <div className="flex justify-end py-4">
                            <button type="submit" onClick={(e) => goBackForm()}
                                    className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                {t('section_contactme_goback') as string}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-black dark:text-white" htmlFor="first-name">
                                        {t('section_contactme_firstname') as string}
                                    </label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                           id="first-name" name="first-name"
                                           className="text-gray-800 form-input px-3 py-2 rounded-md"
                                           required/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-black dark:text-white" htmlFor="last-name">
                                        {t('section_contactme_lastname') as string}
                                    </label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                           id="last-name" name="last-name"
                                           className="text-gray-800 form-input px-3 py-2 rounded-md"
                                           required/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-black dark:text-white" htmlFor="email">
                                        {t('section_contactme_email') as string}
                                    </label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                           id="email"
                                           name="email" className="text-gray-800 form-input px-3 py-2 rounded-md"
                                           required/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-black dark:text-white" htmlFor="phone">
                                        <div className="flex align-items">
                                            {t('section_contactme_phone') as string}
                                            <span className="ml-auto opacity-75">
                                    {t('section_contactme_optional') as string}
                                        </span>
                                        </div>
                                    </label>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                           id="phone"
                                           name="phone" className="text-gray-800 form-input px-3 py-2 rounded-md"/>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="text-black dark:text-white" htmlFor="subject">
                                        {t('section_contactme_subject') as string}
                                    </label>
                                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                                           id="subject" name="subject"
                                           className="text-gray-800 form-input px-3 py-2 rounded-md"
                                           required/>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="text-black dark:text-white" htmlFor="text">
                                        <div className="flex align-items">
                                            {t('section_contactme_message') as string}
                                            <span className="ml-auto opacity-75">
                                            {t('section_contactme_maxchars', {total: totalNumbersChars}) as string}
                                            </span>
                                            <span className={"ml-2 opacity-60 "}>{t('section_contactme_remainingchars', {total: countMessageCharsRemaining}) as string}</span>
                                        </div>
                                    </label>
                                    <textarea value={message} onChange={(e) => handleMessageChange(e.target.value)}
                                              maxLength={500}
                                              rows={4} id="text" name="text"
                                              className="text-gray-800 form-input px-3 py-2 rounded-md" required/>
                                </div>
                            </div>
                            <div className="flex justify-end py-4">
                                <button disabled={formSending === 'pending'} type="submit"
                                        className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    {buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </section>
    )
};
