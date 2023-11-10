/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ["en", "fr", "nl-NL"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "en",
    },
    publicRuntimeConfig: {
        apiPath: process.env.API_PATH,
        stripeClientKey: process.env.STRIPE_CLIENT_KEY,
        reCaptchaSiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
        whatsAppContactNumber: process.env.WHATSAPP_PHONE_NUMBER,
        embedTawkToUrl: process.env.EMBED_TAWK_TO_URL,
    },
};

module.exports = nextConfig;
