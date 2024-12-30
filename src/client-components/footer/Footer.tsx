"use client";

import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";

import {
  backgrounds,
  whitespace,
  colors,
  numericValue,
} from "../../styles/constants";
import Link from "../_shared/links/Link";
import logo from "../../styles/assets/img/equinor-logo.svg";
import { remCalc } from "../../styles/functions";

const FooterContent = styled.footer`
  background-color: ${backgrounds.dark};
`;

const FooterHeading = styled.h6`
  color: #ffffff;
`;

const FooterTop = styled(Container)`
  padding-top: ${whitespace.l};
  padding-bottom: ${whitespace.l};
`;

const FooterBottom = styled(Row)`
  background-color: #ffffff;
  margin: 0 auto;
`;

const FooterLink = styled(Link)`
  color: ${colors.slateBlue.sb50};
  font-weight: ${numericValue.value500};

  :hover {
    color: ${colors.slateBlue.sb50};
  }
`;

const StyledLogo = styled(logo)`
  margin-right: ${whitespace.xl};
  margin-top: ${remCalc(26)};
  margin-bottom: ${remCalc(26)};
  float: right;
`;

const footerLinks = {
  firstColumn: [
    {
      url: "https://statoilsrm.sharepoint.com/sites/TrainingPortalTDIco-lab/SitePages/Frequently%20asked%20questions.aspx",
      title: "FAQ",
      isExternal: true,
    },
    {
      url: "https://statoilsrm.sharepoint.com/sites/TrainingPortalTDIco-lab",
      title: "Help & training",
      isExternal: true,
    },
    {
      url: "https://equinor.service-now.com/selfservice?id=sc_cat_item&sys_id=b29ff7ce6fb455001f6446916e3ee416",
      title: "Support",
      isExternal: true,
    },
  ],
  secondColumn: [
    {
      url: "https://aris.equinor.com/#default/item/c.L3ProcessClusterMap.Production.XK7cIP_2EeZmCQBQVrsUrw.-1/~AYBbIm1vZGVsVmlld2VyNCJd",
      isExternal: true,
      title: "ARIS",
    },
    {
      url: "https://statoilsrm.sharepoint.com/sites/TrainingPortalTDIco-lab/SitePages/co-lab-release-notes.aspx",
      isExternal: true,
      title: "Release notes",
    },
  ],
};

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  const HideFooterOnURL: string[] = [
    "audit-report",
    "trl4-preview-document",
    "trl7-preview-document",
    "trl4-decision-document",
    "trl7-decision-document",
    "view-one-pager",
    "risk-matrix-list-view",
  ];

  useEffect(() => {
    setShowFooter(
      !HideFooterOnURL.includes(
        window.location.pathname.split("/").filter((path) => path)[0]
      )
    );
  }, []);

  return (
    <>
      {showFooter && (
        <FooterContent>
          <FooterTop>
            <Row>
              <Col lg={4}>
                <ul>
                  <li>
                    <FooterHeading>co-lab help and support</FooterHeading>
                  </li>
                  {footerLinks.firstColumn.map((footerLink, index) => (
                    <li key={index}>
                      <FooterLink
                        to={footerLink.url}
                        children={footerLink.title}
                        external={footerLink.isExternal}
                      />
                    </li>
                  ))}
                </ul>
              </Col>
              <Col lg={4}>
                <ul>
                  <li>
                    <FooterHeading>External links</FooterHeading>
                  </li>
                  {footerLinks.secondColumn.map((footerLink, index) => (
                    <li key={index}>
                      <FooterLink
                        to={footerLink.url}
                        children={footerLink.title}
                        external={footerLink.isExternal}
                      />
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </FooterTop>
          <FooterBottom>
            <Container>
              <StyledLogo />
            </Container>
          </FooterBottom>
        </FooterContent>
      )}
    </>
  );
};

// Using React.memo for memoizing the Footer component which mount only on first load.
// Note:- This component contains static data only so can mount only once.
export default memo(Footer);
