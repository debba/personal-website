import {ProjectItem} from "../interfaces/data";

export const PROJECTS: ProjectItem[] = [
    {
        github_user: 'debba',
        github_name: 'storytel-player',
        image: {cover: "/images/projects/cover/storytel-player.png"},
        name: "Storytel Player",
        short_description: {
            en: "Unofficial cross-platform desktop application for Storytel audiobook streaming with offline support",
            it: "Applicazione desktop non ufficiale multi-piattaforma per Storytel con supporto offline"
        },
        description: {
            en: '<p>Storytel Player is an unofficial, open-source desktop application for Storytel audiobook streaming built with Electron, React, and TypeScript.</p>' +
                '<p>It features native desktop integration with system tray, comprehensive library browsing, advanced HTML5 audio player with bookmarks, and offline audiobook downloading capabilities.</p>' +
                '<p>The app supports Windows, macOS, and Linux with a compact UI optimized for desktop use and includes automatic updates, multi-language support, and secure authentication.</p>' +
                '<p>The project is open-source under MIT license and is not affiliated with Storytel. An active Storytel subscription is required to use the application.</p>',
            it: '<p>Storytel Player è un\'applicazione desktop non ufficiale open-source per lo streaming di audiolibri Storytel, sviluppata con Electron, React e TypeScript.</p>' +
                '<p>Offre integrazione nativa con il tray di sistema, esplorazione completa della libreria, player audio HTML5 avanzato con segnalibri e possibilità di scaricare audiolibri per l\'ascolto offline.</p>' +
                '<p>L\'app supporta Windows, macOS e Linux con un\'interfaccia compatta ottimizzata per desktop e include aggiornamenti automatici, supporto multilingua e autenticazione sicura.</p>' +
                '<p>Il progetto è open-source con licenza MIT e non è affiliato con Storytel. È richiesto un abbonamento attivo a Storytel per utilizzare l\'applicazione.</p>'
        }
    },
    {
        github_user: 'rewindtty',
        github_name: 'rewindtty',
        image: {cover: "/images/projects/cover/rewindtty.png", icon: "/images/projects/icon/rewindtty.png" },
        name: "RewindTTY",
        short_description: {
            en: "Terminal session recorder and replayer with JSON and ANSI escape sequences support",
            it: "Registratore e riproduttore di sessioni terminale con supporto per sequenze ANSI e output in JSON"
        },
        description: {
            en: '<p>RewindTTY is an advanced terminal session recorder and player written in C.</p>' +
                '<p>It captures input/output streams using PTYs and stores the session as structured JSON, including timestamp, command, output, and stderr.</p>' +
                '<p>It also supports ANSI escape sequences, making it suitable for TUI applications like Vim, htop, or ncurses-based tools.</p>' +
                '<p>The project is open-source and aims to offer a lightweight alternative to tools like asciinema with a focus on simplicity and integration potential.</p>',
            it: '<p>RewindTTY è un registratore e riproduttore avanzato di sessioni terminale scritto in C.</p>' +
                '<p>Cattura i flussi di input/output utilizzando PTY e salva la sessione in formato JSON strutturato, includendo timestamp, comando, output e stderr.</p>' +
                '<p>Supporta anche le sequenze ANSI, rendendolo perfetto per applicazioni TUI come Vim, htop o strumenti basati su ncurses.</p>' +
                '<p>Il progetto è open-source e mira a offrire un\'alternativa leggera a strumenti come asciinema, con un focus sulla semplicità e l’integrazione.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'gh-contributions-tetris-gif-maker',
        image: {cover: "/images/projects/cover/gh-contributions-tetris-gif-maker.gif"},
        name: "GitHub Contributions Tetris GIF Maker",
        short_description: {
            en: "A script to generate an animated Tetris-style GIF based on a GitHub user's contributions for a specific year",
            it: "Uno script per generare una GIF animata in stile Tetris basata sui contributi di un utente GitHub per un anno specifico"
        },
        description: {
            en: '<p>This script generates an animated Tetris-style GIF based on a GitHub user\'s contributions for a specific year.</p>' +
                '<p>It uses Python with libraries such as PIL and imageio to create the GIF.</p>' +
                '<p>You just need to provide the username and year to generate the GIF.</p>' +
                '<p>The script is open-source, and you can customize it according to your needs.</p>',
            it: '<p>Questo script genera una GIF animata in stile Tetris basata sui contributi di un utente GitHub per un anno specifico.</p>' +
                '<p>Utilizza Python con librerie come PIL e imageio per creare la GIF.</p>' +
                '<p>Basta fornire il nome utente e l\'anno per generare la GIF.</p>' +
                '<p>Lo script è open-source, e puoi personalizzarlo secondo le tue esigenze.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'fs-access-api-react-demo',
        name: "File System Access API Demo",
        short_description: {
            en: "File System Access API Demo in a React Application with Typescript",
            it: "Applicazione che illustra il funzionamento delle File System Access API con React e Typescript"
        },
        description: {
            en: '<p><strong>Demo features:</strong></p><ol class="list-inside list-decimal">' +
                '<li class="py-2">Open file from local file system</li>' +
                '<li class="py-2">Write the file to local file system</li>' +
                '<li class="py-2">Fallback for unsupported browsers</li>' +
                '</ul>',
            it: '<p><strong>Funzionalità nella demo:</strong></p><ol class="list-inside list-decimal">' +
                '<li class="py-2">Apertura di un file di testo da file system locale</li>' +
                '<li class="py-2">Scrittura di un file di testo da file system locale</li>' +
                '<li class="py-2">Fallback per i browsers non supportati.</li>' +
                '</ul>'
        }
    },
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
            en: '<p>In 2021 I developed a simple web app for decoding data from EU Green Pass QR Code.</p>' +
                '<p>I used Python with Flask and deployed my app using Heroku.</p>' +
                '<p>You just need to attach your certificate to immediately get a complete reading of the QR code.</p>' +
                '<p>Also in this case, no data will be stored and that if you want, since the code is open source, you can' +
                'create your instance without any worries.</p>',
            it: '<p>Nel 2021 ho sviluppato una semplice web app il cui scopo è quello di decodificare il QRCode del Green Pass europeo.</p>' +
                '<p>Ho utilizato Python con Flask e ho deployato l\'app con Heroku.</p>' +
                '<p>Basta allegare il proprio certificato e immediatamente avviene la lettura dei dati dal QR Code.</p>' +
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
            en: '<ol  class="list-inside list-decimal">' +
                '<li class="py-2"><strong>Easy Configuration</strong>: install plugin and setup in a few seconds.</li>' +
                '<li class="py-2"><strong>Increase security</strong>: increase the level of security in your blog / website by adding and additional authentication factor</li>' +
                '<li class="py-2"><strong>Speed</strong>: Forget additional apps, sms or captcha. Use Telegram for a very fast experience!</li>' +
                '<li class="py-2"><strong>Allow users to enable Two-factor authentication</strong>: every user directly from own profile may decide to require secure login.</li>' +
                '<li class="py-2"><strong>Send alert</strong>: set a Telegram Chat Id for an admin to receive  for receiving notifications every time users fail login.</li>' +
                '<li class="py-2"><strong>FAQ</strong>: read the FAQ inside plugin for create your Telegram Bot</li>' +
                '<li class="py-2"><strong>Languages</strong>: plugin is available in Italian, English and Spanish languages.</li>' +
                '</ol>',
            it: '<ol  class="list-inside list-decimal">' +
                '<li class="py-2"><strong>Facile Configurazione</strong>: installa il plugin e configuralo in pochi secondi.</li>' +
                '<li class="py-2"><strong>Rafforza la sicurezza</strong>: aumenta il livello di sicurezza nel tuo blog / sito web aggiungendo un fattore di autenticazione in più</li>' +
                '<li class="py-2"><strong>Velocità</strong>: Dimentica app addizionali, SMS o sistemi captcha. Usa Telegram per un’esperienza molto più veloce!</li>' +
                '<li class="py-2"><strong>Permetti agli utenti di abilitare l’autenticazione a due fattori</strong>: ogni utente direttamente dal proprio profilo potrà decidere di richiedere un’autenticazione sicura.</li>' +
                '<li class="py-2"><strong>Invio notifiche</strong>: imposta una Telegram Chat ID per un amministratore per riceve notifiche ogni volta che gli utenti falliscono il login.</li>' +
                '<li class="py-2"><strong>FAQ</strong> consulta le FAQ all’interno del plugin per creare il tuo Bot su Telegram</li>' +
                '<li class="py-2"><strong>Lingue</strong>: questo plugin è disponibile in Italiano, Inglese e Spagnolo</li>' +
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
                '<p>Every form submission from WPForms, Contact Form 7, Fast Secure Contact Form (FSCF) and Jetpack (more supported plugins coming: contact us for advices!) will be automatically synced with the selected eMailChef contact list.</p>' +
                '<p>It also supports customized fields you can use to segment your customers! E.g. if in a form you ask for customers type (reseller, hotels, etc.) you can easily create a newsletter just for them.</p>',
            it: '<p>Invia le tue campagne di email marketing attraverso la app di eMailChef.</p>' +
                '<p>Con eMailChef puoi scegliere tra più piani di abbonamento suddivisi per funzionalità e contatti e puoi anche decidere di sottoscrivere un piano personalizzato, costruito in base alle vostre esigenze.</p>' +
                '<p>Ogni invio di moduli da WPForms, Contact Form 7, Fast Secure Contact Form (FSCF) e Jetpack (altri plugin supportati sono in arrivo: contattateci per consigli!) sarà sincronizzato automaticamente con la lista eMailChef selezionata.</p>' +
                '<p>Supporta anche campi personalizzati che puoi utilizzare per segmentare i tuoi clienti! Ad esempio, se in un modulo chiedi il tipo di cliente (rivenditore, hotel, ecc.) puoi facilmente creare una newsletter solo per il tipo richiesto.</p>'
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
            en: '<p>When you own an e-commerce website, email marketing becomes one of the most powerful and effective tools to boost sales' +
                'and to earn your customers loyalty.</p>' +
                '<p>The eMailChef for WooCommerce plugin enables you to:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Transfer information about your customers and their orders</strong> to your eMailChef account</li>' +
                '<li class="py-2">You can <strong>create segmentations of customers</strong> according to their orders, abandoned carts, etc.</li>' +
                '<li class="py-2"><strong>Manage and sync newsletter subscriptions</strong> between WooCommerce and eMailChef</li>' +
                '<li class="py-2"><strong>Save money with automatic newsletters</strong> to keep your customers involved</li>' +
                '<li class="py-2">Create <strong>targeted marketing actions</strong> to save <strong>abandoned shopping carts</strong>, rewards for <strong>recurring orders</strong> and more follow up practices</li>' +
                '</ul>',
            it: '<p>Se possiedi un e-commerce, l’email marketing è uno degli strumenti più potenti ed efficaci per incrementare le vendite e fidelizzare i clienti.</p>' +
                '<p>Il plugin di eMailChef per WooCommerce ti consente di:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>trasferire le informazioni relative ai clienti e ai loro ordini</strong> nel tuo account eMailChef</li>' +
                '<li class="py-2"><strong>segmentare i clienti</strong> in base agli ordini, ai carrelli abbandonati, ecc.</li>' +
                '<li class="py-2"><strong>gestire e sincronizzare le iscrizioni alla newsletter</strong> da WooCommerce a eMailChef</li>' +
                '<li class="py-2"><strong>risparmiare soldi con le newsletter</strong> mantenendo i tuoi clienti coinvolti</li>' +
                '<li class="py-2"><strong>Creare automazioni</strong> per carrelli abbandonati, ricomponese, ordini ricorrenti e molto altro.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'turbosmtp-for-wordpress',
        image: {
            cover: "/images/projects/cover/turbosmtp-for-wordpress.jpg",
            icon: "/images/projects/icon/turbosmtp-for-wordpress.svg"
        },
        name: "turboSMTP for WordPress",
        short_description: {
            en: " turboSMTP’s official plugin for WordPress is a professional tool that delivers and tracks your transactional emails in real time. ",
            it: "Il plugin ufficiale di turboSMTP per WordPress è uno strumento professionale che ti permette di consegnare e tracciare in tempo reale tutte le email inviate dal tuo sito web. "
        },
        hide_stats: true,
        description: {
            en: '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Easy setup</strong>: our plugin is ready to be used! It doesn’t need advanced configuration. No special skills required: just fill in sender’s credentials and you’re done.</li>' +
                '<li class="py-2"><strong>Transactional emails</strong>: the turboSMTP plugin can be used to deliver all the outgoing emails of the website working on behalf of the wp_mail() function. In fact, once activated, it will be automatically set as default. You don’t have to set anything! This way you’ll be able to deliver the email confirmation of your subscription form, the system notification and so on…</li>' +
                '<li class="py-2"><strong>100% compatible</strong>: turboSMTP plugin will take charge of important emails such as your WordPress system emails, Woocommerce plugin and security alert ones.</li>' +
                '<li class="py-2"><strong>Reports</strong>: your statistics are always under control thanks to the real time reports about clicks, opens, bounces and much more...</li>' +
                '<li class="py-2"><strong>Test email</strong>: you can check the service status at anytime thanks to the test email feature</li>' +
                '<li class="py-2"><strong>Whitelisted servers</strong>: the delivery of your emails is always fast and successful.</li>' +
                '<li class="py-2"><strong>Languages</strong>: the plugin is available in english and italian languages. Soon available the french and spanish ones.</li>' +
                '</ul>',
            it: '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Setup semplice</strong>: il plugin è subito pronto ad essere usato! Non necessita configurazioni avanzate né particolari competenze tecniche: inserisci solo le tue credenziali e sarai pronto.</li>' +
                '<li class="py-2"><strong>Email transazionali</strong>: il plugin di turboSMTP può essere utilizzato per consegnare tutte le mail in uscita, lavorando al posto della funzione “wp_mail()”. Infatti, appena attivato, sarà impostato automaticamente di default. Il tutto senza intervenire manualmente nei settaggi. In questo modo sarai in grado di consegnare, ad esempio, le email di conferma iscrizione del tuo form, le notifiche di sistema e così via...</li>' +
                '<li class="py-2"><strong>Compatibile al 100%</strong>: il plugin turboSMTP avrà l’incarico di gestire le email del tuo sistema, notifiche del sistema Woocommerce e avvisi di sicurezza.</li>' +
                '<li class="py-2"><strong>Statistiche</strong>: Grazie ai report in tempo reale avrai sempre sotto controllo statistiche come click, aperture, bounce ecc.</li>' +
                '<li class="py-2"><strong>Invio di prova</strong>: potrai verificare lo stato di invio tutte le volte che vorrai grazie alla funzione “test”.</li>' +
                '<li class="py-2"><strong>Server autorizzati</strong>: la consegna delle email andrà sempre a buon fine in pochi attimi.</li>' +
                '<li class="py-2"><strong>Lingue</strong>: il plugin è attualmente disponibile in italiano e in inglese. Presto rilasceremo anche la versione in francese e in spagnolo.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'turbosmtp-email-validator-for-wordpress',
        image: {
            cover: "/images/projects/cover/turbosmtp-email-validator-for-wordpress.png",
            icon: "/images/projects/icon/turbosmtp-email-validator-for-wordpress.png"
        },
        name: "turboSMTP Email Validator for WordPress",
        short_description: {
            en: "Validates email addresses using the turboSMTP AP",
            it: "Valida gli indirizzi email utilizzando l’API di turboSMTP"
        },
        hide_stats: true,
        description: {
            en: '<p class="mb-2">Validates email addresses using the turboSMTP API in:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2">WooCommerce registration and checkout</li>' +
                '<li class="py-2">Contact Form 7</li>' +
                '<li class="py-2">WpForms</li>' +
                '<li class="py-2">WordPress comments and registration</li>' +
                '<li class="py-2">MC4WP</li>' +
                '<li class="py-2">Gravity Forms</li>' +
                '<li class="py-2">Elementor Forms</li>' +
                '</ul>' +
                '<p class="my-2">The turboSMTP Email Validator for WordPress plugin ensures that email addresses provided during user registration and checkout are valid. It uses the turboSMTP API to perform the validation, enhancing the quality of email addresses collected and reducing the number of invalid emails in your database.</p>',
            it: '<p class="mb-2">Valida gli indirizzi email utilizzando l’API di turboSMTP in:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2">Registrazione e checkout di WooCommerce</li>' +
                '<li class="py-2">Contact Form 7</li>' +
                '<li class="py-2">WpForms</li>' +
                '<li class="py-2">Commenti e registrazione di WordPress</li>' +
                '<li class="py-2">MC4WP</li>' +
                '<li class="py-2">Gravity Forms</li>' +
                '<li class="py-2">Elementor Forms</li>' +
                '</ul>' +
                '<p class="my-2">Il plugin turboSMTP Email Validator for WordPress garantisce che gli indirizzi email forniti durante la registrazione degli utenti e il checkout siano validi. Utilizza l’API di turboSMTP per eseguire la validazione, migliorando la qualità degli indirizzi email raccolti e riducendo il numero di email non valide nel tuo database.</p>'
        }
    }
];
