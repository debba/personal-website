export interface ServiceItem {
    name: string;
    description: string;
    skills: string[];
}

export interface ProjectItem {
    github_name: string;
    localeBlacklist?: string[];
    image?: string;
    name: string;
    description: string;
    short_description: string;
}

export interface MenuItem {
    link: string;
    i18n: string;
}

export interface ActivityItem {
    id: string;
    logo?: string;
    link?: string;
    name: string;
    title: string;
    full_desc: string;
    bg_color: string;
    hover_button_bg_color?: string;
    button_text?: string;
    button_icon?: string;
    add_class?: string;
}
