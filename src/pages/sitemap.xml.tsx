import {GetServerSideProps} from "next";
import {PROJECTS} from "../data/projects";

const Sitemap = () => {
};

export const getServerSideProps: GetServerSideProps = async ({res, locales}) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITEURL || 'http://localhost:3000';

    const staticPages = ["", "projects"];
    const dynamicPages = PROJECTS
        .map(project => `projects/${project.github_name}`)

    const pages = locales
        .flatMap(
            locale => {
                return [...staticPages, ...dynamicPages]
                    .map((staticPagePath) => {
                        const prefix = locale ? `/${locale}` : '';
                        const path   = staticPagePath !== '' ? `/${staticPagePath}` : staticPagePath;
                        return `${baseUrl}${prefix}${path}`;
                    });
            }
        )


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((url) => {
            return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
