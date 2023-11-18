import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useAuth } from "@/contexts/AuthContext";
import { getUserDetails } from "@/store/auth.slice";
import { getAllHeaderDataOptions } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./header.module.scss";

export default function HeaderTop() {
    const router = useRouter();
    const userDetails = useAppSelector(getUserDetails);
    console.log("userDetails: ", userDetails);
    console.log("userDetails: profileInfo", userDetails?.userDetails?.profileInfo);
    const headerData = useAppSelector(getAllHeaderDataOptions);
    const isActiveLink = (href) => {
        const { pathname } = router;
        return pathname === href;
    };
    const { logout, user } = useAuth();
    const handleFeatureCardOnClick = (feature, id) => {
        if (!feature.active) {
            newInfoAlert(
                "Personalized Feature Activation",
                "If you'd like to activate this feature for your account, please get in touch with us via email, and we'll take care of it for you.",
                "Okay"
            );
        } else {
            let selectedFeature = {
                selectedFeatureIds: [feature.webFeatureKey],
                selectedOptions: {},
            };
            if (feature.options && feature.options.length > 0) {
                selectedFeature = {
                    ...selectedFeature,
                    selectedOptions: {
                        [feature.webFeatureKey]: feature.options[0].name,
                    },
                };
            }
            localStorage.setItem("selectedDataForDemo", JSON.stringify(selectedFeature));
            router.push(`/network-blog?key=${id}`);
        }
    };
    // const { locales } = useRouter();
    return (
        <>
            {["lg"].map((expand, index) => (
                <Navbar key={expand + index} expand={expand} fixed="top" className={styles.mdf__top_navbar}>
                    <Container fluid="md">
                        <Link href="/">
                            <Navbar.Brand>
                                <Image className="mdf__logo_modal" layout="fill" src="/images/logo.png" alt="A globe icon with filter and text." />
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls={`offcanvasNavbarMediaFirewall-expand-lg`} />
                        <Navbar.Offcanvas id={`offcanvasNavbarMediaFirewall-expand-lg`} aria-labelledby={`offcanvasNavbarMediaFirewallLabel-expand-lg`} placement="start">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarMediaFirewallLabel-expand-lg`}>Media Firewall</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <NavDropdown title="Products" id="navbarScrollingDropdown">
                                        {headerData &&
                                            headerData?.map((headerOption, index) => (
                                                <NavDropdown
                                                    style={{ width: "100%" }}
                                                    title={
                                                        <span style={{ width: "100%" }}>
                                                            <OverlayTrigger
                                                                key={index}
                                                                placement="left"
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${index}`}>
                                                                        Example: <br />
                                                                        {headerOption?.examples.join(", ")}
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <i className="fa fa-info-circle mr-6" aria-hidden="true"></i>
                                                            </OverlayTrigger>
                                                            <span className="ml-5">{headerOption.name}</span>
                                                        </span>
                                                    }
                                                    id={`nested-dropdown-${index}`}
                                                    key={`nested-dropdown-${index}`}
                                                    drop="end"
                                                >
                                                    {CommonUtility.isValidArray(headerOption.features) &&
                                                        headerOption.features.map((feature, featureIndex) => {
                                                            return (
                                                                <a
                                                                    key={featureIndex}
                                                                    onClick={() => handleFeatureCardOnClick(feature, headerOption.id)}
                                                                    className={`nav-link sub-features`}
                                                                    style={{ lineHeight: "16px", fontSize: "14px" }}
                                                                    // className={`nav-link ${isActiveLink(`/network-blog?key=${feature.id}`) ? "nav-active" : ""}`}
                                                                >
                                                                    {feature.name}
                                                                </a>
                                                            );
                                                        })}
                                                </NavDropdown>
                                            ))}
                                    </NavDropdown>
                                    <Link href="/pricing" className={`nav-link ${isActiveLink("/pricing") ? "nav-active" : ""}`}>
                                        Pricing
                                    </Link>

                                    {/* <Link href="/documents-and-media" className={`nav-link`}>
                    Documentation & Media
                  </Link> */}
                                    {/* {userDetails?.isLoggedIn && ( */}
                                    <Link href="/network-blog" className={`nav-link ${isActiveLink("/network-blog") ? "nav-active" : ""}`}>
                                        Demo
                                    </Link>
                                    <Link href="/contact-us" className={`nav-link ${isActiveLink("/contact-us") ? "nav-active" : ""}`}>
                                        Contact
                                    </Link>
                                    {/* )} */}

                                    {!userDetails?.isLoggedIn && (
                                        <Link href="/account-security/login" className={`nav-link ${isActiveLink("/account-security/login") ? "nav-active" : ""}`}>
                                            Log In
                                        </Link>
                                    )}

                                    {/* <div>
                    {[...locales].sort().map((locale) => (
                      <Link
                        key={locale}
                        href="/"
                        locale={locale}
                        style={{ marginRight: "10px" }}
                      >
                        {locale}
                      </Link>
                    ))}
                  </div> */}
                                </Nav>

                                {!userDetails?.isLoggedIn ? (
                                    <Button
                                        variant="outline-primary"
                                        className={`rounded-pill fw-bold border-2 m-0${isActiveLink("/account-security/signup") ? "nav-active" : ""}`}
                                        onClick={() => router.push("/account-security/signup")}
                                    >
                                        Create Account
                                    </Button>
                                ) : (
                                    <>
                                        <Dropdown className="mfw_user_dropdown">
                                            <Dropdown.Toggle as={"div"} className="d-flex align-items-center">
                                                <div className="mfw__user_wrapper">
                                                    <span>{userDetails?.userDetails?.profileInfo?.text}</span>
                                                    {/* <span>
                                                        <>
                                                            <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm.094 4.5a3.375 3.375 0 1 1 0 6.75 3.375 3.375 0 0 1 0-6.75ZM12 20.25a8.23 8.23 0 0 1-6.055-2.653C6.359 15.45 10.08 15 12 15s5.64.45 6.055 2.596A8.228 8.228 0 0 1 12 20.25Z"></path>
                                                            </svg>
                                                        </>
                                                    </span> */}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="nav__dropdown_toggle">
                                                <h6 style={{ padding: "4px 16px", color: "#7b5b9e" }}>{user?.userDetails?.fullName}</h6>
                                                <NavDropdown.Divider />
                                                {/* <Dropdown.Item as={Link} href="/contact-us">
                          Settings
                        </Dropdown.Item> */}
                                                <Dropdown.Item onClick={() => router.push("/account")}>Account</Dropdown.Item>
                                                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                )}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}
