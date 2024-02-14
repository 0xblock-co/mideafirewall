import { NextSeo } from "next-seo";
import { Col, Container, Row } from "react-bootstrap";

const ContentPage = () => {
    return (
        <>
            <NextSeo
                title="Privacy Policy"
                description="Learn about the types of personal information collected, how it is utilized, and the duration of retention. Discover how MediaFirewall collects your information, shares it, and protects your privacy. Understand your choices and rights regarding your personal information. Find out how we treat personal information submitted to our Services and update your communication preferences."
                canonical="https://mediafirewall.ai/privacy-policy"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/privacy-policy",
                    title: "Privacy Policy",
                    description:
                        "Learn about the types of personal information collected, how it is utilized, and the duration of retention. Discover how MediaFirewall collects your information, shares it, and protects your privacy. Understand your choices and rights regarding your personal information. Find out how we treat personal information submitted to our Services and update your communication preferences.",
                    site_name: "Media Firewall",
                    images: [
                        {
                            url: "https://mediafirewall.ai/images/logo.png",
                            width: 1200,
                            height: 630,
                            alt: "Media Firewall Logo",
                        },
                    ],
                }}
                // twitter={{
                //     cardType: "summary_large_image",
                //     handle: "@yourTwitterHandle", // Replace with your Twitter handle
                //     site: "@yourTwitterHandle", // Replace with your Twitter handle
                // }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Privacy Policy, Personal Information, Data Utilization, Data Collection, Data Retention, Information Sharing, Privacy Protection, User Rights, Communication Preferences, Children Under 13, MediaFirewall",
                    },
                ]}
            />

            <div style={{ margin: "100px 0", minHeight: "50vh" }}>
                <Container>
                    <Row>
                        <Col>
                            <div className="box">
                                <h1 style={{ margin: "20px 0" }}>Privacy Policy</h1>
                                <h2>
                                    <b>We are committed to safeguarding the privacy of your personal information.</b>
                                </h2>
                                <p>Your personal information will be handled securely and confidentially, adhering to all relevant laws and regulations.</p>
                                <p>
                                    When utilizing Mediafirewall Websites and Services (as defined below), we receive information that may directly or indirectly identify you (&quot;personal
                                    information&quot; or &quot;personal data&quot;).
                                </p>
                                <p>
                                    <b>In this Policy, we will outline:</b>
                                </p>
                                <ul>
                                    <li>The types of personal information collected by Mediafirewall and how it is utilized.</li>
                                    <li>How Mediafirewall collects your personal information, including whether it is collected automatically.</li>
                                    <li>The duration for which Mediafirewall retains your personal information.</li>
                                    <li>How and when Mediafirewall shares your personal information with others.</li>
                                    <li>Measures taken by Mediafirewall to protect your personal information.</li>
                                    <li>Your choices and rights regarding the use of your personal information, including accessing and updating it.</li>
                                    <li>How personal information submitted to our Services or collected through our Services on behalf of subscribers is treated.</li>
                                    <li>How to update your communication preferences.</li>
                                    <li>Whether our Services are intended for use by children under the age of 13.</li>
                                </ul>
                                <p>
                                    <b>Contact Information</b>
                                </p>
                                <p>
                                    Depending on the context of the personal information you provide, Mediafirewall may act as the data controller or data processor under this policy. Mediafirewall
                                    serves as a processor of personal information submitted to the Services or collected through the Services on behalf of or at the direction of subscribers. For any
                                    questions or concerns regarding this Privacy Policy, our privacy practices, the processing of your personal information, or to exercise your data rights under
                                    applicable laws, please reach out to Mediafirewall at{" "}
                                    <a href="mailto:support@mediafirewall.ai" title="Support Mediafirewall Email">
                                        support@mediafirewall.ai
                                    </a>
                                    .
                                </p>
                                <h3 className="text lg">1. What Personal Information Does Mediafirewall Collect?</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>
                                    The types of personal information we collect and share depend on your usage of our Websites or participation in Marketing Activities. In general, we may gather
                                    information that identifies you, details about your interaction with our Websites, and information generated during your engagement with our platforms.
                                </p>
                                <p>Information collected from you may include the following:</p>
                                <ul>
                                    <li>Personal identification details such as name, photograph, postal address, email address, or telephone number.</li>
                                    <li>Information provided when filling out forms on our Websites.</li>
                                    <li>Details that identify you in the planning and hosting of corporate events related to our Marketing Activities (e.g., user conferences).</li>
                                    <li>Records and copies of your correspondence, including email addresses if you reach out to us.</li>
                                    <li>Your responses to surveys conducted for research purposes.</li>
                                    <li>Transaction details from activities carried out on our Websites or related to orders of our Services.</li>
                                </ul>
                                <p>
                                    Additionally, as a contributing user, you may provide information that is published or displayed (&quot;posted&quot;) on public areas of our Websites or transmitted
                                    to other users or third parties. Your user contributions are posted and transmitted at your own risk.
                                </p>

                                <h3 className="text lg">2. How Mediafirewall Utilizes Your Personal Information</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>
                                    Mediafirewall employs the personal information you provide to us for the delivery of content on our Websites, the planning and hosting of Marketing Activities, and
                                    the provision of our Services.
                                </p>
                                <p>We may use this information in the following ways:</p>
                                <ul>
                                    <li>To showcase our Websites and their contents to you.</li>
                                    <li>To enable your participation in interactive features on our Websites.</li>
                                    <li>To enhance your overall experience using our Websites, Services, and Marketing Activities.</li>
                                    <li>To manage your access to the Services.</li>
                                    <li>To fulfill our obligations and enforce our rights arising from any contracts between you and us, including billing and collection purposes.</li>
                                    <li>To provide you with notifications about your account and/or subscription, including expiration and renewal notices.</li>
                                    <li>To inform you about changes to our Websites or Services.</li>
                                    <li>To provide information or services requested by you.</li>
                                    <li>To communicate with you about Marketing Activities, including promotional information.</li>
                                    <li>To send promotional information and other communications regarding our products or Services.</li>
                                    <li>To compile a list of actual and prospective users and subscribers for our products or Services.</li>
                                    <li>To gather statistics related to the use of our Websites, products, or Services.</li>
                                    <li>To prevent fraud or abuse.</li>
                                    <li>To comply with legal or regulatory obligations.</li>
                                    <li>For any other purpose described at the time we collect information.</li>
                                    <li>For any reason you engage us.</li>
                                    <li>For any other purpose with your consent.</li>
                                </ul>
                                <h3 className="text lg">3. How Mediafirewall Gathers Your Personal Information</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>Mediafirewall may directly collect personal information provided by you through the following means:</p>
                                <ul>
                                    <li>Completing forms on our Websites, such as registering an account, subscribing to a Service, or posting a comment.</li>
                                    <li>Creating an account to use our Services or generating a new user for an existing account.</li>
                                    <li>Completing transactions through our Websites, such as fulfilling an order for our Services.</li>
                                    <li>Performing image or video submissions on our Websites.</li>
                                    <li>Posting messages on our Websites, either in public areas or directly to other users or third parties.</li>
                                    <li>Using publicly accessible blogs on our Websites.</li>
                                    <li>Contacting us outside of our Websites, such as via email or Twitter.</li>
                                    <li>Requesting assistance from our Support team.</li>
                                    <li>Responding to surveys conducted for research purposes.</li>
                                    <li>Providing information posted on public areas of our Websites.</li>
                                    <li>Transmitting information to other users of our Websites or third parties as a user contribution.</li>
                                    <li>Registering for or attending our Marketing Activities.</li>
                                </ul>
                                <p>
                                    <b>Third-Parties and Data Supplementation</b>
                                </p>
                                <p>
                                    To the extent permitted by law, Mediafirewall may collect personal information about you from other sources, including publicly available databases or third parties
                                    from whom we have purchased data. This information may be maintained or associated with personal information we already have about you (&quot;data
                                    supplementation&quot;). It helps us improve our Websites, deliver better and more personalized Services, update and analyze our records, identify new customers, and
                                    provide products and services that may interest you.
                                </p>
                                <p>Examples of personal information obtained from public sources or purchased from third parties and combined with existing information may include:</p>
                                <ul>
                                    <li>Contact information from third-party sources to verify your address for fraud prevention or communication purposes.</li>
                                    <li>
                                        Data purchased from third parties, such as social networking sites and conference attendee lists, combined with our existing information to create more tailored
                                        advertising and products.
                                    </li>
                                </ul>
                                <p>
                                    If you receive marketing communications or promotions from us, you can opt-out at any time by (i) following the unsubscribe instructions in the promotion (if sent
                                    by email), (ii) accessing the email preferences in your account settings page in the Services user interface dashboard, or (iii) sending us an email at the address
                                    noted in the Contact Information section above.
                                </p>
                                <p>
                                    <b>Financial Information</b>
                                </p>
                                <p>
                                    We use third-party payment processors, such as Stripe, to handle payments made to us. In this process, we do not retain any personally identifiable information or
                                    financial details like credit card numbers. Instead, such information is directly provided to our third-party processors. You can view Stripe&apos;s privacy policy
                                    at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a>.
                                </p>
                                <h3 className="text lg">4. Duration of Personal Information Retention by Mediafirewall</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>
                                    Mediafirewall may retain your personal information for a duration consistent with the original purpose of collection. For example, we may keep your personal
                                    information while you maintain an account to use our Websites or Services, or as stipulated in our subscription agreements, and for a reasonable period thereafter.
                                    Additionally, we may retain your personal information for the time necessary to pursue our legitimate business interests, conduct audits, fulfill legal obligations,
                                    resolve disputes, and enforce our agreements.
                                </p>
                                <h3 className="text lg">5. When and How Mediafirewall Shares Your Personal Information with Others</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>
                                    Mediafirewall may share your personal information with specific third-parties based on our relationship with them, your consent, or legal and contractual
                                    obligations that necessitate such sharing.
                                </p>
                                <p>We may share your personal information that we collect or you provide in the following ways:</p>
                                <ul>
                                    <li>With our subsidiaries and affiliates for the purposes outlined in this Privacy Policy.</li>
                                    <li>
                                        With contractors, service providers such as Stripe, and other third-parties that support our business. These entities are bound by contractual obligations to
                                        maintain the confidentiality of personal information and can use it only for the purposes for which we disclose the information to them.
                                    </li>
                                    <li>
                                        In the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Mediafirewall&apos;s assets, we
                                        may share personal information about our Websites users. You will be notified via email and/or a prominent notice on our Websites of any change in ownership or
                                        uses of your personal information, as well as any choices you may have regarding your personal information.
                                    </li>
                                    <li>
                                        To comply with any court order, law, or legal process (such as a subpoena), investigate fraud, respond to government or regulatory requests, lawful requests by
                                        public authorities, or meet national security or law enforcement requirements.
                                    </li>
                                    <li>To enforce or apply our Terms of Service and other subscription agreements, including for billing and collection purposes.</li>
                                    <li>
                                        If we believe disclosure is necessary to protect the rights, property, or safety of Mediafirewall, our subscribers, or others. This includes exchanging
                                        information with other companies and organizations for the purposes of fraud protection and credit risk reduction.
                                    </li>
                                    <li>For any other purpose disclosed by us when you provide the information.</li>
                                    <li>With your consent.</li>
                                </ul>
                                <p>We may also disclose aggregated information about our users, and information that does not identify any individual, without restriction.</p>
                                <p>
                                    Mediafirewall collaborates with third-parties that serve content or applications, including third-parties that display advertising on our Websites or manage our
                                    advertising on other sites. These partners may collect your information as you interact with them through our Websites, and they may use cookies or similar
                                    technologies to provide you with advertising based on your browsing activities and interests.
                                </p>
                                <p>
                                    Occasionally, we may include links to other websites whose privacy practices may differ from ours. If you submit personal information to any of those sites, your
                                    information will be governed by the privacy policies of those third parties. Please carefully read the privacy policy of any website you visit.
                                </p>
                                <h3 className="text lg">6. How Mediafirewall Ensures the Security of Your Information</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers.
                                    </i>
                                </p>
                                <p>
                                    Mediafirewall is committed to maintaining appropriate technical and organizational security measures designed to protect your personal information from accidental
                                    loss, unauthorized use, alteration, or disclosure. While we implement and uphold security measures suitable for our business activities, it&apos;s essential to note
                                    that no security measures are flawless or invulnerable, and any transmission of personal information is done at your own risk.
                                </p>
                                <p>
                                    Additionally, it is your responsibility to ensure the safety and security of your information. We are not liable if you bypass any privacy settings or security
                                    measures on our Websites. Even if we provide you with a password (or you choose one) for accessing specific parts of our Websites, it is your responsibility to keep
                                    this password confidential. Avoid sharing your password with anyone. Exercise caution when sharing information in public areas of our Websites, such as community
                                    message boards or forums. Information shared in public areas may be viewed by any user of our Websites. We cannot control the actions of other users with whom you
                                    choose to share your information, and thus, we cannot guarantee that your contributed information cannot be viewed by unauthorized parties.
                                </p>
                                <h3 className="text lg">7. Your Choices and Rights Regarding the Use of Your Personal Information</h3>
                                <p>
                                    <i>
                                        Section 8 of this Privacy Policy specifically addresses and applies to personal information submitted by our subscribers to our Services or collected through
                                        our Services on behalf of or at the direction of our subscribers. For personal information processed on behalf of subscribers, please refer to Section 8 of this
                                        Privacy Policy for assistance in contacting the relevant subscriber.
                                    </i>
                                </p>
                                <p>
                                    By using our Websites, Services, and Marketing Activities, you expressly consent to the collection and use of your personal information in accordance with this
                                    Privacy Policy. This consent does not affect lawful processing under applicable laws based on other legal bases such as contractual obligation, compliance with
                                    applicable laws, and legitimate purposes.
                                </p>
                                <p>
                                    <b>Right to Access or Correct Personal Information</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    modifying or correcting your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>
                                    You have the right to access and correct your personal information. To review or correct your personal information, log in to the appropriate Website or Service and
                                    visit your account profile page (usually designated as “Account”), or contact us through the Support Center. Alternatively, you may send us an email at the address
                                    provided in the Contact Information section.
                                </p>
                                <p>
                                    <b>Right to Delete Personal Information (“Right to be Forgotten”)</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    removing your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>You have the right to request the deletion of personal information we hold about you when:</p>
                                <ul>
                                    <li>the personal information is no longer necessary for the purposes for which it was collected or otherwise processed,</li>
                                    <li>you withdraw consent, and there is no other legal ground for the processing,</li>
                                    <li>you object to the processing, and there are no overriding legitimate grounds for the processing,</li>
                                    <li>the personal information has been unlawfully processed, or</li>
                                    <li>
                                        the personal information must be erased for compliance with a legal obligation in the European Union or a Member State law to which Mediafirewall is subject.
                                    </li>
                                </ul>
                                <p>
                                    To request the removal of your personal information from our Websites or Services, log in to the appropriate Website or Service and contact us through the Support
                                    Center, or send us an email at the address provided in the Contact Information section. You can also request the closure of your account, and we will respond to
                                    your request within 30 days. In some cases, we may be unable to remove your personal information, and we will notify you of the reasons.
                                </p>
                                <p>
                                    <b>Right to Data Portability</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    the data portability of your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>You have the right to receive or transfer a copy of your personal information when:</p>
                                <ul>
                                    <li>we rely on your consent or the processing is necessary for the performance of a contract to which you are a party, and</li>
                                    <li>personal information is processed by automatic means.</li>
                                </ul>
                                <p>
                                    This copy will be provided to you in a common machine-readable format, and you may also require us to transmit it to another party where technically feasible. To
                                    request a copy of your personal information, log in to the appropriate Website or Service and contact us through the Support Center, or send us an email at the
                                    address provided in the Contact Information section.
                                </p>
                                <p>
                                    <b>Right to Restrict Personal Information Processing</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    restricting the processing of your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>You have the right to request the restriction of processing of your personal information when:</p>
                                <ul>
                                    <li>you contest the accuracy of the personal information until we take sufficient steps to correct or verify its accuracy,</li>
                                    <li>the processing is unlawful, but you do not want us to erase the personal information,</li>
                                    <li>
                                        we no longer need the personal information for the processing purposes, but you require the information for the establishment, exercise, or defense of legal
                                        claims, or
                                    </li>
                                    <li>
                                        you have objected to processing justified on legitimate interest grounds (see below) pending verification as to whether Mediafirewall has compelling legitimate
                                        grounds to continue processing.
                                    </li>
                                </ul>
                                <p>
                                    When personal information is restricted, we will only process it with your consent or for the establishment, exercise, or defense of legal claims. This includes
                                    restricting the processing of your personal information to only include storage (e.g., during the time when Mediafirewall assesses whether you are entitled to have
                                    personal information erased). To request the restriction of processing of your personal information, log in to the appropriate Website or Service and contact us
                                    through the Support Center, or send us an email at the address provided in the Contact Information section.
                                </p>
                                <p>
                                    <b>Right to Object to Processing Justified on Legitimate Interest Grounds</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    objecting to the processing of your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>
                                    Where we rely on legitimate interest to process personal information, you have the right to object to that processing. If you object, we must stop the processing
                                    unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms or where we need to process the personal information for
                                    the establishment, exercise, or defense of legal claims. We believe that we can demonstrate such compelling legitimate grounds, but each case will be considered
                                    individually. To object to the processing of your personal information, log in to the appropriate Website or Service and contact us through the Support Center, or
                                    send us an email at the address provided in the Contact Information section.
                                </p>
                                <p>
                                    <b>Right to be Informed of Appropriate Safeguards for Transferred Personal Information</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    being informed of safeguards when transferring your personal information to a third country, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>
                                    Refer to the Terms of Service for information on the safeguards in place to protect your personal information for transfer outside of the European Economic Area.
                                    For transfers to countries without an adequacy decision by the European Commission, Mediafirewall implements appropriate safeguards through contractual obligations.
                                </p>
                                <p>
                                    <b>Right to Withdraw Consent</b>
                                </p>
                                <p>
                                    If Mediafirewall processes your personal information on behalf of or at the direction of one of our subscribers, please contact that subscriber for assistance in
                                    withdrawing consent for processing your personal information, as described in Section 8 of this Privacy Policy.
                                </p>
                                <p>
                                    Where you have provided us with consent to process personal information, you have the right to withdraw such consent at any time, without affecting the lawfulness
                                    of processing based on consent before its withdrawal. To withdraw consent, you can:
                                </p>
                                <ul>
                                    <li>
                                        use certain web browser and opt-out options discussed in this Privacy Policy to limit the personal information you provide to us or our third-party partners
                                        (please see Section 4 &ldquo;Does Mediafirewall collect personal information automatically?&rdquo;, Section 6 &ldquo;When and how does Mediafirewall share my
                                        personal information with others?&rdquo; and Section 10 &ldquo;Communication Preferences and Subscriptions&rdquo;),
                                    </li>
                                    <li>log into the appropriate Website or Service and contact us through the Support Center,</li>
                                    <li>follow the unsubscribe instructions included in emails,</li>
                                    <li>access the email preferences in your account settings page in the Services user interface dashboard, or</li>
                                    <li>send us an email at the address provided in the Contact Information section above.</li>
                                </ul>
                                <p>
                                    <b>Right to Submit Complaints or Report Abuse</b>
                                </p>
                                <p>
                                    You also have the right to lodge a complaint with a supervisory authority, particularly in your country of residence, if you believe that the processing of your
                                    personal information violates applicable laws.
                                </p>
                                <p>
                                    To report abuse, please contact us by email at{" "}
                                    <a href="mailto:support@mediafirewall.ai" title="Support Mediafirewall Email">
                                        support@mediafirewall.ai
                                    </a>
                                    .
                                </p>
                                <h3 className="text lg">8. Subscriber Data Submitted to Our Services or Collected Through Our Services (On Behalf of Our Subscribers)</h3>
                                <p>
                                    Mediafirewall subscribers electronically submit (or cause to be submitted) data to the Services for analysis, moderation, and related processing. Mediafirewall
                                    processes data only as provided in our subscription agreements with our subscribers, such as our Terms of Service available at{" "}
                                    <a href="https://www.mediafirewall.ai/terms-of-use">https://www.mediafirewall.ai/terms-of-use</a>.
                                </p>
                                <p>
                                    As subscribers (or, in some cases, their internet clients or end users) control the data to be processed, Mediafirewall&apos;s network, platform, and Services may
                                    be used as a conduit for information.
                                </p>
                                <p>
                                    The use of personal information collected through our Services at the direction of our subscribers shall be limited to the purpose of providing the Services for
                                    which the subscriber has engaged Mediafirewall.
                                </p>
                                <p>
                                    Although Mediafirewall collects personal information related to subscriber personnel as they configure a subscriber’s use of our Services, Mediafirewall has no
                                    direct relationship with individuals whose personal information is hosted or transmitted through the Services by subscribers or their permitted internet clients or
                                    end users. Subscribers are responsible for complying with any regulations or laws that require providing notice, disclosure, and/or obtaining consent prior to
                                    transferring the data to Mediafirewall for processing purposes.
                                </p>
                                <p>
                                    Mediafirewall also collects, uses, and discloses personal information of individuals who visit our Websites (“Visitors”) and individual representatives of our
                                    subscribers, suppliers, and business partners (“Business Contacts”). This Section 8 does not apply to personal information associated with Visitors and Business
                                    Contacts collected, stored, and processed by Mediafirewall which are governed by the other provisions of this Privacy Policy.
                                </p>
                                <p>
                                    <b>Sub-processor Accountability</b>
                                </p>
                                <p>
                                    Mediafirewall is responsible for the processing of personal information it receives and subsequently transfers to a third party acting as an agent on its behalf in
                                    accordance with our subscription agreements. Mediafirewall may use third-party service providers, contractors, and sub-processors from time to time to assist in
                                    providing the Services on our behalf. Mediafirewall maintains contracts with these third parties restricting their access, use, and disclosure of personal
                                    information.
                                </p>
                                <p>
                                    <b>Subscriber Data Integrity and Purpose Limitation</b>
                                </p>
                                <p>
                                    As a data processor, Mediafirewall hosts, transmits, discloses, and processes data, which may include personal information about EU personnel of our subscribers
                                    administering, using, or supporting the Services. Mediafirewall may process data to provide the Services, to prevent or address technical or service problems, to
                                    follow the instructions of our subscribers and their personnel who submitted the personal information, or in response to contractual or legal requirements.
                                    Mediafirewall does not control or own the data submitted by its subscribers or their internet clients or end users to the Services. Mediafirewall may share personal
                                    information with its subsidiaries, contractors, or third parties if Mediafirewall undergoes a business transaction, such as a merger, acquisition by another
                                    company, or sale of all or substantially all of its assets.
                                </p>
                                <p>
                                    <b>Data Subject Rights to Subscriber Data</b>
                                </p>
                                <p>
                                    Mediafirewall acknowledges that you have the right to access your personal information. Mediafirewall has no direct relationship with the individuals whose personal
                                    information our Services process on behalf of our subscribers. An individual who seeks access, or who seeks to correct, amend, or delete inaccurate personal
                                    information should direct his or her query to the appropriate subscriber (i.e., the data controller). Subscribers have the ability to fulfill these requests, and
                                    Mediafirewall will provide assistance for requests that subscribers are not able to complete. If the subscriber requests that Mediafirewall remove the personal
                                    information, we will refer your request to the applicable subscriber, and we will respond to the request within 30 days.
                                </p>
                                <p>
                                    <b>Subscriber Data Retention</b>
                                </p>
                                <p>
                                    Mediafirewall retains the personal information we process on behalf of our subscribers for as long as needed to provide the Services to our subscribers and in
                                    accordance with our subscription agreements. To the extent not deleted by our subscribers, Mediafirewall may also retain and use certain personal information for a
                                    reasonable period of time thereafter as necessary to pursue our legitimate business interests, conduct audits, comply with our legal obligations, resolve disputes,
                                    and enforce our agreements.
                                </p>
                                <h3 className="text lg">9. Changes to this Privacy Policy</h3>
                                <p>
                                    Mediafirewall reserves the right to modify this Privacy Policy at any time. Changes and clarifications will take effect immediately upon their posting on the
                                    website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we
                                    use it, and under what circumstances, if any, we use and/or disclose it.
                                </p>
                                <p>
                                    It is your responsibility to review this Privacy Policy periodically for updates or changes. By continuing to access or use our Services after those changes become
                                    effective, you agree to be bound by the revised Privacy Policy.
                                </p>
                                <h3 className="text lg">10. Contact Information</h3>
                                <p>If you have any questions about this Privacy Policy, the practices of Mediafirewall, or your dealings with our Services, you can contact us at:</p>
                                <p>
                                    <b>Email:</b>{" "}
                                    <a href="mailto:support@mediafirewall.ai" title="Support Mediafirewall Email">
                                        support@mediafirewall.ai
                                    </a>
                                </p>
                                <p>
                                    <b>Phone:</b>{" "}
                                    <a href="tel:+919900119968" title="Support Mediafirewall Contact">
                                        +91 99001 19968
                                    </a>
                                </p>
                                <p>
                                    <b>Postal Mail:</b>
                                    MillionVisions PVT LTD.
                                    <br />
                                    Attn: Privacy Matters
                                    <br />
                                    Hustlehub Tech Park - #36/5,
                                    <br />
                                    Somasandra Palya, Haralukunte
                                    <br />
                                    Village, Sector2, <br /> adjacent 27th MainRoad,
                                    <br /> HSR Layout, Bengaluru
                                    <br />
                                </p>
                                <p>This Privacy Policy was last updated on 01-12-2023.</p>
                                <h3 className="text lg">11 Miscellaneous</h3>
                                <p>
                                    If any provision of this Privacy Policy is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so
                                    that this Privacy Policy will otherwise remain in full force and effect and enforceable.
                                </p>
                                <p>
                                    This Privacy Policy constitutes the entire agreement between you and Mediafirewall concerning the subject matter herein and supersedes all prior and contemporaneous
                                    negotiations, understandings, and agreements, whether oral or written, between the parties.
                                </p>
                                <h3 className="text lg">12. Changes to this Privacy Policy</h3>
                                <p>
                                    Mediafirewall reserves the right to amend or update this Privacy Policy at any time. Any changes will be effective immediately upon the posting of the revised
                                    Privacy Policy on our Websites. Your continued use of our Services, Websites, or participation in Marketing Activities after the posting of any changes indicates
                                    your acceptance of those changes.
                                </p>
                                <p>
                                    It is your responsibility to review this Privacy Policy periodically to stay informed about how we are collecting, using, and protecting your personal information.
                                </p>
                                {/* 
                            <h3>9. Communication Preferences and Subscriptions</h3>
                            <p>
                                Mediafirewall offers visitors of its Websites and Services, personnel of our subscribers whose personal information is collected through our Websites or Services, and
                                attendees or recipients of Marketing Activities a means to choose how we use the information provided.
                            </p>
                            <h3>10. Children under the age of 13</h3>
                            <p>
                                Our Websites and Services are not intended for children under 13 years old. No one under age 13 years old may provide any personal information to or on the Websites and
                                Services.
                            </p>
                            <p>
                                We do not knowingly collect personal information from children under 13 years old. If you are under 13 years old, do not use or provide any information on our Websites
                                or Services including on or through any of their features, register on the Websites or Services, make any purchases through the Websites or Services, use any of the
                                interactive or public comment features of our Websites or Services, or provide any information about yourself to us, including your name, address, telephone number,
                                email address, or any screen name or user name you may use. If we learn we have collected or received personal information from a child under 13 years old, we will
                                delete that information without undue delay.
                            </p>
                            <p>
                                If you believe we might have any information from or about a child under 13 years old, please contact us using the information in the “Contact Information” section
                                above.
                            </p>
                            <h3 className="text lg">11. Modifications</h3>
                            <p>
                                Mediafirewall reserves the right to modify this Privacy Policy at any time. It is our policy to post any changes we make to this Privacy Policy on this page and the
                                changes will be effective upon Mediafirewall's publication of the updated Privacy Policy except as described below. If Mediafirewall makes material changes to how we
                                treat your personal information, we will notify you by email (sent to the email address specified in your account) or by means of a notice on this page thirty (30) days
                                prior to the change becoming effective. However, changes made to comply with applicable laws will be effective immediately. You are responsible for ensuring we have an
                                up-to-date email address for you and periodically visiting this page to check for any changes to our Privacy Policy. Your continued use of the Websites and the Services
                                expressly indicates your acceptance of Mediafirewall's then-current Privacy Policy and your consent to Mediafirewall's collection of personal information in accordance
                                with the then-current Privacy Policy.
                            </p>
                            <p>
                                If you have questions or concerns about this Privacy Policy, please contact Mediafirewall using the information in the “Contact Information” section above. The date
                                this Privacy Policy was last revised is identified at the top of the page.
                            </p> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ContentPage;
