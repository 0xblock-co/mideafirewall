import getConfig from "next/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const { publicRuntimeConfig } = getConfig();

const ContactWithSalesChat = () => {
  const router = useRouter(); // Get the router instance
const [isChatVisible, setChatVisibility] = useState(false);
const toggleChat = () => {
  setChatVisibility(!isChatVisible);

  // If the chat is becoming visible, dynamically load the script
  if (!isChatVisible) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'zsiqscript';
    script.innerHTML = `
      var $zoho = $zoho || {};
      $zoho.salesiq = $zoho.salesiq || {
        widgetcode: "${publicRuntimeConfig.zohoSalesIq}",
        values: {},
        ready: function () {}
      };
      var d = document;
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.id = "zsiqscript";
      s.defer = true;
      s.src = "https://salesiq.zohopublic.in/widget";
      var t = d.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(s, t);
    `;

    document.head.appendChild(script);

    // Ensure that the script is removed when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }
};

  useEffect(() => {
 const openChatWidget = () => {
   if (typeof window !== 'undefined' && window.$zoho && window.$zoho.salesiq) {
    console.log('window: ', window);
    window.$zoho.salesiq.floatbutton.visible("show");
  }
};

const minimizeChatWidget = () => {
  if (typeof window !== 'undefined' && window.$zoho && window.$zoho.salesiq) {
    window.$zoho.salesiq.floatbutton.visible("hide");
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

  return (
    <div className="box-block-main">
      <div className="img-wrapper">
        <img src="/images/contact-our-sales.png" alt="Contact to Sales" title="Contact to Sales" loading="lazy" className="lazyload" />
      </div>
      <div className="box-content-block">
        <h2>Contact Our Sales</h2>
        <p>Chat with our sales team</p>
        <Button type="submit" id="chatButton" variant="primary" onClick={toggleChat} className="w-100 mt-3 py-3 common-btn">
          Chat with Sales
        </Button>
      </div>
    </div>
  );
};

export default ContactWithSalesChat;
