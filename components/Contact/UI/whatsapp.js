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
    // return (
    //   <Card className={style.mdf__chatcard}>
    //     <Image
    //       className={style.chat__icons}
    //       layout="fill"
    //       src="/images/Whatsapp.png"
    //       alt="A globe icon with filter and text."
    //     />
    //     <h6 className="my-4">Whatsapp</h6>
    //     <Button variant="primary" onClick={handleClickOnWhatsapp}>
    //       Send Message
    //     </Button>
    //   </Card>
    // );
};

export default WhatsAppChat;
