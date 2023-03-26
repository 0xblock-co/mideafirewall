import { Fragment } from "react";
import ContactBanner from "@/components/Contact/banner";
import ContactChatBlock from "@/components/Contact/chat-blocks";
import BookMeeting from "@/components/Contact/book-meeting";
export default function LandingScreen() {
  return (
    <Fragment> 
        <ContactBanner/>
        <ContactChatBlock />
        <BookMeeting />
    </Fragment>
  );
}
