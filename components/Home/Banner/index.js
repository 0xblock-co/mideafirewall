import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
export default function HeaderTop() { 
     return (
        <section className="mdf__banner__back"> 
           <div className="mdf__banner_text">
           <h1>The Ultimate AI <span className="text_gredient">Content Moderation</span> Tool</h1>
            <p className="fw-semibold">Media Firewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content.</p>
            <Button variant="primary" className="rounded-pill py-2 px-4">See Demo</Button>
           </div>
        </section>
     );
}