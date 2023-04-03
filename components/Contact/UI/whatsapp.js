import Image from "next/image";
import { Button, Card } from "react-bootstrap";

const WhatsAppChat = ({ phone, message }) => {
  const handleClickOnWhatsapp = () => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
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
    </Card>
  );
};

export default WhatsAppChat;
