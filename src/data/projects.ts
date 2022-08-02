import {ProjectItem} from "../interfaces/data";
import React from "react";

export const PROJECTS: ProjectItem[] = [
    {
        github_user: 'debba',
        github_name: 'greenpass-covid19-qrcode-decoder',
        image: {cover: "/images/projects/cover/greenpass-covid19-qrcode-decoder.png"},
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
        github_user: 'debba',
        github_name: 'wp-two-factor-authentication-with-telegram',
        image: {
            cover: "/images/projects/cover/wp-factor-login-telegram.png",
            icon: "/images/projects/icon/wp-factor-login-telegram.png"
        },
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
        github_user: 'debba',
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
    },
    {
        github_user: 'dueclic',
        github_name: 'emailchef-for-wordpress',
        image: {
            cover: "/images/projects/cover/emailchef-for-wordpress.png",
            icon: "/images/projects/icon/emailchef-for-wordpress.png"
        },
        name: "eMailChef for WordPress",
        short_description: {
            en: "This is the perfect marketing WordPress tool to add an intuitive and solid email campaign solution with eMailChef to your website.",
            it: "Strumento di marketing perfetto per aggiungere al tuo sito web WordPress una soluzione intuitiva e solida per le campagne e-mail con eMailChef."
        },
        hide_stats: true,
        description: {
            en: '<p>Send your email marketing campaigns through the interface provided on emailchef.com.</p>' +
                '<p>With eMailChef you can choose between multiple subscription plans divided by functionality and contacts and you can also decide to subscribe to a custom plan, built to suit your needs.</p>' +
                '<p>This is the perfect marketing tool to add an intuitive and solid email campaign solution to your website.</p>' +
                '<p>Every form submission from WPForms, Contact Form 7, Fast Secure Contact Form (FSCF) and Jetpack (more supported plugins coming: contact us for advices!) will be automatically synced with the selected eMailChef contact list.</p>' +
                '<p>It also supports customized fields you can use to segment your customers! E.g. if in a form you ask for customers type (reseller, hotels, etc.) you can easily create a newsletter just for them.</p>',
            it: '<p>Send your email marketing campaigns through the interface provided on emailchef.com.</p>' +
                '<p>With eMailChef you can choose between multiple subscription plans divided by functionality and contacts and you can also decide to subscribe to a custom plan, built to suit your needs.</p>' +
                '<p>This is the perfect marketing tool to add an intuitive and solid email campaign solution to your website.</p>' +
                '<p>Every form submission from WPForms, Contact Form 7, Fast Secure Contact Form (FSCF) and Jetpack (more supported plugins coming: contact us for advices!) will be automatically synced with the selected eMailChef contact list.</p>' +
                '<p>It also supports customized fields you can use to segment your customers! E.g. if in a form you ask for customers type (reseller, hotels, etc.) you can easily create a newsletter just for them.</p>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'emailchef-for-woocommerce',
        image: {
            cover: "/images/projects/cover/emailchef-for-woocommerce.png",
            icon: "/images/projects/icon/emailchef-for-woocommerce.png"
        },
        name: "eMailChef for WooCommerce",
        short_description: {
            en: "Using this WooCommerce plugin, eMailChef can communicate with your online store and it creates easy, simply and automatic targeted campaigns. ",
            it: "Usando questo plugin per WooCommerce, eMailChef può comunicare con il tuo negozio online e potrai creare in modo semplice automazioni per i tuoi clienti."
        },
        hide_stats: true,
        description: {
            en: '<p>Send your email marketing campaigns through the interface provided on emailchef.com.</p>' +
                '<p>With eMailChef you can choose between multiple subscription plans divided by functionality and contacts and you can also decide to subscribe to a custom plan, built to suit your needs.</p>' +
                '<p>This is the perfect marketing tool to add an intuitive and solid email campaign solution to your website.</p>' +
                '<p>Every form submission from WPForms, Contact Form 7, Fast Secure Contact Form (FSCF) and Jetpack (more supported plugins coming: contact us for advices!) will be automatically synced with the selected eMailChef contact list.</p>' +
                '<p>It also supports customized fields you can use to segment your customers! E.g. if in a form you ask for customers type (reseller, hotels, etc.) you can easily create a newsletter just for them.</p>',
            it: '<p>Se possiedi un e-commerce, l’email marketing è uno degli strumenti più potenti ed efficaci per incrementare le vendite e fidelizzare i clienti.</p>' +
                '<p>Il plugin di eMailChef per WooCommerce ti consente di:</p>' +
                '<ul>' +
                '<li><strong>trasferire le informazioni relative ai clienti e ai loro ordini</strong> nel tuo account eMailChef</li>' +
                '<li><strong>segmentare i clienti</strong> in base agli ordini, ai carrelli abbandonati, ecc.</li>' +
                '<li><strong>gestire e sincronizzare le iscrizioni alla newsletter</strong> da WooCommerce a eMailChef</li>' +
                '<li><strong>risparmiare soldi con le newsletter</strong> mantenendo i tuoi clienti coinvolti</li>' +
                '<li><strong>Creare automazioni</strong> per carrelli abbandonati, ricomponese, ordini ricorrenti e molto altro.</li>' +
                '</ul>'
        }
    }
];
