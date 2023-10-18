import Router from "next/router";
import { Button } from "react-bootstrap";

import { FormattedMessage } from "react-intl";
import style from "./banner.module.scss";

export default function HomeBanner() {
  return (
    <section className={style.mdf__banner__back}>
      <div className={style.mdf__banner_text}>
        <h1>
          <FormattedMessage
            id="page.home.banner.mainTitle"
            values={{
              span: (chunks) => <span className="text_gredient">{chunks}</span>,
            }}
          />
          {/* The Ultimate AI{" "} */}
          {/* <span className="text_gredient">Content Moderation</span> Tool */}
        </h1>
        <p className="fw-semibold">
          <FormattedMessage id="page.home.banner.paragraph" />
          {/* Media Firewall is a powerful AI-based content moderation tool that
          helps online communities keep their platforms safe and free from
          harmful content. */}
        </p>
        <Button
          variant="primary"
          className="rounded-pill button_primary py-2 px-4"
          onClick={() => Router.push("/network-blog")}
        >
          <FormattedMessage id="button.See Demo" />
        </Button>
      </div>
      <div className={style.mdf__banner__video}>
        <div className={style.mdf__video}>
          {/* <iframe
            width="100%"
            height="100%"
            src="https://mediafirewall.s3.ap-south-1.amazonaws.com/Display_videos/MFW_Demo.mp4"
            title="HTML &amp; Amp Email Creation | No-Code Approach | Ampier Plugin for Figma  Workflow"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe> */}
          <video
            className={style.video}
            src="https://mediafirewall.s3.ap-south-1.amazonaws.com/Display_videos/MFW_Demo.mp4"
            controls
            autoPlay
            loop
            playsInline
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
