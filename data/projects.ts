import {ProjectItem} from "../interfaces/data";
import React from "react";

export const PROJECTS: ProjectItem[] = [
    {
        github_name: 'greenpass-covid19-qrcode-decoder',
        image: "/images/projects/greenpass-covid19-qrcode-decoder.png",
        name: "GreenPass Covid-19 QR Code Decoder",
        short_description: "An easy tool for decoding Green Pass Covid-19 QrCode\n",
        description: {
            en: '<p>In 2021 I developed a simple web app for decoding data from EU Green Pass QR Code.</p>\n' +
                '<p>I used Python with Flask and deployed my app using Heroku.</p>\n' +
                '<p>You just need to attach your certificate to immediately get a complete reading of the QR code.</p>\n' +
                '<p>Also in this case, no data will be stored and that if you want, since the code is open source, you can\n' +
                'create your instance without any worries.</p>',
            it: '<p>Nel 2021 ho sviluppato una semplice web app il cui scopo è quello di decodificare il QRCode del Green Pass europeo.</p>\n' +
                '<p>Ho utilizato Python con Flask e ho deployato l\'app con Heroku.</p>\n' +
                '<p>Basta allegare il proprio certificato e immediatamente avviene la lettura dei dati dal QR Code.</p>\n' +
                '<p>Nessun dato inviato viene salvato e dal momento che è open-source è possibile creare una propria istanza forkando il progetto di Github.</p>'
        }
    }
];
