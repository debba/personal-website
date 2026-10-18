import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {validateForm} from "../../helpers/validate.form";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../i18n/dictionary";
import {ContactRequest} from "../../interfaces/api";

type FieldName = keyof ContactRequest;

export const ContactForm = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const [formSending, setFormSending] = useState<'ready' | 'pending'>('ready');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const totalNumbersChars = 500;
    const countMessageCharsRemaining = totalNumbersChars - message.length;

    const successRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (showSuccessMessage) successRef.current?.focus();
    }, [showSuccessMessage]);

    const goBackForm = () => {
        setShowSuccessMessage(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {is_valid, errors} = validateForm(firstName, lastName, email, phone, subject, message);
        setErrors(errors);
        if (!is_valid) {
            const firstInvalid = (Object.keys(errors) as FieldName[]).find(key => errors[key]);
            if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
            return;
        }

        setFormSending('pending');
        setShowFailureMessage(false);
        try {
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
            setShowSuccessMessage(!error);
            setShowFailureMessage(!!error);
        } catch {
            setShowFailureMessage(true);
        }
        setFormSending('ready');
    };

    const field = (name: FieldName, label: string, value: string, onChange: (value: string) => void, opts: {
        type?: string,
        autoComplete?: string,
        required?: boolean,
        wide?: boolean
    } = {}) => {
        const id = `contact-${name}`;
        const errorId = `${id}-error`;
        const required = opts.required !== false;
        return (
            <div className={`flex flex-col gap-1.5 ${opts.wide ? 'sm:col-span-2' : ''}`}>
                <label htmlFor={id} className="flex items-baseline text-sm font-medium text-fg">
                    {label}
                    {!required && <span className="ml-auto text-xs text-muted">{t('section_contactme_optional') as string}</span>}
                </label>
                <input type={opts.type || 'text'} value={value} onChange={(e) => onChange(e.target.value)}
                       id={id} name={name} autoComplete={opts.autoComplete} required={required}
                       aria-invalid={errors[name] || undefined}
                       aria-describedby={errors[name] ? errorId : undefined}
                       className="input bg-bg"/>
                {errors[name] && (
                    <p id={errorId} className="text-sm text-danger">{t(name === 'email' ? 'section_contactme_invalid_email' : 'section_contactme_required') as string}</p>
                )}
            </div>
        );
    };

    return (
        <div>
            {
                showSuccessMessage ? (
                    <div className="text-center">
                        <h3 ref={successRef} tabIndex={-1} className="tile-title text-success">
                            {t('section_contactme_emailsent') as string}
                        </h3>
                        <p className="mt-2 text-muted">
                            {t('section_contactme_emailsent_desc') as string}
                        </p>
                        <button type="button" onClick={goBackForm} className="btn-secondary mt-6">
                            {t('section_contactme_goback') as string}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate>
                        <p className="mb-5 text-sm text-muted">{t('section_contactme_form_hint') as string}</p>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {field('firstName', t('section_contactme_firstname') as string, firstName, setFirstName, {autoComplete: 'given-name'})}
                            {field('lastName', t('section_contactme_lastname') as string, lastName, setLastName, {autoComplete: 'family-name'})}
                            {field('email', t('section_contactme_email') as string, email, setEmail, {type: 'email', autoComplete: 'email'})}
                            {field('phone', t('section_contactme_phone') as string, phone, setPhone, {type: 'tel', autoComplete: 'tel', required: false})}
                            {field('subject', t('section_contactme_subject') as string, subject, setSubject, {wide: true})}
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label htmlFor="contact-message" className="text-sm font-medium text-fg">
                                    {t('section_contactme_message') as string}
                                </label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                                          maxLength={totalNumbersChars} required
                                          rows={5} id="contact-message" name="message"
                                          aria-invalid={errors.message || undefined}
                                          aria-describedby={`contact-message-count${errors.message ? ' contact-message-error' : ''}`}
                                          className="input bg-bg"/>
                                <div className="flex text-xs text-muted">
                                    {errors.message && (
                                        <p id="contact-message-error" className="text-sm text-danger">{t('section_contactme_required') as string}</p>
                                    )}
                                    <p id="contact-message-count" className="ml-auto">
                                        {t('section_contactme_maxchars', {total: totalNumbersChars}) as string}
                                        {' · '}
                                        {t('section_contactme_remainingchars', {total: countMessageCharsRemaining}) as string}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div role="status" aria-live="polite">
                            {showFailureMessage && (
                                <div className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm">
                                    <p className="font-semibold text-danger">{t('section_contactme_emailfailed') as string}</p>
                                    <p className="mt-1 text-fg">{t('section_contactme_emailfailed_desc') as string}</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button disabled={formSending === 'pending'} type="submit"
                                    className="btn-primary disabled:cursor-wait disabled:opacity-70">
                                {t(formSending === 'pending' ? 'section_contactme_sending' : 'section_contactme_submit') as string}
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    )
};
