import type {ProjectDetails, ProjectMedia} from '../interfaces/data';

const text = (it: string, en: string) => ({it, en});
const image = (slug: string, file: string, it: string, en: string): ProjectMedia => ({
    kind: 'image', src: `/media/projects/${slug}/${file}`, caption: text(it, en),
});
const video = (slug: string, file: string, poster: string, it: string, en: string): ProjectMedia => ({
    kind: 'video', src: `/media/projects/${slug}/${file}`, poster, caption: text(it, en),
});

// Curated from the projects' public READMEs and documentation. Media provenance
// is recorded in public/media/projects/SOURCES.md; no generated product screenshots.
export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
    tabularis: {
        website: 'https://tabularis.dev',
        platform: text('Windows, macOS e Linux', 'Windows, macOS and Linux'),
        technologies: ['Tauri', 'Rust', 'React', 'TypeScript', 'Monaco'],
        useCase: text('Per chi lavora ogni giorno con database diversi e vuole riunire interrogazioni, analisi e gestione dei dati in un’unica applicazione.', 'For people who work with different databases every day and want queries, analysis and data management in one application.'),
        features: {
            it: ['Collega MySQL/MariaDB, PostgreSQL e SQLite, oppure aggiungi altri database attraverso i driver installabili.', 'Scrivi SQL in più schede, esplora tabelle e relazioni e costruisci query visuali con join e filtri.', 'Combina SQL, note e grafici nei notebook; esporta i risultati in CSV, JSON o HTML.', 'Analizza i piani di esecuzione con Visual EXPLAIN e modifica i dati direttamente nella griglia.', 'Usa tunnel SSH e il portachiavi di sistema per le connessioni; l’assistenza AI e il server MCP sono opzionali.'],
            en: ['Connect to MySQL/MariaDB, PostgreSQL and SQLite, or add other databases through installable drivers.', 'Write SQL in multiple tabs, explore tables and relationships, and build visual queries with joins and filters.', 'Combine SQL, notes and charts in notebooks; export results as CSV, JSON or HTML.', 'Inspect execution plans with Visual EXPLAIN and edit data directly in the grid.', 'Use SSH tunnels and the system keychain for connections; AI assistance and the MCP server are optional.'],
        },
        media: [
            video('tabularis', 'overview.mp4', '/media/projects/tabularis/overview.jpg', 'Video overview senza audio: un tour dello spazio di lavoro di Tabularis.', 'Silent overview video: a tour of the Tabularis workspace.'),
            image('tabularis', 'overview.png', 'Editor SQL, connessioni e griglia dei risultati nello stesso spazio di lavoro.', 'SQL editor, connections and result grid in the same workspace.'),
            image('tabularis', 'tabularis-visual-query-builder.png', 'Costruzione visuale di una query con tabelle, relazioni e SQL generato.', 'Visual query building with tables, relationships and generated SQL.'),
            image('tabularis', 'tabularis-notebook-sql-cell-pie-chart-data-grid.png', 'Un notebook che affianca query SQL, risultati e grafici.', 'A notebook combining SQL queries, results and charts.'),
            image('tabularis', 'tabularis-visual-explain-graph-view-execution-plan.png', 'Il piano di esecuzione di una query rappresentato come grafo navigabile.', 'A query execution plan displayed as a navigable graph.'),
        ],
    },
    gitdeck: {
        website: 'https://gitdeck.dev',
        platform: text('Applicazione web locale', 'Local web application'),
        technologies: ['TypeScript', 'React', 'Vite', 'Node.js', 'REST / GraphQL'],
        useCase: text('Per chi mantiene più repository o account e vuole capire dove intervenire senza passare continuamente da una piattaforma all’altra.', 'For maintainers managing multiple repositories or accounts who want to see what needs attention without constantly switching platforms.'),
        features: {
            it: ['Collega più account GitHub, GitLab e Forgejo, inclusi Codeberg e istanze autogestite.', 'Filtra issue e pull request tra repository diversi e organizza il lavoro in una board kanban.', 'Consulta workflow CI, release, contributori, traffico e segnalazioni di sicurezza in viste dedicate.', 'Ritrova le novità nel riepilogo giornaliero ed esportalo in Markdown; il testo generato dall’AI è opzionale.'],
            en: ['Connect multiple GitHub, GitLab and Forgejo accounts, including Codeberg and self-hosted instances.', 'Filter issues and pull requests across repositories and organise work on a kanban board.', 'Explore CI workflows, releases, contributors, traffic and security alerts in dedicated views.', 'Catch up with a daily digest and export it as Markdown; AI-generated narratives are optional.'],
        },
        media: [video('gitdeck', 'demo.mp4', '/images/projects/cover/gitdeck.webp', 'Tour senza audio della dashboard: navigazione tra repository e viste delle attività Git.', 'Silent dashboard tour showing repository navigation and Git activity views.')],
    },
    melicum: {
        website: 'https://melicum.app',
        platform: text('macOS 14.2 o successivo', 'macOS 14.2 or later'),
        technologies: ['SwiftUI', 'Core Audio', 'Swift', 'C / DSP'],
        useCase: text('Per usare monitor HDMI o DisplayPort come uscita audio, regolare il volume dalla tastiera e personalizzare il suono delle applicazioni.', 'For using HDMI or DisplayPort monitors as audio outputs, controlling volume from the keyboard and adjusting the sound of individual applications.'),
        features: {
            it: ['Controlla volume, mute e bilanciamento anche quando l’uscita digitale non offre una regolazione hardware.', 'Regola separatamente le applicazioni con il mixer e salva configurazioni richiamabili per uscita o app.', 'Scegli tra equalizzatore base, avanzato ed esperto; aggiungi effetti Audio Unit e importa preset AutoEQ locali.', 'Lavora con audio mono o stereo PCM elaborato localmente; il componente per i tasti volume di macOS è opzionale.'],
            en: ['Control volume, mute and balance even when the digital output has no hardware volume control.', 'Adjust applications independently with the mixer and save settings recalled by output or app.', 'Choose basic, advanced or expert EQ, add Audio Unit effects and import local AutoEQ presets.', 'Process mono or stereo PCM audio locally; the component for native macOS volume keys is optional.'],
        },
        media: [
            image('melicum', 'main-window.png', 'Pannello principale: uscita audio, volume, spettro ed equalizzatore.', 'Main panel with audio output, volume, spectrum and equalizer.'),
            image('melicum', 'app-mixer.png', 'Mixer con volume e mute indipendenti per ogni applicazione.', 'Mixer with independent volume and mute for each application.'),
            image('melicum', 'spatial-audio.png', 'Controlli per riverbero, ambiente e ampiezza stereo.', 'Controls for reverb, room settings and stereo width.'),
            image('melicum', 'audio-units.png', 'Gestione della catena di effetti Audio Unit.', 'Managing the Audio Unit effects chain.'),
            image('melicum', 'presets.png', 'Preset, lingua dell’interfaccia e preferenze dell’applicazione.', 'Presets, interface language and application preferences.'),
        ],
    },
    tuxcleaner: {
        website: 'https://github.com/debba/tuxcleaner#readme',
        websiteKind: 'documentation',
        platform: text('Linux: Arch, Debian/Ubuntu, Fedora/RHEL', 'Linux: Arch, Debian/Ubuntu, Fedora/RHEL'),
        technologies: ['Rust', 'Ratatui', 'pacman / APT / DNF'],
        useCase: text('Per individuare cosa occupa spazio su Linux e passare dall’analisi alla pulizia con selezione e conferma delle operazioni.', 'For finding what takes up space on Linux and moving from analysis to cleanup with explicit selection and confirmation.'),
        features: {
            it: ['Esplora il disco, individua file grandi e vecchi artefatti di sviluppo come node_modules e target.', 'Gestisci cache, pacchetti e applicazioni desktop, con integrazioni per i package manager supportati e Flatpak.', 'Controlla CPU, memoria, integrità del database dei pacchetti e cronologia delle operazioni.', 'Visualizza le modifiche con il dry run; il progetto è ancora in fase MVP. La demo usa dati fittizi e non rimuove file reali.'],
            en: ['Explore disk usage and find large files and old development artifacts such as node_modules and target.', 'Manage caches, packages and desktop applications through supported package managers and Flatpak.', 'Check CPU, memory, package database integrity and operation history.', 'Preview changes with dry run; the project is still an MVP. The demo uses fictional data and removes no real files.'],
        },
        media: [
            image('tuxcleaner', 'tuxcleaner-menu.png', 'Menu interattivo del terminale con gli strumenti di manutenzione.', 'Interactive terminal menu with maintenance tools.'),
            video('tuxcleaner', 'demo.mp4', '/media/projects/tuxcleaner/tuxcleaner-menu.png', 'Tour senza audio con dati fittizi: menu, analisi del disco e operazioni mostrate in modalità dry run.', 'Silent tour with fictional data showing the menu, disk analysis and operations in dry-run mode.'),
        ],
    },
    'free-my-arch': {
        website: 'https://github.com/debba/free-my-arch#readme',
        websiteKind: 'documentation',
        platform: text('Arch Linux con Claude Code', 'Arch Linux with Claude Code'),
        technologies: ['Claude Code', 'Bash', 'pacman', 'Docker'],
        useCase: text('Per fare una pulizia ragionata della propria macchina Arch partendo da un inventario dello spazio recuperabile.', 'For planning cleanup on an Arch machine, starting with an inventory of reclaimable disk space.'),
        features: {
            it: ['Analizza cache dei pacchetti, residui AUR, cartelle di sviluppo e file particolarmente grandi.', 'Presenta lo spazio recuperabile e chiede quali categorie o file vuoi rimuovere.', 'Confronta lo spazio prima e dopo la pulizia, mantenendo configurazioni e profili fuori dalle operazioni ordinarie.'],
            en: ['Inspect package caches, AUR leftovers, development directories and unusually large files.', 'Review reclaimable space and choose which categories or files to remove.', 'Compare space before and after cleanup, keeping configuration and profiles outside routine operations.'],
        },
        media: [video('free-my-arch', 'demo.mp4', '/images/projects/cover/free-my-arch-still.png', 'Demo senza audio del flusso in Claude Code: analisi, riepilogo e scelta delle operazioni di pulizia.', 'Silent Claude Code workflow demo showing analysis, a summary and selection of cleanup operations.')],
    },
    'storytel-player': {
        website: 'https://debba.github.io/storytel-player/',
        platform: text('Windows, macOS e Linux', 'Windows, macOS and Linux'),
        technologies: ['Electron', 'React', 'TypeScript', 'Fastify'],
        useCase: text('Per ascoltare la propria libreria Storytel dal computer, anche offline, con un’interfaccia pensata per il desktop. Richiede un abbonamento Storytel attivo.', 'For listening to your Storytel library on a computer, including offline, through a desktop interface. An active Storytel subscription is required.'),
        features: {
            it: ['Sfoglia la libreria con copertine, stato di lettura e avanzamento degli audiolibri.', 'Naviga tra capitoli e segnalibri, regola la velocità e imposta un timer di spegnimento.', 'Scarica gli audiolibri per l’ascolto offline e riprendi la riproduzione dal punto precedente.', 'Usa l’area di notifica e gli aggiornamenti automatici. È un progetto indipendente, non affiliato a Storytel.'],
            en: ['Browse your library with cover art, reading status and audiobook progress.', 'Navigate chapters and bookmarks, adjust playback speed and set a sleep timer.', 'Download audiobooks for offline listening and resume from your previous position.', 'Use system tray integration and automatic updates. This is an independent project, not affiliated with Storytel.'],
        },
        media: [
            image('storytel-player', 'screenshot-1.png', 'Libreria con copertine, filtri per avanzamento e controlli di riproduzione.', 'Library with cover art, progress filters and playback controls.'),
            image('storytel-player', 'screenshot-2.png', 'Ricerca nel catalogo con filtri per lingua e durata e dettagli del libro.', 'Catalogue search with language and duration filters and book details.'),
            image('storytel-player', 'screenshot-3.png', 'Scheda dell’audiolibro con autore, narratore, durata e pulsante di ascolto.', 'Audiobook details with author, narrator, duration and play button.'),
        ],
    },
    rewindtty: {
        website: 'https://www.rewindtty.dev',
        platform: text('Terminale su sistemi Unix', 'Terminal on Unix systems'),
        technologies: ['C', 'PTY', 'cJSON', 'ANSI'],
        useCase: text('Per conservare una sessione del terminale, rivedere un procedimento o analizzarne comandi e tempi.', 'For preserving a terminal session, reviewing a procedure or analysing its commands and timing.'),
        features: {
            it: ['Registra input e output con timestamp e riproduci la sessione rispettandone i tempi.', 'Salva dati strutturati in JSON per integrazioni e analisi successive.', 'Riproduci le sessioni anche con il browser player del progetto; la modalità interattiva è sperimentale.'],
            en: ['Record input and output with timestamps and replay sessions with their original timing.', 'Save structured JSON data for integrations and later analysis.', 'Replay sessions in the project’s browser player; interactive mode is experimental.'],
        },
    },
    'gh-contributions-tetris-gif-maker': {
        website: 'https://github.com/debba/gh-contributions-tetris-gif-maker#readme',
        websiteKind: 'documentation',
        platform: text('Riga di comando e Docker', 'Command line and Docker'),
        technologies: ['Python', 'Pillow', 'GitHub'],
        useCase: text('Per dare una forma visiva diversa alla propria attività GitHub e condividere un anno di contributi come animazione.', 'For giving your GitHub activity a different visual form and sharing a year of contributions as an animation.'),
        features: {
            it: ['Scegli utente GitHub e anno da trasformare in un’animazione.', 'Genera una GIF con blocchi in stile Tetris a partire dai contributi giornalieri.', 'Adatta lo script o usa gli esempi Docker per organizzare una generazione periodica.'],
            en: ['Choose the GitHub user and year to turn into an animation.', 'Generate a Tetris-style GIF from daily contributions.', 'Adapt the script or use the Docker examples to arrange scheduled generation.'],
        },
        media: [video('gh-contributions-tetris-gif-maker', 'demo.mp4', '/images/projects/cover/gh-contributions-tetris-gif-maker-still.png', 'Esempio senza audio: i blocchi animati compongono il calendario dei contributi GitHub.', 'Silent example: animated blocks assemble the GitHub contribution calendar.')],
    },
    'fs-access-api-react-demo': {
        website: 'https://debba.github.io/fs-access-api-react-demo',
        platform: text('Browser web', 'Web browser'),
        technologies: ['React', 'TypeScript', 'File System Access API'],
        useCase: text('Un esempio pratico per chi vuole integrare apertura e salvataggio di file locali in un’applicazione React.', 'A practical example for developers integrating local file opening and saving into a React application.'),
        features: {
            it: ['Apri un file di testo scelto dall’utente e leggine il contenuto nell’applicazione.', 'Scrivi e salva un file di testo attraverso le API del browser.', 'Confronta l’uso dell’API nativa con il percorso alternativo per i browser che non la supportano.'],
            en: ['Open a user-selected text file and read its content in the application.', 'Write and save a text file through browser APIs.', 'Compare the native API with the fallback for browsers that do not support it.'],
        },
    },
    'greenpass-covid19-qrcode-decoder': {
        website: 'https://github.com/debba/greenpass-covid19-qrcode-decoder#readme',
        websiteKind: 'documentation',
        platform: text('Applicazione web, progetto del 2021', 'Web application, 2021 project'),
        technologies: ['Python', 'Flask', 'QR code'],
        useCase: text('Un progetto storico nato per rendere leggibili i dati codificati nel QR del certificato COVID europeo.', 'A historical project built to make the data encoded in an EU COVID certificate QR code readable.'),
        features: {
            it: ['Carica un certificato e visualizza i dati contenuti nel relativo QR code.', 'Consulta un esempio di decodifica sviluppato con Python e Flask.', 'Usa il repository come riferimento o per avviare una propria istanza; la lettura dei dati non equivale alla validazione sanitaria del certificato.'],
            en: ['Upload a certificate and view the data contained in its QR code.', 'Explore a decoding example developed with Python and Flask.', 'Use the repository as a reference or run your own instance; reading the data does not validate the certificate’s health status.'],
        },
    },
    authpress: {
        website: 'https://authpress.dev',
        platform: text('Plugin WordPress', 'WordPress plugin'),
        technologies: ['PHP', 'WordPress', 'Telegram Bot API', 'TOTP'],
        useCase: text('Per aggiungere un secondo fattore all’accesso WordPress, lasciando agli utenti più possibilità di autenticazione e recupero.', 'For adding a second factor to WordPress login while giving users multiple authentication and recovery options.'),
        features: {
            it: ['Invia codici tramite Telegram o email, oppure usa un’app di autenticazione TOTP.', 'Configura più metodi per utente e genera codici di recupero monouso.', 'Gestisci provider e log da un pannello centrale e ricevi avvisi per accessi falliti.', 'Estendi il plugin con provider personalizzati attraverso le API dedicate.'],
            en: ['Send codes through Telegram or email, or use a TOTP authenticator app.', 'Configure multiple methods per user and generate single-use recovery codes.', 'Manage providers and logs centrally and receive alerts for failed logins.', 'Extend the plugin with custom providers through its dedicated APIs.'],
        },
        media: [
            image('authpress', 'screenshot-1.png', 'Configurazione di AuthPress nel pannello WordPress.', 'AuthPress configuration in the WordPress dashboard.'),
            image('authpress', 'screenshot-2.png', 'Guida alla configurazione di Telegram, email e TOTP.', 'Setup guide for Telegram, email and TOTP.'),
            image('authpress', 'screenshot-3.png', 'Impostazioni personali dei metodi di accesso e codici di recupero.', 'Personal sign-in method settings and recovery codes.'),
        ],
    },
    less2scss: {
        website: 'https://www.npmjs.com/package/less2scss',
        platform: text('Riga di comando con Node.js', 'Command line with Node.js'),
        technologies: ['Node.js', 'LESS', 'SCSS'],
        useCase: text('Per avviare la migrazione di fogli di stile LESS a SCSS mantenendo organizzati file e cartelle.', 'For starting a LESS-to-SCSS stylesheet migration while keeping files and directories organised.'),
        features: {
            it: ['Passa uno o più file e percorsi sorgente alla CLI.', 'Abilita la scansione ricorsiva e indica file o cartelle da escludere.', 'Salva l’output accanto agli originali o in una destinazione separata. La conversione automatica richiede una revisione del risultato.'],
            en: ['Pass one or more source files and paths to the CLI.', 'Enable recursive scanning and specify files or directories to exclude.', 'Save output beside the originals or in a separate destination. Automatically converted files need review.'],
        },
    },
    'emailchef-for-wordpress': {
        website: 'https://wordpress.org/plugins/emailchef/',
        platform: text('WordPress con un account Emailchef', 'WordPress with an Emailchef account'),
        technologies: ['PHP', 'WordPress', 'Emailchef API'],
        useCase: text('Per collegare la raccolta dei contatti sul proprio sito alle liste usate per le campagne email.', 'For connecting contact collection on your website to the lists used for email campaigns.'),
        features: {
            it: ['Sincronizza gli invii dei moduli con la lista Emailchef selezionata.', 'Integra Elementor, WPForms, Contact Form 7, Jetpack e Fast Secure Contact Form.', 'Usa i campi personalizzati per segmentare i contatti e preparare campagne da Emailchef.'],
            en: ['Sync form submissions with the selected Emailchef list.', 'Integrate Elementor, WPForms, Contact Form 7, Jetpack and Fast Secure Contact Form.', 'Use custom fields to segment contacts and prepare campaigns in Emailchef.'],
        },
        media: [image('emailchef-for-wordpress', 'screenshot-1.png', 'Configurazione del collegamento tra WordPress ed Emailchef.', 'Configuring the connection between WordPress and Emailchef.'), image('emailchef-for-wordpress', 'screenshot-2.png', 'Impostazioni di sincronizzazione dei contatti.', 'Contact synchronisation settings.')],
    },
    'github-tray-gnome-extension': {
        website: 'https://extensions.gnome.org/extension/9307/github-tray/',
        platform: text('Desktop GNOME su Linux', 'GNOME desktop on Linux'),
        technologies: ['GNOME Shell', 'JavaScript', 'GitHub API'],
        useCase: text('Per controllare attività e notifiche GitHub direttamente dalla barra superiore del desktop.', 'For checking GitHub activity and notifications directly from the desktop top bar.'),
        features: {
            it: ['Consulta repository, statistiche, issue e notifiche senza aprire il browser.', 'Controlla le esecuzioni di GitHub Actions e le informazioni dei repository da viste dedicate.', 'Collega i repository alle cartelle locali e configura aggiornamenti e preferenze di visualizzazione.'],
            en: ['Check repositories, statistics, issues and notifications without opening a browser.', 'Inspect GitHub Actions runs and repository information in dedicated views.', 'Connect repositories to local directories and configure refresh and display preferences.'],
        },
        media: [image('github-tray-gnome-extension', 'overview.png', 'Panoramica dell’estensione nel pannello GNOME.', 'Overview of the extension in the GNOME panel.'), image('github-tray-gnome-extension', 'screenshot-2.png', 'Elenco delle esecuzioni di GitHub Actions con stato, durata e repository.', 'GitHub Actions runs with status, duration and repository.'), image('github-tray-gnome-extension', 'screenshot-4.png', 'Preferenze dell’estensione e notifica di una nuova stella su GitHub.', 'Extension preferences and a notification for a new GitHub star.')],
    },
    'emailchef-for-woocommerce': {
        website: 'https://wordpress.org/plugins/emailchef-for-woocommerce/',
        platform: text('WordPress e WooCommerce', 'WordPress and WooCommerce'),
        technologies: ['PHP', 'WooCommerce', 'Emailchef API'],
        useCase: text('Per utilizzare dati del negozio e comportamenti d’acquisto nelle campagne email e nelle automazioni Emailchef.', 'For using store data and purchasing behaviour in email campaigns and Emailchef automations.'),
        features: {
            it: ['Collega il negozio e sincronizza informazioni su clienti e ordini.', 'Gestisci le iscrizioni alla newsletter e organizza segmenti usando i dati del negozio.', 'Prepara in Emailchef automazioni per carrelli abbandonati, ordini ricorrenti e messaggi successivi all’acquisto.'],
            en: ['Connect your store and sync customer and order information.', 'Manage newsletter subscriptions and organise segments using store data.', 'Prepare Emailchef automations for abandoned carts, repeat orders and post-purchase messages.'],
        },
        media: [image('emailchef-for-woocommerce', 'screenshot-1.png', 'Configurazione del plugin nel negozio WooCommerce.', 'Plugin configuration in the WooCommerce store.'), image('emailchef-for-woocommerce', 'screenshot-2.png', 'Opzioni di collegamento e sincronizzazione.', 'Connection and synchronisation options.'), image('emailchef-for-woocommerce', 'screenshot-5.png', 'Registro della sincronizzazione dei carrelli abbandonati con Emailchef.', 'Log of abandoned cart synchronisation with Emailchef.')],
    },
    'turbosmtp-for-wordpress': {
        website: 'https://wordpress.org/plugins/turbosmtp/',
        platform: text('WordPress con un account turboSMTP', 'WordPress with a turboSMTP account'),
        technologies: ['PHP', 'WordPress', 'turboSMTP API'],
        useCase: text('Per gestire le email transazionali del sito e consultare gli esiti di invio in un’integrazione dedicata.', 'For managing website transactional email and reviewing delivery outcomes through a dedicated integration.'),
        features: {
            it: ['Invia tramite turboSMTP i messaggi generati da WordPress e dai plugin che usano wp_mail().', 'Configura mittente e credenziali ed esegui un invio di prova.', 'Consulta dati su consegne, aperture, clic e rimbalzi per seguire gli invii.'],
            en: ['Send messages generated by WordPress and plugins using wp_mail() through turboSMTP.', 'Configure sender details and credentials and send a test message.', 'Review delivery, open, click and bounce data to follow your messages.'],
        },
        media: [image('turbosmtp-for-wordpress', 'screenshot-1.png', 'Impostazioni del plugin turboSMTP.', 'turboSMTP plugin settings.'), image('turbosmtp-for-wordpress', 'screenshot-2.png', 'Una vista delle funzioni del plugin in WordPress.', 'A view of the plugin features in WordPress.'), image('turbosmtp-for-wordpress', 'screenshot-4.png', 'Andamento degli invii con consegne, aperture, clic e rimbalzi.', 'Email delivery trends with deliveries, opens, clicks and bounces.')],
    },
    'turbosmtp-email-validator-for-wordpress': {
        website: 'https://www.wordpress.org/plugins/turbosmtp-email-validator/',
        platform: text('WordPress e WooCommerce', 'WordPress and WooCommerce'),
        technologies: ['PHP', 'WordPress', 'turboSMTP API'],
        useCase: text('Per controllare gli indirizzi email raccolti durante registrazioni, invii di moduli e acquisti.', 'For checking email addresses collected during registrations, form submissions and purchases.'),
        features: {
            it: ['Attiva la validazione nei moduli WordPress supportati e nel checkout WooCommerce.', 'Configura le credenziali API, prova la verifica e consulta la cronologia degli indirizzi controllati.', 'Escludi indirizzi o domini tramite whitelist e personalizza gli esiti accettati con i filtri del plugin.'],
            en: ['Enable validation in supported WordPress forms and WooCommerce checkout.', 'Configure API credentials, test validation and inspect the history of checked addresses.', 'Exclude addresses or domains with a whitelist and customise accepted results through plugin filters.'],
        },
        media: [image('turbosmtp-email-validator-for-wordpress', 'screenshot-1.png', 'Impostazioni generali della validazione email.', 'General email validation settings.'), image('turbosmtp-email-validator-for-wordpress', 'screenshot-2.png', 'Configurazione dei moduli su cui attivare la verifica.', 'Configuring which forms use validation.'), image('turbosmtp-email-validator-for-wordpress', 'screenshot-5.png', 'Cronologia degli indirizzi verificati, con esito e dettagli della validazione.', 'History of checked addresses, with validation outcomes and details.')],
    },
    'zed-freemarker': {
        website: 'https://zed.dev/extensions/freemarker',
        platform: text('Editor Zed', 'Zed editor'),
        technologies: ['Zed', 'tree-sitter', 'FreeMarker / FTL'],
        useCase: text('Per scrivere e leggere template Apache FreeMarker in Zed con un supporto sintattico dedicato.', 'For writing and reading Apache FreeMarker templates in Zed with dedicated syntax support.'),
        features: {
            it: ['Distingui direttive FTL, interpolazioni, condizioni, cicli e macro tramite evidenziazione della sintassi.', 'Lavora con HTML incorporato e con le sintassi a parentesi angolari o quadre.', 'Usa corrispondenza e chiusura delle parentesi; la grammatica tree-sitter è disponibile nel repository.'],
            en: ['Distinguish FTL directives, interpolations, conditions, loops and macros with syntax highlighting.', 'Work with embedded HTML and angle-bracket or square-bracket syntax.', 'Use bracket matching and closing; the tree-sitter grammar is available in the repository.'],
        },
    },
};
