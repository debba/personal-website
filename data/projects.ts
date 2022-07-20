import {ProjectItem} from "../interfaces/data";
import React from "react";

export const PROJECTS: ProjectItem[] = [
    {
        github_name: 'greenpass-covid19-qrcode-decoder',
        image: "/images/projects/greenpass-covid19-qrcode-decoder.png",
        name: "GreenPass Covid-19 QR Code Decoder",
        short_description: "An easy tool for decoding Green Pass Covid-19 QrCode\n",
        description: `
            <p>In 2021 I developed a simple tool for decoding data from EU Green Pass QR Code.</p>
<p>I used Python with Flask and deployed my app using Heroku.</p>
<p>You just need to attach your certificate to immediately get a complete reading of the QR code.</p>
<p>Also in this case, no data will be stored and that if you want, since the code is open source, you can
create your instance without any worries.</p>`
    }
];
