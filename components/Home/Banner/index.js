import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
export default function HomeBanner() {
   return (
      <section className="mdf__banner__back">
         <div className="mdf__banner_text">
            <h1>The Ultimate AI <span className="text_gredient">Content Moderation</span> Tool</h1>
            <p className="fw-semibold">Media Firewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content.</p>
            <Button variant="primary" className="rounded-pill button_primary py-2 px-4">See Demo</Button>
         </div>
         <div className="mdf__banner__video">
            <div className="mdf__video">
               <iframe width="100%" height="100%" src="https://www.youtube.com/embed/QFcsP2-tIgA" title="HTML &amp; Amp Email Creation | No-Code Approach | Ampier Plugin for Figma  Workflow" frameborder="0"></iframe>
            </div>
         </div>
      </section>
   );
}