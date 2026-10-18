import {ProjectNameLocalized} from "../interfaces/data";

export const localize = (value: string | ProjectNameLocalized, locale?: string): string => {
    if (typeof value === 'string') return value;
    return locale && locale in value ? value[locale] : '';
}
