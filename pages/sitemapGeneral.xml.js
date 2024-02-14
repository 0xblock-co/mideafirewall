/* eslint-disable no-empty-function */
const LIVE_URL = `https://www.mediafirewall.ai`;
function SitemapGeneral() {}

export async function getServerSideProps({ res }) {
    const createSitemap = () =>
        `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${LIVE_URL}</loc>
        </url>
        <url>
          <loc>${LIVE_URL}/features-list</loc>
        </url>
        <url>
          <loc>${LIVE_URL}/contact-us</loc>
        </url>
        <url>
          <loc>${LIVE_URL}/terms-of-service</loc>
        </url>
        <url>
          <loc>${LIVE_URL}/terms-of-use</loc>
        </url>  
        <url>
          <loc>${LIVE_URL}/privacy-policy</loc>
        </url> 
        <url>
          <loc>${LIVE_URL}/pricing</loc>
        </url> 
      </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    const siteMap = createSitemap();
    res.write(siteMap);
    res.end();
    return { props: {} };
}

export default SitemapGeneral;
