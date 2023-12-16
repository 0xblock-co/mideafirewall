import { Button } from "react-bootstrap";

import { useRouter } from "next/router";
import { useEffect } from "react";

const ContactWithSalesChat = () => {
    const router = useRouter(); // Get the router instance

    useEffect(() => {
        const openChatWidget = () => {
            if (typeof window !== "undefined" && window.Tawk_API) {
                window.Tawk_API.maximize();
            }
        };

        const minimizeChatWidget = () => {
            if (typeof window !== "undefined" && window.Tawk_API) {
                window.Tawk_API.minimize();
            }
        };

        // Attach the click event to the button
        const chatButton = document.getElementById("chatButton");
        chatButton.addEventListener("click", openChatWidget);

        // Listen for route changes and minimize the chat widget when navigating
        const handleRouteChange = () => {
            minimizeChatWidget();
        };

        // Add a route change listener
        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            // Clean up the event listener and route change listener when the component unmounts
            chatButton.removeEventListener("click", openChatWidget);
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router]);

    // useEffect(() => {
    //   const openChatWidget = () => {
    //     if (typeof window !== "undefined" && window.Tawk_API) {
    //       window.Tawk_API.maximize();
    //     }
    //   };

    //   // Attach the click event to the button
    //   const chatButton = document.getElementById("chatButton");
    //   chatButton.addEventListener("click", openChatWidget);

    //   return () => {
    //     // Clean up the event listener when the component unmounts
    //     chatButton.removeEventListener("click", openChatWidget);
    //   };
    // }, []);

    return (
        <div className="box-block-main">
            <div className="img-wrapper">
                <img src="/images/contact-our-sales.png" alt="Contact to Sales" title="Contact to Sales" loading="lazy" className="lazyload" />
            </div>
            <div className="box-content-block">
                <h2>Contact Our Sales</h2>
                <p>Chat with our sales team</p>
                <Button type="submit" id="chatButton" variant="primary" className="w-100 mt-3 py-3 common-btn">
                    Chat with Sales
                </Button>
            </div>
        </div>
    );
};

export default ContactWithSalesChat;
