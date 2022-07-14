import React from 'react';

export const ContactFormSection = () => (
    <section id="contact" className="my-1 md:my-[100px]">
        <h2 className="font-roboto text-secondary-color text-center font-extralight uppercase text-3xl md:text-5xl text-white mb-4 leading-normal break-words tracking-tight">CONTACT
            ME</h2>
        <div>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="first-name">First name</label>
                        <input type="text" id="first-name" name="first-name" className="form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" id="last-name" name="last-name" className="form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone">
                            <div className="flex align-items">
                                Phone
                                <span className="ml-auto opacity-75">Optional</span>
                            </div>
                        </label>
                        <input type="tel" id="phone" name="phone" className="form-input px-3 py-2 rounded-md"/>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" className="form-input px-3 py-2 rounded-md"
                               required/>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="subject">
                            <div className="flex align-items">
                                Message
                                <span className="ml-auto opacity-75">Max. 500 characters</span>
                            </div>
                        </label>
                        <textarea maxLength={500} rows={4} id="subject" name="subject"
                                  className="form-input px-3 py-2 rounded-md" required/>
                    </div>
                </div>
                <div className="flex justify-end py-4">
                    <button type="submit"
                            className="bg-secondary-color text-indigo-100  hover:bg-indigo-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </section>
);
