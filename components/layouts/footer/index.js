import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import style from "./footer.module.scss";
import { useAppSelector } from "@/store/hooks";
import {
  getAllHeaderDataOptions,
  getAllHeaderDataOptionsUpdated,
} from "@/store/defaultConfig.slice";
import CommonUtility from "@/utils/common.utils";
import Link from "next/link";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
export default function FooterBottom() {
  const headerData = useAppSelector(getAllHeaderDataOptions);
  const headerDataV2 = useAppSelector(getAllHeaderDataOptionsUpdated);

  const router = useRouter();
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
      localStorage.setItem(
        "selectedDataForDemo",
        JSON.stringify(selectedFeature)
      );
      router.push(`/network-blog?key=${id}`);
    }
  };
  return (
    <footer className={style.mdf__footer}>
      <Container>
        <Row>
          <Col lg={3} md={6}>
            <div className="footer-menu-block">
              <div className="footer-logo-block">
                <Image
                  className="mdf__logo_footer"
                  layout="fill"
                  src="/images/footer-logo.png"
                  alt=""
                />
              </div>
              <div className={style.footer_content_text}>
                <b>Million Visions,</b>
                <br /> Hustlehub Tech Park - #36/5,
                <br /> Somasandra Palya, <br />
                Haralukunte Village, Sector2, <br /> adjacent 27th MainRoad,
                <br />
                HSR Layout, Bengaluru,
                <br /> Karnataka 560102.
              </div>
            </div>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="mt-3">Products</h5>
            <ul className="list-unstyled">
              {CommonUtility.isValidArray(headerData) &&
                headerData.map((item) => {
                  return (
                    <li
                      style={{ color: "#fff" }}
                      className="py-2"
                      key={item.id}
                    >
                      <Link href={`/network-blog?key=${item.id}`}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="mt-3">Models</h5>
            <ul className="list-unstyled">
              {CommonUtility.isValidArray(headerDataV2) &&
                CommonUtility.isValidArray(headerDataV2[0].features) &&
                headerDataV2[0].features.map((feature, index) => {
                  if (index > 4) {
                    if (index === 5) {
                      return (
                        <li
                          style={{ color: "#fff" }}
                          className="py-2"
                          key={index}
                        >
                          <Link href={`/network-blog?key=0`}>more...</Link>
                        </li>
                      );
                    }
                    return null; // Don't render additional "more..." items
                  } else {
                    return (
                      <li
                        style={{ color: "#fff" }}
                        className="py-2"
                        key={feature.id}
                        onClick={() => handleFeatureCardOnClick(feature, 0)}
                      >
                        {feature.name}
                      </li>
                    );
                  }
                })}
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="mt-3">Useful Links</h5>
            <ul className="list-unstyled">
              {/* <li style={{ color: "#fff" }} className="py-2">
                <Link href="#">About</Link>
              </li> */}
              <li style={{ color: "#fff" }} className="py-2">
                <Link href="/contact-us">Contact us</Link>
              </li>
              <li style={{ color: "#fff" }} className="py-2">
                <Link href="/pricing">Pricing</Link>
              </li>
              <li style={{ color: "#fff" }} className="py-2">
                <Link href="/network-blogs">Demo</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
