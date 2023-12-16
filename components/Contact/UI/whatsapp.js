import { Button } from "react-bootstrap";

import Link from "next/link";

const WhatsAppChat = ({ phone, message }) => {
    return (
        <div className="box-block-main">
            <div className="img-wrapper">
                <img src="/images/whatsapp.jpg" alt="Connect via WhatsApp" className="lazyload" loading="lazy" title="Connect via WhatsApp" />
            </div>
            <div className="box-content-block">
                <h2>WhatsApp</h2>
                <p>Contact via whatsapp</p>
                <Button type="submit" variant="primary" className="w-100 mt-3 py-3 common-btn">
                    <Link href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}}`} target="_blank" style={{ textDecoration: "none" }}>
                        Send Message
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default WhatsAppChat;
