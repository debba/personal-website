import {ActivityItem, ProjectImage, ProjectNameLocalized, ServiceItem} from "./data";

export interface DataProps {
    services: ServiceItem[];
    activities: ActivityItem[];
    customersLogo: string[];
}

interface ProjectDetail {
    homepage: string;
    html_url  : string;
    description: string;
    stargazers_count: number;
    stargazers_url: string;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    forks_url: string;
}

export interface ProjectProps {
    githubData: ProjectDetail;
    hide_stats: boolean;
    image?: ProjectImage;
    name: string;
    description:  string | ProjectNameLocalized;
    short_description: string | ProjectNameLocalized;
}
