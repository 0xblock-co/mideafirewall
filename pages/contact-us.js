import { Fragment, useState } from "react";

import ContactBanner from "@/components/Contact/banner";
import BookMeeting from "@/components/Contact/book-meeting";
import ContactChatBlock from "@/components/Contact/chat-blocks";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";
import {
  asyncCreateMeeting,
  asyncGetDefaultMeeting,
} from "@/services/product/product.service";
import { showToast } from "@/components/ToastContainer/toaster";
export default function LandingScreen() {
  const { user } = useAuth();

  const [isBookMeeting, setIsBookMeeting] = useState(false);
  const [defaultMeetingData, setDefaultMeetingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookMeeting = async (value) => {
    const result = await asyncGetDefaultMeeting();
    if (result && result.isSuccess && result.data) {
      setDefaultMeetingData(result.data);
      setIsBookMeeting(value);
    }
  };

  const handleSubmitMeeting = async (values) => {
    setIsLoading(true);
    const response = await asyncCreateMeeting(values, user);
    setIsLoading(false);
    if (response && response.isSuccess && response.data) {
      showToast("success", "Meeting booked successfully");
      setIsBookMeeting(false);
    }
  };

  return (
    <Fragment>
      <ContactBanner />
      <ContactChatBlock handleBookMeeting={handleBookMeeting} />
      {isBookMeeting && (
        <BookMeeting
          handleSubmitMeeting={handleSubmitMeeting}
          defaultMeetingData={defaultMeetingData}
        />
      )}
      <Loader isLoading={isLoading} />
    </Fragment>
  );
}
