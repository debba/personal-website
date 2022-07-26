import {ProjectItem} from "../interfaces/data";
import React from "react";

export const PROJECTS: ProjectItem[] = [
    {
        github_name: 'greenpass-covid19-qrcode-decoder',
        image: "/images/projects/greenpass-covid19-qrcode-decoder.png",
        name: "GreenPass Covid-19 QR Code Decoder",
        short_description: {
            en: "An easy web app for decoding Green Pass Covid-19 QrCode",
            it: "Una semplice web app per decodificare il QrCode del Green Pass Covid-19"
        },
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
    },
    {
        github_name: 'wp-two-factor-authentication-with-telegram',
        image: "/images/projects/wp-factor-login-telegram.png",
        name: "WP 2FA with Telegram",
        short_description: {
            en: "Enable Two-factor authentication for WordPress Login using Telegram",
            it: "Abilita l’autenticazione a 2 fattori su WordPress utilizzando Telegram"
        },
        description: {
            en: '<ol  class="list-outside hover:list-inside list-decimal">\n' +
                '<li class="py-2"><strong>Easy Configuration</strong>: install plugin and setup in a few seconds.</li>\n' +
                '<li class="py-2"><strong>Increase security</strong>: increase the level of security in your blog / website by adding and additional authentication factor</li>\n' +
                '<li class="py-2"><strong>Speed</strong>: Forget additional apps, sms or captcha. Use Telegram for a very fast experience!</li>\n' +
                '<li class="py-2"><strong>Allow users to enable Two-factor authentication</strong>: every user directly from own profile may decide to require secure login.</li>\n' +
                '<li class="py-2"><strong>Send alert</strong>: set a Telegram Chat Id for an admin to receive  for receiving notifications every time users fail login.</li>\n' +
                '<li class="py-2"><strong>FAQ</strong>: read the FAQ inside plugin for create your Telegram Bot</li>\n' +
                '<li class="py-2"><strong>Languages</strong>: plugin is available in Italian, English and Spanish languages.</li>\n' +
                '</ol>',
            it: '<ol  class="list-outside hover:list-inside list-decimal">\n' +
                '<li class="py-2"><strong>Facile Configurazione</strong>: installa il plugin e configuralo in pochi secondi.</li>\n' +
                '<li class="py-2"><strong>Rafforza la sicurezza</strong>: aumenta il livello di sicurezza nel tuo blog / sito web aggiungendo un fattore di autenticazione in più</li>\n' +
                '<li class="py-2"><strong>Velocità</strong>: Dimentica app addizionali, SMS o sistemi captcha. Usa Telegram per un’esperienza molto più veloce!</li>\n' +
                '<li class="py-2"><strong>Permetti agli utenti di abilitare l’autenticazione a due fattori</strong>: ogni utente direttamente dal proprio profilo potrà decidere di richiedere un’autenticazione sicura.</li>\n' +
                '<li class="py-2"><strong>Invio notifiche</strong>: imposta una Telegram Chat ID per un amministratore per riceve notifiche ogni volta che gli utenti falliscono il login.</li>\n' +
                '<li class="py-2"><strong>FAQ</strong> consulta le FAQ all’interno del plugin per creare il tuo Bot su Telegram</li>\n' +
                '<li class="py-2"><strong>Lingue</strong>: questo plugin è disponibile in Italiano, Inglese e Spagnolo</li>\n' +
                '</ol>'
        }
    },
    {
        github_name: 'less2scss',
        name: "Less2scss",
        short_description: {
            en: "Npm package for converting LESS files to SCSS.",
            it: "Pacchetto NPM per convertire i file LESS in SCSS."
        },
        description: {
            en: '<p>You can provide an entire folder, this package will scan all less files whose find in subfolders and it\'ll create SCSS files in the same folder or in the new directory provided recreating the source hierarchy.</p>',
            it: '<p>Puoi fornire un\'intera cartella, questo pacchetto scansionare tutti i files LESS (anche all\'interno delle sottocartelle) e genererà i files SCSS nella stessa cartella o in una nuova indicata ricreando la stessa gerarchia.</p>',
        }
    }
];
