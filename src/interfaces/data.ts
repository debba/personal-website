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
    // Still frame shown instead of an animated cover when motion should be reduced.
    still?: string;
}

export interface ProjectItem {
    github_user: string;
    github_name: string;
    emoji?: string;
    localeBlacklist?: string[];
    image?: ProjectImage;
    // Space-separated RGB used for the tile glow, e.g. '37 99 235'.
    accent?: string;
    name: string;
    hide_stats?: boolean;
    description: string | ProjectNameLocalized;
    short_description: string | ProjectNameLocalized;
}

export interface ProjectMedia {
    kind: 'image' | 'video';
    src: string;
    caption: ProjectNameLocalized;
    poster?: string;
}

export interface ProjectDetails {
    website: string;
    websiteKind?: 'documentation';
    platform: ProjectNameLocalized;
    technologies: string[];
    useCase: ProjectNameLocalized;
    features: {it: string[]; en: string[]};
    media?: ProjectMedia[];
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
    logo_alt?: string;
    // Shown instead of a logo.
    emoji?: string;
    name: string;
    title: string;
    full_desc: string;
    bg_color: string;
    add_class?: string;
    buttons?: ActivityItemButton[];
}
