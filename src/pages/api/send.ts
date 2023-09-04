// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import  type {NextApiRequest, NextApiResponse} from 'next'
import * as nodemailer from "nodemailer";
import {validateForm} from "../../helpers/validate.form";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    if (req.method === "POST") {

        const transporter = nodemailer.createTransport({
            port: process.env.SMTP_PORT as any,
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            secure: true,
        });

        if (process.env.NODE_ENV === "development") {
            res.status(200).json({messageId: 'dummy', type: 'testing_purpose'})
        } else {

            const {
                is_valid,
                errors
            } = validateForm(req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.subject, req.body.message);

            if (is_valid) {

                transporter.sendMail({
                    from: {
                        name: req.body.firstName + " " + req.body.lastName,
                        address: req.body.email
                    },
                    to: process.env.SMTP_RECIPIENT,
                    subject: '[WEBSITE] ' + req.body.subject,
                    text: req.body.message + '\n____________ \nAdditional details:\nPhone: ' + req.body.phone
                }, (err, info) => {
                    if (err) {
                        res.status(400).json({err})
                    } else {
                        res.status(200).json({messageId: info.messageId})
                    }
                });

            } else {
                res.status(400).json({errors})
            }

        }

    } else {
        res.status(404).json({message: "Not found"});
    }

}
