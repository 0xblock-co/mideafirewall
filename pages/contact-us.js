import { Fragment } from "react";

import ContactBanner from "@/components/Contact/banner";
import ContactChatBlock from "@/components/Contact/chat-blocks";

export default function ContactUsScreen() {
  return (
    <Fragment>
      <ContactBanner />
      <ContactChatBlock />
    </Fragment>
  );
}
