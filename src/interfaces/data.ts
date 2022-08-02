export interface ServiceItem {
    name: string;
    description: string;
    skills: string[];
}

export interface ProjectNameLocalized {
    [key : string]: string;
}

export interface ProjectImage {
    cover?: string;
    icon?: string;
}

export interface ProjectItem {
    github_user: string;
    github_name: string;
    localeBlacklist?: string[];
    image?: ProjectImage;
    name: string;
    hide_stats?: boolean;
    description: string | ProjectNameLocalized;
    short_description: string | ProjectNameLocalized;
}

export interface MenuItem {
    link: string;
    i18n: string;
}

export interface ActivityItemButton {
    hover_button_bg_color?: string;
    button_text?: string;
    button_icon?: string;
    external?: boolean;
    button_icon_fill?: string;
    link: string;
}

export interface ActivityItem {
    id: string;
    logo?: string;
    name: string;
    title: string;
    full_desc: string;
    bg_color: string;
    add_class?: string;
    buttons?: ActivityItemButton[];
}
