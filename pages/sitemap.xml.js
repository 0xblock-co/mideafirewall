/* eslint-disable no-empty-function */

const LIVE_URL_WWW = `https://www.mediafirewall.ai`;
function Sitemap() {}

export async function getServerSideProps({ res }) {
  const createSitemap = () =>
    `<?xml version="1.0" encoding="UTF-8"?>
    
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${LIVE_URL_WWW}/sitemapGeneral.xml</loc>
      </sitemap>
    </sitemapindex>
    `

  res.setHeader("Content-Type", "text/xml")
  const siteMap = createSitemap()
  res.write(siteMap)
  res.end()
  return { props: {} }
}

export default Sitemap
