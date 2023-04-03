import Image from "next/image";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import twilio from "twilio";
const WhatsAppChatWithTwilio = ({ phone, _messagee }) => {
  const [message, setMessage] = useState("");
  const handleClickOnWhatsapp = async () => {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    );
    const response = await client.messages.create({
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`,
      body: message,
    });
    console.log(response);
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Card className="mdf__chatcard">
      <Image
        className="chat__icons"
        layout="fill"
        src="/images/Whatsapp.png"
        alt="A globe icon with filter and text."
      />
      <h6 className="my-4">Whatsapp</h6>
      <Button variant="primary" onClick={handleClickOnWhatsapp}>
        Send Message
      </Button>
      <input type="text" value={message} onChange={handleChange} />
    </Card>
  );
};

export default WhatsAppChatWithTwilio;
