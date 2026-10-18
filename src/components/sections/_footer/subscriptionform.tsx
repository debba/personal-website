import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

const SubscriptionForm: React.FC = () => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const emailchefSignupKey = process.env.NEXT_PUBLIC_EMAILCHEF_SIGNUP_KEY;

    return <form
        method="POST"
        action={`https://app.emailchef.com/signupwl/${emailchefSignupKey}/en`}
        encType="multipart/form-data"
    >
        <label htmlFor="field-1" className="block text-sm text-muted">
            {t('footer_newsletter_email') as string}
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
            <input
                id="field-1" name="field[-1]"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder={t('footer_newsletter_email_placeholder') as string}
            />
            <button type="submit" className="btn-primary shrink-0">
                {t('footer_newsletter_email_subscribe') as string}
            </button>
        </div>
        <input type="hidden" name="form_id" value="4564"/>
        <input type="hidden" name="lang" value=""/>
        <input type="hidden" name="referrer" id="ec_referrer" value=""/>
        <div id="ec_recaptcha"></div>
    </form>
}

export default SubscriptionForm;
