import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import { AuthContext } from "@/pages/_app";
import { localStorageKeys } from "@/utils/constants";
import { eraseCookie } from "@/utils/cookieCreator";

export default function HeaderTop({ headerData }) {
  const router = useRouter();
  const { isLogin, handleLogout } = useContext(AuthContext);

  const handleOnClickLogout = () => {
    eraseCookie(localStorageKeys.authKey);
    localStorage.clear();
    handleLogout();
    router.push("/");
  };
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          fixed="top"
          className="mdf__top_navbar"
        >
          <Container>
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
                      headerData?.map((data) => {
                        return (
                          <NavDropdown
                            title={data.name}
                            id="nested-dropdown"
                            key={data?.id}
                          >
                            {data?.examples &&
                              data?.examples?.map((example, index) => {
                                return (
                                  <NavDropdown.Item
                                    href={
                                      isLogin
                                        ? "/network-blog"
                                        : "/account-security/login"
                                    }
                                    key={index}
                                  >
                                    {example}
                                  </NavDropdown.Item>
                                );
                              })}
                          </NavDropdown>
                        );
                      })}
                  </NavDropdown>
                  <Link href="/pricing" className="nav-link">
                    Pricing
                  </Link>
                  <Link href="/" className="nav-link">
                    Documentation
                  </Link>
                  {!isLogin && (
                    <Link href="/account-security/login" className="nav-link">
                      Log In
                    </Link>
                  )}
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
                    onClick={() => handleOnClickLogout()}
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
