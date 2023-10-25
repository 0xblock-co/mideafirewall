import { Button } from "react-bootstrap";

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
    <div className="box-block-main">
      <div className="img-wrapper">
        <img
          src="/images/contact-our-sales.png"
          alt="Contact to Sales"
          title="Contact to Sales"
        />
      </div>
      <div className="box-content-block">
        <h2>Contact Our Sales</h2>
        <p>Chat with our sales team</p>
        <Button
          type="submit"
          id="chatButton"
          variant="primary"
          className="w-100 mt-3 py-3 common-btn"
        >
          Chat with Sales
        </Button>
      </div>
    </div>
  );
  // return (
  //   <Card className={`${style.mdf__chatcard} mb-3`}>
  //     <Image
  //       className={style.chat__icons}
  //       layout="fill"
  //       src="/images/Messages.png"
  //       alt="A globe icon with filter and text."
  //     />
  //     <h6 className="my-4">Chat with our sales team</h6>
  //     <Button id="chatButton" variant="primary">
  //       Chat with Sales
  //     </Button>
  //   </Card>
  // );
};

export default ContactWithSalesChat;
