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
import { localStorageKeys } from "@/constants/global.constants";
import { eraseCookie } from "@/utils/cookieCreator";

import styles from "./header.module.scss";
import { getAllHeaderDataOptions } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";

export default function HeaderTop() {
  const router = useRouter();
  const { isLogin, logout } = useAuth();
  const headerData = useAppSelector(getAllHeaderDataOptions);

  const handleLogout = () => {
    eraseCookie(localStorageKeys.authKey);
    localStorage.clear();
    logout();
    router.push("/");
  };

  const { locales } = useRouter();
  return (
    <>
      {["lg"].map((expand, index) => (
        <Navbar
          key={expand + index}
          expand={expand}
          fixed="top"
          className={styles.mdf__top_navbar}
        >
          <Container fluid="md">
            <Link href="/">
              <Navbar.Brand>
                <Image
                  className="mdf__logo_modal"
                  layout="fill"
                  src="/images/logo.png"
                  alt="A globe icon with filter and text."
                />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbarMediaFirewall-expand-lg`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbarMediaFirewall-expand-lg`}
              aria-labelledby={`offcanvasNavbarMediaFirewallLabel-expand-lg`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarMediaFirewallLabel-expand-lg`}
                >
                  Media Firewall
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown title="Products" id="navbarScrollingDropdown">
                    {headerData &&
                      headerData?.map((data, index) => (
                        <NavDropdown
                          title={data.name}
                          id={`nested-dropdown-${index}`}
                          key={`nested-dropdown-${index}`}
                          drop="end"
                        >
                          {CommonUtility.isValidArray(data?.examples) &&
                            data?.examples?.map((example, index) => (
                              <Link
                                key={example + index}
                                href="/network-blog"
                                className="nav-link"
                              >
                                {example}
                              </Link>
                            ))}
                        </NavDropdown>
                      ))}
                  </NavDropdown>
                  <Link href="/pricing" className="nav-link">
                    Pricing
                  </Link>
                  {/* <Link href="/" className="nav-link">
                    Documentation
                  </Link> */}
                  {isLogin && (
                    <>
                      <Link href="/network-blog" className="nav-link">
                        Demo
                      </Link>
                      <Link href="/survey" className="nav-link">
                        Survey
                      </Link>
                    </>
                  )}

                  {!isLogin && (
                    <Link href="/account-security/login" className="nav-link">
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

                {!isLogin ? (
                  <Button
                    variant="outline-primary"
                    className="rounded-pill fw-bold border-2"
                    onClick={() => router.push("/account-security/signup")}
                  >
                    Create Account
                  </Button>
                ) : (
                  <Button
                    variant="outline-primary"
                    className="rounded-pill fw-bold border-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
