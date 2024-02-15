import { useRouter } from "next/router";

import VideoModal from "@/components/VideoModal";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { useServiceStatus } from "@/contexts-v2/serviceStatusContext";
import { getUserDetails } from "@/store/auth.slice";
import { getAllHeaderDataOptions } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import Link from "next/link";
import * as numberToWords from "number-to-words";
import { useEffect, useState } from "react";
import { Button, Dropdown, Image, NavDropdown, Navbar } from "react-bootstrap";

import { newInfoAlert } from "@/utils/toastMessage.utils";
import styles from "./headerV2.module.scss";

export default function HeaderTopV2() {
    const router = useRouter();
    const { isServiceAvailable } = useServiceStatus();

    const userDetails = useAppSelector(getUserDetails);
    const headerData = useAppSelector(getAllHeaderDataOptions);
    const isActiveLink = (href) => {
        const { pathname } = router;
        return pathname === href;
    };
    const [isShowVideoModel, setIsShowVideoModel] = useState(false);
    const [selectedMediaContent, setSelectedMediaContent] = useState(null);
    const [selectedHeader, setSelectedHeader] = useState(null);

    useEffect(() => {
        if (!isShowVideoModel) setSelectedMediaContent(null);
    }, [isShowVideoModel]);

    useEffect(() => {
        headerData.length > 0 && setSelectedHeader(headerData[0]);
    }, [headerData]);

    const { logout, user, isLogin } = useAuthV3();
    const handleFeatureCardOnClick = (feature, id) => {
        if (!feature.active) {
            setSelectedMediaContent(feature);
            if (feature.webFeatureKey === "deepfake" || feature.featureId == "134") {
                newInfoAlert("Coming Soon", "", "Preview", "").then(() => {
                    setIsShowVideoModel(true);
                });
                return;
            }

            newInfoAlert(
                "Enterprise Feature",
                "Your request for the enterprise feature is appreciated; however, it's not enabled by default. Would you be interested in a live demonstration?",
                "Schedule a live demo",
                "",
                true,
                "Preview"
            )
                .then(() => {
                    if (isLogin) {
                        if (user?.meetingSurveyAnswered) {
                            router.push("/book-demo?type=DEMO");
                        } else {
                            router.push("/schedule-demo");
                        }
                    } else {
                        router.push("/account-security/login");
                    }
                })
                .catch(() => {
                    setIsShowVideoModel(true);
                });
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
            router.push(`/features-list?key=${id}`);
            document.body.click();
        }
    };
    useEffect(() => {
        if (!isLogin) {
            logout();
        }
    }, []);

    const numberToString = (number) => {
        return numberToWords.toWords(number);
    };
    // const { locales } = useRouter();
    return (
        <>
            {["lg"].map((expand, index) => (
                <nav key={expand + index} expand={expand} className="navbar navbar-expand-lg navbar-light bg-white navbar-light fixed-top shadow">
                    <div className="container ">
                        <Link href="/" title="Mediafirewall">
                            <Navbar.Brand>
                                <Image className="mdf__logo_modal" layout="fill" src="/images/logo.png" alt="mediafirewall logo" title="mediafirewall logo" />
                            </Navbar.Brand>
                        </Link>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content">
                            <div className="hamburger-toggle">
                                <div className="hamburger">
                                    <span className="navbar-toggler-icon"></span>
                                </div>
                            </div>
                        </button>
                        <div className={`collapse navbar-collapse`} id="navbar-content">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-3">
                                <li className="nav-item dropdown  dropdown-mega position-static">
                                    <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                        Products
                                    </Link>
                                    <div className={`dropdown-menu shadow container mega-content p-0 ${styles.megaMenuProduct}`}>
                                        <div className="row g-3 g-md-0 g-lg-0">
                                            {/* Mobile layout */}
                                            <div className="col-12 d-block d-sm-none">
                                                {/* Render a single column for mobile */}
                                                <ul className="nav flex-column">
                                                    {headerData &&
                                                        headerData?.map((headerOption, index) => (
                                                            <li
                                                                key={index}
                                                                className={`nav-item  ${styles.purpleToWhiteGradient_mobileview} ${
                                                                    selectedHeader && headerOption.id === selectedHeader.id ? styles.purpleToWhiteGradient_mobileview_active : ""
                                                                }`}
                                                            >
                                                                <div>
                                                                <a className={`dropdown-toggle ${styles.menuLink_mobileview}`} onClick={() => setSelectedHeader(headerOption)}>
                                                                    {headerOption.name}
                                                                </a>
                                                                </div>
                                                                {selectedHeader && selectedHeader.id === headerOption.id && (
                                                                    <div className="row">
                                                                        {selectedHeader.features &&
                                                                            selectedHeader.features.map(
                                                                                (feature, featureIndex) =>
                                                                                    feature.active && (
                                                                                        <div key={featureIndex} className="col-12">
                                                                                            <a
                                                                                                className={`nav-link ${styles.subFeatures_mobileview}`}
                                                                                                title={feature.name}
                                                                                                onClick={() => {
                                                                                                    handleFeatureCardOnClick(feature, selectedHeader.id);
                                                                                                }}
                                                                                            >
                                                                                                {feature.name}
                                                                                            </a>
                                                                                        </div>
                                                                                    )
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>

                                            {/* Desktop layout */}
                                            <div className="col-12 col-sm-6 col-md-3 border-end d-none d-sm-block">
                                                <ul className="nav flex-column" id="left-tabs-example">
                                                    {headerData &&
                                                        headerData?.map((headerOption, index) => (
                                                            <ul key={index} className="nav flex-column" id={`left-tabs-example-${index}`}>
                                                                <li
                                                                    className={`nav-item ${styles.purpleToWhiteGradient} ${
                                                                        selectedHeader && headerOption.id === selectedHeader.id ? styles.purpleToWhiteGradient_active : ""
                                                                    }`}
                                                                >
                                                                    <div>
                                                                        <a
                                                                            className={styles.menuLink}
                                                                            id={`${numberToString(headerOption.id)}-tab`}
                                                                            onClick={() => {
                                                                                setSelectedHeader(headerOption);
                                                                            }}
                                                                        >
                                                                            <div>
                                                                                <a className={`nav-link ${styles.navLinkStyle}`} data-bs-toggle="pill">
                                                                                    {headerOption.name}
                                                                                </a>
                                                                                <p className={styles.navExample} data-bs-toggle="pill">
                                                                                    {`eg. ${headerOption?.examples.join(", ")}`}
                                                                                </p>
                                                                            </div>

                                                                            <div className={styles.subMenuSelectImage}>
                                                                                <Image
                                                                                    src="/images/svgs/submenuSelectIcon.svg"
                                                                                    alt="submenuSelectIcon"
                                                                                    loading="lazy"
                                                                                    className="lazyload"
                                                                                    style={{
                                                                                        width: "6px",
                                                                                        height: "10px",
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        ))}
                                                </ul>
                                            </div>

                                            <div class="col-12 col-sm-6 col-md-9 d-none d-sm-block">
                                                <div class="tab-content">
                                                    {selectedHeader && (
                                                        <div id={`${numberToString(selectedHeader.id)}`}>
                                                            <div className="row">
                                                                {selectedHeader.features &&
                                                                    selectedHeader.features.map(
                                                                        (feature, featureIndex) =>
                                                                            feature.active && (
                                                                                <div key={featureIndex} className="col-6 col-md-3">
                                                                                    <a
                                                                                        className={`nav-link ${styles.subFeatures}`}
                                                                                        title={feature.name}
                                                                                        onClick={() => {
                                                                                            handleFeatureCardOnClick(feature, selectedHeader.id);
                                                                                        }}
                                                                                    >
                                                                                        {feature.name}
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <Link href="/pricing" title="Pricing" className={`nav-link ${isActiveLink("/pricing") ? "nav-active" : ""}`}>
                                        Pricing
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/documents-and-media" className={`nav-link ${isActiveLink("/documents-and-media") ? "nav-active" : ""}`}>
                                        Documentation & Media
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/features-list" title="Demo" className={`nav-link ${isActiveLink("/features-list") ? "nav-active" : ""}`}>
                                        Demo
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/contact-us" title="Contact Us" className={`nav-link ${isActiveLink("/contact-us") ? "nav-active" : ""}`}>
                                        Contact
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {!userDetails?.isLoggedIn && (
                                        <Link href="/account-security/login" title="Mediafirewall Login" className={`nav-link ${isActiveLink("/account-security/login") ? "nav-active" : ""}`}>
                                            Log In
                                        </Link>
                                    )}
                                </li>
                            </ul>
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
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="nav__dropdown_toggle">
                                            <h6 style={{ padding: "4px 16px", color: "#7b5b9e" }}>{user?.userDetails?.fullName}</h6>
                                            <NavDropdown.Divider />
                                            <Dropdown.Item onClick={() => router.push("/account")}>Account</Dropdown.Item>
                                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            ))}
            {selectedMediaContent && isShowVideoModel && (
                <VideoModal
                    show={isShowVideoModel}
                    handleClose={setIsShowVideoModel}
                    videoUrl={CommonUtility.isNotEmpty(selectedMediaContent?.clipUrl) ? selectedMediaContent?.clipUrl : "https://www.youtube.com/embed/nafYaz7caGQ?si=vQKekrtF7fNITp4d"}
                    posterImage={selectedMediaContent?.imgUrl || ""}
                />
            )}
        </>
    );
}
