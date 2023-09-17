import Router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

import { useAuth } from "@/contexts/AuthContext";
export default function HomeBanner() {
  const { isLogin } = useAuth();

  return (
    <section className="mdf__banner__back">
      <div className="mdf__banner_text">
        <h1>
          The Ultimate AI{" "}
          <span className="text_gredient">Content Moderation</span> Tool
        </h1>
        <p className="fw-semibold">
          Media Firewall is a powerful AI-based content moderation tool that
          helps online communities keep their platforms safe and free from
          harmful content.
        </p>
        <Button
          variant="primary"
          className="rounded-pill button_primary py-2 px-4"
          onClick={() =>
            Router.push(isLogin ? "/network-blog" : "/account-security/login")
          }
        >
          See Demo
        </Button>
      </div>
      <div className="mdf__banner__video">
        <div className="mdf__video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/QFcsP2-tIgA"
            title="HTML &amp; Amp Email Creation | No-Code Approach | Ampier Plugin for Figma  Workflow"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
