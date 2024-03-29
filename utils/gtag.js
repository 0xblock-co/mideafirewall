import ReactGA from "react-ga";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    ReactGA.set({ page: url });
    ReactGA.send();
    ReactGA.pageview(url);

    // window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    //     page_path: url,
    // });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    ReactGA.event({
        action,
        category,
        label,
        value,
    });

    // typeof window !== undefined &&
    //     window.gtag("event", action, {
    //         event_category: category,
    //         event_label: label,
    //         value,
    //     });
};
