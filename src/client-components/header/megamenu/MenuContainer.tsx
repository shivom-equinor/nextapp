import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import CloseIcon from "../../../styles/assets/icons/close.svg";
import {
  colors,
  ws,
  dropshadow,
  whitespace,
  numericValue,
} from "../../../styles/constants";
import Link from "../../_shared/links/Link";
import { PrimaryButton, AddButton } from "../../_shared/buttons";
import VideoImage from "../../../styles/assets/img/mock-faq-video.png";
import { remCalc } from "../../../styles/functions";
import Image from "next/image";

export interface MegaMenuDropdownProps {
  closeMenu?: () => void;
  registerTechnology?: () => void;
}

const MenuSection = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  list-style: none;
  background-color: ${colors.mossGreen.mg10};
  width: ${numericValue.value100}%;
  max-height: 370px;
  box-shadow: ${dropshadow.standard};
  padding-top: ${ws.padding};
  padding-bottom: ${ws.margin};
  a > span {
    text-decoration: none;
  }
  a {
    display: block;
    color: ${colors.mossGreen.standard};
    text-decoration: none;
    font-weight: ${numericValue.value500};
    font-size: 1rem;
    line-height: 1.2rem;
    padding: ${whitespace.sm};

    :hover,
    :focus {
      background-color: ${colors.mossGreen.mg35};
      color: ${colors.slateBlue.standard};

      svg path {
        fill: ${colors.slateBlue.standard};
      }
    }
  }
`;

const MenuContent = styled(Row)`
  > [class*="col-"]:nth-child(3):after {
    content: "";
    background-color: ${colors.mossGreen.standard};
    position: absolute;
    top: 0;
    bottom: 0;

    @media (max-width: 767px) {
      width: ${numericValue.value100}%;
      height: ${remCalc(0.96)};
      left: 0;
      top: -${whitespace.xxs};
    }

    @media (min-width: 768px) {
      width: ${remCalc(0.96)};
      height: auto;
      left: -${remCalc(0.96)};
    }
  }

  > [class*="col-"]:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

const Menu = styled.ul`
  list-style: none;
  max-width: max-content;
`;

const MenuHeading = styled.h2`
  color: ${colors.slateBlue.standard};
  padding: ${whitespace.sm} ${whitespace.sm} ${remCalc(0)} ${whitespace.sm};
  margin-bottom: ${remCalc(0)};
`;

const MenuItem = styled.li`
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value500};
`;

const MenuItemAction = styled.div`
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value500};
  border-top: ${remCalc(0.96)} solid ${colors.mossGreen.standard};
  padding-top: ${ws.padding};
  margin-top: ${whitespace.m};
`;

const FAQVideo = styled.div`
  padding: ${ws.padding};
  padding-top: 0;
  width: ${numericValue.value400}px;
  margin: auto;
  > video {
    height: 220px;
    width: ${numericValue.value100}%;
    border: none;
  }

  > a {
    padding: ${remCalc(0)};
    width: fit-content;
    margin-bottom: ${ws.padding};
  }

  > img {
    height: 220px;
    width: ${numericValue.value100}%;
  }
`;

const StyledLink = styled(Link)`
  :hover,
  :focus {
    background-color: transparent !important;
    color: ${colors.mossGreen.dark} !important;
  }
`;

const ActionButton = styled(PrimaryButton)`
  background-color: ${colors.mossGreen.mg10};
  border-color: ${colors.mossGreen.mg10};
  border-radius: ${remCalc(0)};
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value500};

  img {
    margin-right: ${whitespace.xxs};
  }

  > svg > path {
    fill: ${colors.mossGreen.standard};
  }

  :hover,
  :focus {
    background-color: ${colors.mossGreen.mg35};
    border-color: ${colors.mossGreen.mg35};
    color: ${colors.slateBlue.standard};

    > svg > path {
      fill: ${colors.slateBlue.standard};
    }
  }
`;

const CloseButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: ${ws.paddingHalf};
`;

const StyledAddButton = styled(AddButton)`
  img {
    margin-right: ${whitespace.xxs};
  }
`;

const MenuContainer: React.FunctionComponent<MegaMenuDropdownProps> = ({
  closeMenu,
  registerTechnology,
}) => {
  const megaMenu = [
    {
      heading: "Solution",
      action: "Register technology",
      list: [
        {
          url: "/technology-list-page",
          name: "My solutions",
        },
        {
          url: "/technology-list-page",
          name: "All solutions",
        },
        {
          url: "/",
          name: "Showcases",
        },
      ],
    },
    {
      heading: "Intelligence",
      list: [
        {
          url: "/",
          name: "Reporting and analytics",
        },
      ],
    },
    {
      heading: "Help",
      list: [
        {
          url: "/",
          name: "FAQ",
        },
        {
          url: "/",
          name: "Help & training",
        },
        {
          url: "/",
          name: "Support",
        },
      ],
    },
  ];

  return (
    <MenuSection>
      <Container>
        <CloseButtonSection>
          <ActionButton icon={CloseIcon} label="Close" onClick={closeMenu} />
        </CloseButtonSection>
        <MenuContent>
          {megaMenu.map((menu, index) => (
            <Col lg={megaMenu.length - 1 === index ? 6 : 3} key={index}>
              <Menu>
                <MenuHeading>{menu.heading}</MenuHeading>
                {menu.list.map((listItem, index) => (
                  <MenuItem key={index} onClick={closeMenu}>
                    <span className="spanOnclickEVT" onClick={() => {}}>
                      <Link to={listItem.url}>{listItem.name}</Link>
                    </span>
                  </MenuItem>
                ))}
                {menu.action && (
                  <MenuItemAction>
                    <StyledAddButton
                      label={menu.action}
                      onClick={registerTechnology}
                      className="btnOnClickEVT"
                    />
                  </MenuItemAction>
                )}
              </Menu>
              {megaMenu.length - 1 === index && (
                <FAQVideo>
                  <StyledLink
                    to="https://statoilsrm.sharepoint.com/sites/TrainingPortalTDIco-lab/SitePages/Introduction-to-TDI-co-lab.aspx"
                    external={true}
                  >
                    <Image src={VideoImage} alt="FAQ" />
                  </StyledLink>
                  <StyledLink
                    to="https://statoilsrm.sharepoint.com/sites/TrainingPortalTDIco-lab/SitePages/Introduction-to-TDI-co-lab.aspx"
                    external={true}
                    withExternalIcon={true}
                  >
                    Introduction to co-lab process and tool
                  </StyledLink>
                </FAQVideo>
              )}
            </Col>
          ))}
        </MenuContent>
      </Container>
    </MenuSection>
  );
};

export default MenuContainer;
