import {ActivityItem, ServiceItem} from "./data";

export interface DataProps {
    services: ServiceItem[];
    activities: ActivityItem[];
    customersLogo: string[];
}

interface ProjectDetail {
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
    image?: string;
    name: string;
    description:  string;
    short_description: string;
}
