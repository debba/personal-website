export interface ServiceItem {
    name: string;
    description: string;
    skills: string[];
}

export interface MenuItem {
    link: string;
    i18n: string;
}

export interface ActivityItem {
    logo?: string;
    link?: string;
    name: string;
    title: string;
    full_desc: string;
    bg_color: string;
    add_class?: string;
}