import Image from "next/image";
import { Button, Card } from "react-bootstrap";

import style from "../contact.module.scss";
import { useEffect } from "react";

const ContactWithSalesChat = () => {
  useEffect(() => {
    const openChatWidget = () => {
      if (typeof window !== "undefined" && window.Tawk_API) {
        window.Tawk_API.maximize();
      }
    };

    // Attach the click event to the button
    const chatButton = document.getElementById("chatButton");
    chatButton.addEventListener("click", openChatWidget);

    return () => {
      // Clean up the event listener when the component unmounts
      chatButton.removeEventListener("click", openChatWidget);
    };
  }, []);

  return (
    <Card className={`${style.mdf__chatcard} mb-3`}>
      <Image
        className={style.chat__icons}
        layout="fill"
        src="/images/Messages.png"
        alt="A globe icon with filter and text."
      />
      <h6 className="my-4">Chat with our sales team</h6>
      <Button id="chatButton" variant="primary">
        Chat with Sales
      </Button>
    </Card>
  );
};

export default ContactWithSalesChat;
