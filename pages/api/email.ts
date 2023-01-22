import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // create reusable transporter object using the default SMTP transport
    let message = ""
    console.log(req.body.email)
 
      try {
        const response = await fetch("https://aid-e.netlify.app/api/openai", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify("+1@" + req.body.history),
        });
        const data = await response.json();
        console.log("message🥳 ",data)
        message = data;
    } catch (error) {
        console.error('Error:', error);
    }
   

    let transporter = nodemailer.createTransport({
        host: 'mail.gmx.com',
        port: 587,
        secure: false, // set to false
        auth: {
            user: 'aid-e@gmx.de', 
            pass: process.env.EMAIL_PASSWORD
        }
    });


    let info = await transporter.sendMail({
        from: 'aid-e@gmx.de', // sender address
        to: req.body.email, // list of receivers
        subject: "The Alpaca Report: Monthly Edition", // Subject line
        html: message, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: 'Email sent successfully' });
};
