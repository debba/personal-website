import React from "react";
import {useG11n} from "next-g11n";
import {DICTIONARY} from "../../../i18n/dictionary";

const SubscriptionForm: React.FC<{ }> = ({}) => {
    const {translate: t} = useG11n<typeof DICTIONARY>(DICTIONARY, false);
    const emailchefSignupKey = process.env.NEXT_PUBLIC_EMAILCHEF_SIGNUP_KEY;

    return <form
        method="POST"
        action={`https://app.emailchef.com/signupwl/${emailchefSignupKey}/en`}
        encType="multipart/form-data"
    >
        <label className="block mb-6">
                                    <span className="text-black dark:text-white text-sm">
                                        {t('footer_newsletter_email') as string}
                                    </span>
            <input
                id="field-1" name="field[-1]"
                type="email"
                required
                className="
            block
            w-full
            md:w-1/2
            mt-1
            text-secondary-color
            border-secondary-color
            dark:text-gray-800
            dark:border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder={t('footer_newsletter_email_placeholder') as string}
            />
        </label>

        <input type="hidden" name="form_id" value="4564"/>
        <input type="hidden" name="lang" value=""/>
        <input type="hidden" name="referrer" id="ec_referrer" value=""/>
        <div id="ec_recaptcha"></div>
        <div className="mb-6 mt-2">
            <button
                type="submit"
                className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                                        <span>
                                        {t('footer_newsletter_email_subscribe') as string}
                                            </span>
            </button>
        </div>
    </form>
}

export default SubscriptionForm;
