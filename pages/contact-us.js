import { Fragment } from "react";

import ContactBanner from "@/components/Contact/banner";
import BookMeeting from "@/components/Contact/book-meeting";
import ContactChatBlock from "@/components/Contact/chat-blocks";
export default function LandingScreen() {
  return (
    <Fragment>
        <ContactBanner/>
        <ContactChatBlock />
        <BookMeeting />
    </Fragment>
  );
}
