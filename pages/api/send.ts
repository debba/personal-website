// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from "nodemailer";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT as any,
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        secure: true,
    });

    transporter.sendMail({
        from: {
            name: req.body.firstName +  " "+req.body.lastName,
            address: req.body.email
        },
        to: process.env.SMTP_RECIPIENT,
        subject: '[WEBSITE] '+req.body.message,
        text: req.body.message+'\n____________ \nAdditional details:\nPhone: '+req.body.phone
    },  (err, info) => {
        if (err){
            res.status(400).json({ err })
        } else {
            res.status(200).json({ messageId: info.messageId })

        }
    })

}
