import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import style from "@/components/Auth/auth.module.scss";
import { useRouter } from "next/router";

function BoxContainerWithFilterIconWrapper({ children, lg = 12, xl = 7, xxl = 6 }) {
    const router = useRouter()
    return (
        <section className={style.mdf__authpage__section}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} xl={10}>
                        <Row className={`${style.mdf__authpage__blocks} justify-content-center justify-content-xl-between`}>
                            <Col lg={3} xl={5} className="ps-0 align-self-center d-none d-xl-block">
                                <Image className={style.mdf__logo_auth} layout="fill" src="/images/auto_logo.png" alt="" />
                            </Col>
                            <Col lg={lg} xl={xl} xxl={xxl}>
                                <div className="min-h-50v">

                                    <div className="d-flex align-items-center">
                                        <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
                                            <svg
                                                width="46"
                                                height="46"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M11.69 15.75 7.969 12l3.72-3.75"></path>
                                                <path d="M8.486 12h7.546"></path>
                                                <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"></path>
                                            </svg>
                                        </div>
                                        <Image className="mx-3 mdf__logo_footer" layout="fill" src="/images/logo.png" alt="" />
                                    </div>
                                    {children}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default BoxContainerWithFilterIconWrapper;
