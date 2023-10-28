import { useState } from "react";

import {
  asyncCreateMeeting,
  asyncGetDefaultMeeting,
} from "@/services/product/product.service";
import { showToast } from "@/components/ToastContainer/toaster";
import BookMeeting from "@/components/Contact/book-meeting";
import { useAuth } from "@/contexts/AuthContext";

export default function BookMeetingScreen() {
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
    console.log("values: ", values);
    const response = await asyncCreateMeeting(values, user);
    setIsLoading(false);
    if (response && response.isSuccess && response.data) {
      showToast("success", "Meeting booked successfully");
      setIsBookMeeting(false);
    }
  };

  return (
    <BookMeeting
      handleSubmitMeeting={handleSubmitMeeting}
      defaultMeetingData={defaultMeetingData}
    />
  );
}
