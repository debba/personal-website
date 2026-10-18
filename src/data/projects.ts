import {ProjectItem} from "../interfaces/data";

export const PROJECTS: ProjectItem[] = [
    {
        github_user: 'debba',
        github_name: 'gitdeck',
        emoji: '🧭',
        image: {cover: "/images/projects/cover/gitdeck.webp", icon: "/images/projects/icon/gitdeck.png"},
        name: "Gitdeck",
        short_description: {
            en: 'Repositories, issues, pull requests and CI from GitHub, GitLab and Forgejo in one dashboard.',
            it: 'Repository, issue, pull request e CI di GitHub, GitLab e Forgejo in un’unica dashboard.'
        },
        description: {
            en: '<p>Gitdeck brings your repositories and their activity into one local dashboard. Connect multiple accounts on GitHub, GitLab and Forgejo-compatible platforms, including Codeberg and self-hosted instances.</p>' +
                '<p>Review issues and pull requests across repositories, organise work on a kanban board and catch up with a daily digest. Alerts, health scores and security findings from Dependabot and code scanning help you see what needs attention.</p>' +
                '<p>Each repository has a dedicated view for CI workflows, releases, traffic, contributors and projects that depend on it, alongside mentions and trends in stars and forks.</p>' +
                '<p>Built with TypeScript, React and Vite, with a Node.js backend for OAuth, API requests and caching. A native app is also available for iPhone and iPad.</p>',
            it: '<p>Gitdeck riunisce i tuoi repository e le loro attività in una dashboard locale. Puoi collegare più account GitHub, GitLab e piattaforme compatibili con Forgejo, tra cui Codeberg e istanze self-hosted.</p>' +
                '<p>Gestisci issue e pull request di più repository, organizzi il lavoro su una bacheca kanban e ritrovi le novità in un riepilogo giornaliero. Avvisi, indicatori sullo stato dei progetti e segnalazioni di sicurezza da Dependabot e code scanning aiutano a capire cosa richiede attenzione.</p>' +
                '<p>Ogni repository ha una vista dedicata a workflow CI, release, traffico, collaboratori e progetti che lo usano come dipendenza, oltre a menzioni e andamento di stelle e fork.</p>' +
                '<p>È sviluppato con TypeScript, React e Vite, con un backend Node.js per OAuth, richieste API e cache. È disponibile anche un’app nativa per iPhone e iPad.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'melicum',
        emoji: '🔊',
        image: {cover: "/images/projects/cover/melicum.png", icon: "/images/projects/icon/melicum.png"},
        name: "Melicum",
        short_description: {
            en: 'Control HDMI and DisplayPort audio on macOS with your usual volume keys.',
            it: 'Regola l’audio HDMI e DisplayPort su macOS con i tasti volume di sempre.'
        },
        description: {
            en: '<p>Melicum lets you control the volume of HDMI and DisplayPort audio outputs on macOS, even when the device has no hardware volume control. It adjusts the audio level in software.</p>' +
                '<p>An optional component connects Melicum to the macOS volume slider and keyboard controls, keeping volume and mute settings in sync.</p>' +
                '<p>For more control over your sound, it includes equalizers with three levels of detail, a spectrum analyser, a per-app mixer, spatial audio, Audio Unit chains, AutoEQ import and settings presets.</p>' +
                '<p>Built with SwiftUI, Core Audio and a DSP engine in C. Audio is processed locally, without recording it or sending it over the network.</p>',
            it: '<p>Melicum permette di regolare il volume delle uscite audio HDMI e DisplayPort su macOS, anche quando il dispositivo non offre un controllo hardware. La regolazione avviene via software.</p>' +
                '<p>Un componente opzionale collega Melicum al cursore del volume di macOS e ai tasti della tastiera, mantenendo sincronizzati volume e disattivazione dell’audio.</p>' +
                '<p>Per intervenire sul suono, include equalizzatori con tre livelli di dettaglio, un analizzatore di spettro, un mixer per singola app, audio spaziale, catene di Audio Unit, importazione AutoEQ e preset delle impostazioni.</p>' +
                '<p>È sviluppato con SwiftUI, Core Audio e un motore DSP in C. L’audio viene elaborato in locale, senza registrarlo né inviarlo in rete.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'tuxcleaner',
        emoji: '🐧',
        image: {cover: "/images/projects/cover/tuxcleaner.png"},
        name: "TuxCleaner",
        short_description: {
            en: 'Free up disk space, uninstall apps and check your Linux system from the terminal.',
            it: 'Libera spazio, disinstalla app e controlla lo stato di Linux dal terminale.'
        },
        description: {
            en: '<p>TuxCleaner helps you reclaim disk space and check the state of your Linux system from the terminal. Written in Rust, it brings cleanup, application removal and disk analysis into a Ratatui interface.</p>' +
                '<p>It supports Arch Linux, Debian, Ubuntu, Fedora, RHEL and their derivatives, with package cleanup through pacman, apt and dnf. It can uninstall desktop apps, including Flatpaks, scan caches and clean up Docker resources while leaving volumes untouched.</p>' +
                '<p>It also finds old development files such as node_modules and target directories, checks package database integrity and displays CPU, memory, disk and system load information.</p>' +
                '<p>You can preview changes with a dry run before applying them. Operations are logged, JSON output is available for automation and updates are verified by checksum.</p>',
            it: '<p>TuxCleaner aiuta a recuperare spazio su disco e controllare lo stato di Linux dal terminale. Scritto in Rust, riunisce pulizia, disinstallazione delle app e analisi del disco in un’interfaccia Ratatui.</p>' +
                '<p>Supporta Arch Linux, Debian, Ubuntu, Fedora, RHEL e le loro derivate, con pulizia dei pacchetti tramite pacman, apt e dnf. Può disinstallare app desktop, comprese quelle Flatpak, analizzare le cache e ripulire le risorse Docker senza intervenire sui volumi.</p>' +
                '<p>Individua anche vecchi file di sviluppo, come le cartelle node_modules e target, verifica l’integrità del database dei pacchetti e mostra informazioni su CPU, memoria, disco e carico del sistema.</p>' +
                '<p>Puoi vedere in anteprima le modifiche con un dry run prima di applicarle. Le operazioni vengono registrate, l’output JSON permette di automatizzarle e gli aggiornamenti sono verificati tramite checksum.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'free-my-arch',
        emoji: '🧹',
        image: {cover: "/images/projects/cover/free-my-arch.gif", still: "/images/projects/cover/free-my-arch-still.png"},
        name: "free-my-arch",
        short_description: {
            en: 'A Claude Code skill that finds disk space to reclaim on Arch Linux and asks before cleaning.',
            it: 'Una skill per Claude Code che trova spazio da liberare su Arch Linux e chiede prima di pulire.'
        },
        description: {
            en: '<p>free-my-arch is a Claude Code skill for reclaiming disk space on Arch Linux. It scans package caches, AUR build leftovers, development caches, unused Docker files and large files in your home directory, then removes only what you approve.</p>' +
                '<p>The process has four steps: scan without making changes, report the space available to reclaim, ask for confirmation and clean up with a before-and-after report. Caches are approved by group; personal files are reviewed one at a time.</p>' +
                '<p>Configuration files, dotfiles, browser profiles and the pacman database are excluded. Docker volumes always require explicit confirmation, and sudo is used only for system cleanup groups you have approved.</p>',
            it: '<p>free-my-arch è una skill per Claude Code che aiuta a recuperare spazio su Arch Linux. Analizza cache dei pacchetti, residui delle build AUR, cache di sviluppo, file Docker inutilizzati e file grandi nella home, poi elimina solo ciò che approvi.</p>' +
                '<p>Il processo ha quattro passaggi: scansione senza modifiche, riepilogo dello spazio recuperabile, richiesta di conferma e pulizia con un confronto prima e dopo. Le cache si approvano per gruppo; i file personali si valutano uno alla volta.</p>' +
                '<p>Configurazioni, dotfile, profili dei browser e database di pacman sono esclusi dalla pulizia. I volumi Docker richiedono sempre una conferma esplicita e sudo viene usato solo per i gruppi di pulizia del sistema che hai approvato.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'storytel-player',
        emoji: '🎧',
        image: {cover: "/images/projects/cover/storytel-player.webp", icon: "/images/projects/icon/storytel-player.png"},
        name: "Storytel Player",
        short_description: {
            en: 'An unofficial Storytel desktop player for Windows, macOS and Linux, with offline listening.',
            it: 'Un player desktop non ufficiale per Storytel su Windows, macOS e Linux, anche per l’ascolto offline.'
        },
        description: {
            en: '<p>Storytel Player brings Storytel audiobooks to the desktop with an unofficial app for Windows, macOS and Linux. Browse your library, listen to books and download them for offline playback.</p>' +
                '<p>The player includes bookmarks, system tray integration, automatic updates and a multilingual interface designed for desktop use.</p>' +
                '<p>Built with Electron, React and TypeScript, it is open source under the MIT licence. The project is not affiliated with Storytel, and an active Storytel subscription is required.</p>',
            it: '<p>Storytel Player porta gli audiolibri di Storytel sul desktop con un’app non ufficiale per Windows, macOS e Linux. Puoi esplorare la libreria, ascoltare i libri e scaricarli per la riproduzione offline.</p>' +
                '<p>Il player include segnalibri, integrazione con l’area di notifica, aggiornamenti automatici e un’interfaccia multilingua pensata per l’uso su desktop.</p>' +
                '<p>È sviluppato con Electron, React e TypeScript ed è open source con licenza MIT. Il progetto non è affiliato a Storytel e richiede un abbonamento Storytel attivo.</p>'
        }
    },
    {
        github_user: 'rewindtty',
        github_name: 'rewindtty',
        emoji: '⏪',
        image: {cover: "/images/projects/cover/rewindtty.png", icon: "/images/projects/icon/rewindtty.png" },
        name: "RewindTTY",
        short_description: {
            en: 'Record and replay terminal sessions, with JSON output and support for ANSI escape sequences.',
            it: 'Registra e riproduci sessioni del terminale, con output JSON e supporto alle sequenze ANSI.'
        },
        description: {
            en: '<p>RewindTTY records terminal sessions and lets you replay them later. Written in C, it captures input and output through pseudo-terminals (PTYs).</p>' +
                '<p>Sessions are saved as structured JSON with timestamps, commands, output and stderr, making the data available for other tools and workflows.</p>' +
                '<p>Support for ANSI escape sequences allows it to capture terminal interfaces such as Vim, htop and ncurses applications. The project explores a lightweight alternative to tools such as asciinema, with a focus on simplicity and integration.</p>',
            it: '<p>RewindTTY registra le sessioni del terminale e permette di riprodurle in seguito. È scritto in C e cattura input e output attraverso pseudo-terminali (PTY).</p>' +
                '<p>Le sessioni vengono salvate in JSON strutturato, con timestamp, comandi, output e stderr: dati che possono essere usati anche da altri strumenti.</p>' +
                '<p>Il supporto alle sequenze ANSI permette di catturare interfacce da terminale come Vim, htop e applicazioni ncurses. Il progetto esplora un’alternativa leggera a strumenti come asciinema, con attenzione alla semplicità e all’integrazione.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'gh-contributions-tetris-gif-maker',
        emoji: '🧱',
        image: {cover: "/images/projects/cover/gh-contributions-tetris-gif-maker.gif", still: "/images/projects/cover/gh-contributions-tetris-gif-maker-still.png"},
        name: "GitHub Contributions Tetris GIF Maker",
        short_description: {
            en: 'Turn a year of GitHub contributions into a Tetris-style animated GIF.',
            it: 'Trasforma un anno di contributi GitHub in una GIF animata in stile Tetris.'
        },
        description: {
            en: '<p>A Python script that turns a GitHub contribution graph into a Tetris-style animated GIF. Provide a username and a year to generate the animation.</p>' +
                '<p>It uses PIL and imageio to create the GIF. The code is open source, so you can adapt the script and customise the result.</p>',
            it: '<p>Uno script Python che trasforma il grafico dei contributi GitHub in una GIF animata in stile Tetris. Basta indicare il nome utente e l’anno per generare l’animazione.</p>' +
                '<p>Usa PIL e imageio per creare la GIF. Il codice è open source, quindi puoi adattare lo script e personalizzare il risultato.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'fs-access-api-react-demo',
        emoji: '📂',
        name: "File System Access API Demo",
        short_description: {
            en: 'A React and TypeScript demo for opening and saving local files with the File System Access API.',
            it: 'Una demo React e TypeScript per aprire e salvare file locali con la File System Access API.'
        },
        description: {
            en: '<p>A React and TypeScript demo showing how to use the File System Access API to work with local text files from a web application.</p>' +
                '<ol class="list-inside list-decimal">' +
                '<li class="py-2">Open a text file from the local file system.</li>' +
                '<li class="py-2">Write a text file to the local file system.</li>' +
                '<li class="py-2">Use a fallback in browsers that do not support the API.</li>' +
                '</ol>',
            it: '<p>Una demo in React e TypeScript che mostra come usare la File System Access API per lavorare su file di testo locali da un’applicazione web.</p>' +
                '<ol class="list-inside list-decimal">' +
                '<li class="py-2">Aprire un file di testo dal file system locale.</li>' +
                '<li class="py-2">Scrivere un file di testo nel file system locale.</li>' +
                '<li class="py-2">Usare una soluzione alternativa nei browser che non supportano l’API.</li>' +
                '</ol>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'greenpass-covid19-qrcode-decoder',
        emoji: '✅',
        image: {cover: "/images/projects/cover/greenpass-covid19-qrcode-decoder.png"},
        name: "GreenPass Covid-19 QR Code Decoder",
        short_description: {
            en: 'A web app built in 2021 to read the data in EU COVID-19 certificate QR codes.',
            it: 'Una web app sviluppata nel 2021 per leggere i dati nel QR code del Green Pass europeo.'
        },
        description: {
            en: '<p>I built this web app in 2021 to read the data encoded in EU COVID-19 certificate QR codes. It was developed with Python and Flask and deployed on Heroku.</p>' +
                '<p>The app reads a certificate uploaded by the user and displays the data contained in its QR code without storing the submitted data. The code is open source and can be used to run your own instance.</p>',
            it: '<p>Ho sviluppato questa web app nel 2021 per leggere i dati contenuti nel QR code del Green Pass europeo. È realizzata con Python e Flask e all’epoca è stata pubblicata su Heroku.</p>' +
                '<p>L’app legge un certificato caricato dall’utente e mostra i dati del QR code senza salvare i dati inviati. Il codice è open source e permette di creare una propria istanza.</p>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'authpress',
        emoji: '🔐',
        image: {
            cover: "/images/projects/cover/authpress.png",
            icon: "/images/projects/icon/authpress.png"
        },
        name: "AuthPress",
        short_description: {
            en: 'Add two-factor authentication to WordPress using Telegram.',
            it: 'Aggiungi l’autenticazione a due fattori a WordPress tramite Telegram.'
        },
        description: {
            en: '<p>AuthPress adds two-factor authentication to WordPress using Telegram. Users can enable it from their profile to add a second check when signing in.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Telegram setup:</strong> the plugin FAQ explains how to create and connect a bot.</li>' +
                '<li class="py-2"><strong>User settings:</strong> each user manages two-factor authentication from their own profile.</li>' +
                '<li class="py-2"><strong>Login alerts:</strong> administrators can receive Telegram notifications about failed login attempts.</li>' +
                '<li class="py-2"><strong>Languages:</strong> available in Italian, English and Spanish.</li>' +
                '</ul>',
            it: '<p>AuthPress aggiunge l’autenticazione a due fattori a WordPress tramite Telegram. Ogni utente può attivarla dal proprio profilo per aggiungere un secondo controllo all’accesso.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Configurazione di Telegram:</strong> le FAQ del plugin spiegano come creare e collegare un bot.</li>' +
                '<li class="py-2"><strong>Impostazioni personali:</strong> ogni utente gestisce l’autenticazione a due fattori dal proprio profilo.</li>' +
                '<li class="py-2"><strong>Avvisi di accesso:</strong> gli amministratori possono ricevere notifiche Telegram sui tentativi di accesso non riusciti.</li>' +
                '<li class="py-2"><strong>Lingue:</strong> disponibile in italiano, inglese e spagnolo.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'less2scss',
        emoji: '🎨',
        name: "Less2scss",
        short_description: {
            en: 'Convert LESS files to SCSS while preserving the directory structure.',
            it: 'Converti file LESS in SCSS mantenendo la struttura delle cartelle.'
        },
        description: {
            en: '<p>An npm package for converting LESS files to SCSS. Give it a directory and it scans the LESS files inside it, including subdirectories.</p>' +
                '<p>Generated SCSS files can be saved alongside the originals or in a separate destination, preserving the source directory structure.</p>',
            it: '<p>Un pacchetto npm per convertire file LESS in SCSS. Indicando una cartella, analizza i file LESS al suo interno, comprese le sottocartelle.</p>' +
                '<p>I file SCSS generati possono essere salvati accanto agli originali oppure in una destinazione separata, mantenendo la struttura delle cartelle di partenza.</p>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'emailchef-for-wordpress',
        emoji: '✉️',
        image: {
            cover: "/images/projects/cover/emailchef-for-wordpress.png",
            icon: "/images/projects/icon/emailchef-for-wordpress.png"
        },
        name: "eMailChef for WordPress",
        short_description: {
            en: 'Connect WordPress forms to eMailChef and sync contacts for your email campaigns.',
            it: 'Collega i moduli WordPress a eMailChef e sincronizza i contatti per le tue campagne email.'
        },
        hide_stats: true,
        description: {
            en: '<p>eMailChef for WordPress connects your website forms to an eMailChef contact list. Form submissions are synced automatically, so you can use the collected contacts in your email campaigns.</p>' +
                '<p>The plugin supports WPForms, Contact Form 7, Fast Secure Contact Form and Jetpack. Custom fields let you organise contacts into segments, for example by customer type or business sector.</p>' +
                '<p>You create and send campaigns from eMailChef, using the contact data collected on your website.</p>',
            it: '<p>eMailChef for WordPress collega i moduli del tuo sito a una lista contatti di eMailChef. Gli invii vengono sincronizzati automaticamente, così puoi usare i contatti raccolti nelle tue campagne email.</p>' +
                '<p>Il plugin supporta WPForms, Contact Form 7, Fast Secure Contact Form e Jetpack. I campi personalizzati permettono di organizzare i contatti in segmenti, per esempio per tipo di cliente o settore di attività.</p>' +
                '<p>Crei e invii le campagne da eMailChef, usando i dati raccolti sul tuo sito.</p>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'github-tray-gnome-extension',
        emoji: '🔔',
        image: {
            cover: "/images/projects/cover/github-tray-gnome-extension.webp"
        },
        name: "GitHub Tray GNOME Extension",
        short_description: {
            en: 'Keep track of GitHub repository activity from the GNOME desktop panel.',
            it: 'Segui le attività dei repository GitHub dal pannello del desktop GNOME.'
        },
        description: {
            en: '<p>A GNOME Shell extension that puts GitHub repository activity in your desktop’s top panel, so you can check it without opening a browser.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1">Notifications for new stars, issues and forks.</li>' +
                '<li class="py-1">Repository details, including stars, forks, issues, language and last update.</li>' +
                '<li class="py-1">Links to open repositories on GitHub or locally in your editor.</li>' +
                '<li class="py-1">Sortable lists with an automatic refresh every five minutes.</li>' +
                '</ul>',
            it: '<p>Un’estensione GNOME Shell che porta le attività dei repository GitHub nel pannello superiore del desktop, per consultarle senza aprire il browser.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1">Notifiche per nuove stelle, issue e fork.</li>' +
                '<li class="py-1">Dettagli dei repository: stelle, fork, issue, linguaggio e ultimo aggiornamento.</li>' +
                '<li class="py-1">Link per aprire i repository su GitHub o in locale nel tuo editor.</li>' +
                '<li class="py-1">Liste ordinabili con aggiornamento automatico ogni cinque minuti.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'emailchef-for-woocommerce',
        emoji: '🛒',
        image: {
            cover: "/images/projects/cover/emailchef-for-woocommerce.png",
            icon: "/images/projects/icon/emailchef-for-woocommerce.png"
        },
        name: "eMailChef for WooCommerce",
        short_description: {
            en: 'Sync WooCommerce customers and orders with eMailChef to create targeted email campaigns.',
            it: 'Sincronizza clienti e ordini WooCommerce con eMailChef per creare campagne email mirate.'
        },
        hide_stats: true,
        description: {
            en: '<p>eMailChef for WooCommerce connects your online store to eMailChef, making customer and order data available for email campaigns and automations.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Customer and order data:</strong> transfer information from WooCommerce to your eMailChef account.</li>' +
                '<li class="py-2"><strong>Segmentation:</strong> group customers by orders, abandoned carts and other store data.</li>' +
                '<li class="py-2"><strong>Subscriptions:</strong> manage and sync newsletter signups between the two platforms.</li>' +
                '<li class="py-2"><strong>Automations:</strong> set up abandoned cart reminders, recurring order campaigns and follow-up emails.</li>' +
                '</ul>',
            it: '<p>eMailChef for WooCommerce collega il tuo negozio online a eMailChef, rendendo disponibili i dati di clienti e ordini per campagne email e automazioni.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Dati di clienti e ordini:</strong> trasferisci le informazioni da WooCommerce al tuo account eMailChef.</li>' +
                '<li class="py-2"><strong>Segmentazione:</strong> raggruppi i clienti in base a ordini, carrelli abbandonati e altri dati del negozio.</li>' +
                '<li class="py-2"><strong>Iscrizioni:</strong> gestisci e sincronizzi le iscrizioni alla newsletter tra le due piattaforme.</li>' +
                '<li class="py-2"><strong>Automazioni:</strong> imposti promemoria per i carrelli abbandonati, campagne per ordini ricorrenti ed email di follow-up.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'turbosmtp-for-wordpress',
        emoji: '🚀',
        image: {
            cover: "/images/projects/cover/turbosmtp-for-wordpress.jpg",
            icon: "/images/projects/icon/turbosmtp-for-wordpress.svg"
        },
        name: "turboSMTP for WordPress",
        short_description: {
            en: 'Send WordPress emails through turboSMTP and track delivery, opens and clicks.',
            it: 'Invia le email di WordPress con turboSMTP e monitora consegne, aperture e clic.'
        },
        hide_stats: true,
        description: {
            en: '<p>The official turboSMTP plugin for WordPress sends your website’s outgoing emails through turboSMTP. Once configured, it handles messages sent with wp_mail(), including registration confirmations, system notifications and WooCommerce emails.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Setup:</strong> enter your sender credentials to connect the service.</li>' +
                '<li class="py-2"><strong>Transactional emails:</strong> use turboSMTP for messages sent by WordPress and plugins that rely on wp_mail().</li>' +
                '<li class="py-2"><strong>Reports:</strong> monitor delivery, opens, clicks and bounces in real time.</li>' +
                '<li class="py-2"><strong>Test email:</strong> check your configuration by sending a test message.</li>' +
                '<li class="py-2"><strong>Languages:</strong> available in English and Italian.</li>' +
                '</ul>',
            it: '<p>Il plugin ufficiale di turboSMTP per WordPress invia le email del tuo sito tramite turboSMTP. Una volta configurato, gestisce i messaggi inviati con wp_mail(), comprese conferme di registrazione, notifiche di sistema ed email di WooCommerce.</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2"><strong>Configurazione:</strong> inserisci le credenziali del mittente per collegare il servizio.</li>' +
                '<li class="py-2"><strong>Email transazionali:</strong> usi turboSMTP per i messaggi di WordPress e dei plugin che si appoggiano a wp_mail().</li>' +
                '<li class="py-2"><strong>Statistiche:</strong> monitori consegne, aperture, clic e messaggi respinti in tempo reale.</li>' +
                '<li class="py-2"><strong>Email di prova:</strong> verifichi la configurazione inviando un messaggio di test.</li>' +
                '<li class="py-2"><strong>Lingue:</strong> disponibile in italiano e inglese.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'TabularisDB',
        github_name: 'tabularis',
        emoji: '🗄️',
        image: {
          cover: "/images/projects/cover/tabularis.png",
          icon: "/images/projects/icon/tabularis.png"
        },
        name: "Tabularis",
        short_description: {
            en: 'Explore databases, write SQL and build queries visually in a lightweight desktop app.',
            it: 'Esplora database, scrivi SQL e costruisci query visuali in un’app desktop leggera.'
        },
        description: {
            en: '<p>Tabularis is a lightweight desktop app for working with databases. It brings connections, SQL editing and visual query building into one interface, built with Tauri and React.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1"><strong>Databases:</strong> support for MySQL and MariaDB, with PostgreSQL and SQLite support in development.</li>' +
                '<li class="py-1"><strong>SQL editor:</strong> write queries in Monaco, with syntax highlighting and multiple tabs.</li>' +
                '<li class="py-1"><strong>Visual queries:</strong> build queries with drag and drop and generate the corresponding SQL.</li>' +
                '<li class="py-1"><strong>Optional AI:</strong> turn natural-language requests into SQL with OpenAI, Anthropic or Ollama.</li>' +
                '<li class="py-1"><strong>Connections:</strong> store connection profiles securely and connect through SSH tunnels.</li>' +
                '</ul>',
            it: '<p>Tabularis è un’app desktop leggera per lavorare con i database. Riunisce connessioni, scrittura SQL e costruzione visuale delle query in un’unica interfaccia, sviluppata con Tauri e React.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1"><strong>Database:</strong> supporto a MySQL e MariaDB, con PostgreSQL e SQLite in sviluppo.</li>' +
                '<li class="py-1"><strong>Editor SQL:</strong> scrivi query con Monaco, evidenziazione della sintassi e più schede aperte.</li>' +
                '<li class="py-1"><strong>Query visuali:</strong> costruisci query con il drag and drop e generi il relativo SQL.</li>' +
                '<li class="py-1"><strong>AI opzionale:</strong> trasformi richieste in linguaggio naturale in SQL con OpenAI, Anthropic o Ollama.</li>' +
                '<li class="py-1"><strong>Connessioni:</strong> salvi i profili in modo sicuro e ti colleghi tramite tunnel SSH.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'dueclic',
        github_name: 'turbosmtp-email-validator-for-wordpress',
        emoji: '📮',
        image: {
            cover: "/images/projects/cover/turbosmtp-email-validator-for-wordpress.png",
            icon: "/images/projects/icon/turbosmtp-email-validator-for-wordpress.png"
        },
        name: "turboSMTP Email Validator for WordPress",
        short_description: {
            en: 'Check email addresses in WordPress forms and WooCommerce checkout with the turboSMTP API.',
            it: 'Verifica gli indirizzi email nei moduli WordPress e nel checkout WooCommerce con l’API turboSMTP.'
        },
        hide_stats: true,
        description: {
            en: '<p>turboSMTP Email Validator checks email addresses through the turboSMTP API when users fill in forms on your WordPress website. It helps reduce invalid addresses in your contact database.</p>' +
                '<p>Supported forms and integrations include:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2">WooCommerce registration and checkout.</li>' +
                '<li class="py-2">WordPress registration and comments.</li>' +
                '<li class="py-2">Contact Form 7 and WPForms.</li>' +
                '<li class="py-2">MC4WP and Gravity Forms.</li>' +
                '<li class="py-2">Elementor Forms.</li>' +
                '</ul>',
            it: '<p>turboSMTP Email Validator verifica gli indirizzi email tramite l’API di turboSMTP quando gli utenti compilano i moduli del tuo sito WordPress. Aiuta a ridurre gli indirizzi non validi nel database dei contatti.</p>' +
                '<p>I moduli e le integrazioni supportati includono:</p>' +
                '<ul class="list-inside list-disc">' +
                '<li class="py-2">Registrazione e checkout di WooCommerce.</li>' +
                '<li class="py-2">Registrazione e commenti di WordPress.</li>' +
                '<li class="py-2">Contact Form 7 e WPForms.</li>' +
                '<li class="py-2">MC4WP e Gravity Forms.</li>' +
                '<li class="py-2">Elementor Forms.</li>' +
                '</ul>'
        }
    },
    {
        github_user: 'debba',
        github_name: 'zed-freemarker',
        emoji: '🧩',
        name: "Zed FreeMarker",
        short_description: {
            en: 'Syntax highlighting and editing support for Apache FreeMarker templates in Zed.',
            it: 'Evidenziazione della sintassi e supporto alla scrittura dei template Apache FreeMarker in Zed.'
        },
        description: {
            en: '<p>A Zed extension for editing Apache FreeMarker Template Language (FTL) files, with syntax highlighting powered by tree-sitter.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1">Highlighting for FTL directives and expressions.</li>' +
                '<li class="py-1">Support for angle-bracket and square-bracket comment styles.</li>' +
                '<li class="py-1">Bracket matching and automatic closing.</li>' +
                '<li class="py-1">HTML syntax highlighting within templates.</li>' +
                '<li class="py-1">Support for conditionals, loops, macros and variable assignment.</li>' +
                '</ul>',
            it: '<p>Un’estensione per Zed dedicata ai file Apache FreeMarker Template Language (FTL), con evidenziazione della sintassi basata su tree-sitter.</p>' +
                '<ul class="list-outside hover:list-inside list-disc">' +
                '<li class="py-1">Evidenziazione di direttive ed espressioni FTL.</li>' +
                '<li class="py-1">Supporto ai commenti con parentesi angolari e quadre.</li>' +
                '<li class="py-1">Corrispondenza delle parentesi e chiusura automatica.</li>' +
                '<li class="py-1">Evidenziazione della sintassi HTML nei template.</li>' +
                '<li class="py-1">Supporto a condizioni, cicli, macro e assegnazione di variabili.</li>' +
                '</ul>'
        }
    }
];

// Projects shown as tiles on the home page, in order.
export const HOME_PROJECTS = [
    'tabularis',
    'gitdeck',
    'melicum',
    'tuxcleaner',
    'free-my-arch',
    'storytel-player',
    'rewindtty',
];

// Projects in the home dock tile, in order. Each needs an icon.
export const DOCK_PROJECTS = [
    'tabularis',
    'gitdeck',
    'melicum',
    'storytel-player',
    'turbosmtp-for-wordpress',
    'emailchef-for-wordpress',
];
