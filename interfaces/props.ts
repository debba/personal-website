import {ActivityItem, ServiceItem} from "./data";

export interface DataProps {
    services: ServiceItem[];
    activities: ActivityItem[];
    customersLogo: string[];
}
