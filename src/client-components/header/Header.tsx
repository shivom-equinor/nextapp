"use client";

import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import AccountDropdown from "./AccountDropdown";
import Logo from "./Logo";
import { ws, z } from "../../styles/constants";
import MegaMenu from "./megamenu/MegaMenuSection";
import ExpandSearch from "./ExpandSearch";
import { getUserDetails } from "../../api/technologyAPIs";
import { IUserDetails } from "@/api/models";

interface HeaderProps {
  userDetails: unknown;
}

const StyledHeader = styled.header`
  background-color: white;
  z-index: ${z.mainHeader};
  position: relative;
`;

const HeaderContent = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin-bottom: 0;
`;

const MainNav = styled.div`
  display: flex;
  align-self: stretch;
`;

const CenteredLi = styled.li`
  display: flex;
  align-items: center;
  padding: 0 ${ws.padding};
`;

const ConnectedHeader: React.FunctionComponent<HeaderProps> = ({
  userDetails,
}) => {
  const [showMainNav, setShowMainNav] = useState(true);
  const [childUserDetails, setUserDetails] = useState(null);
  const history = useRouter();
  const HideMainNavOnURL: string[] = [
    "audit-report",
    "trl4-preview-document",
    "trl7-preview-document",
    "trl4-decision-document",
    "trl7-decision-document",
    "view-one-pager",
    "risk-matrix-list-view",
  ];

  useEffect(() => {
    setShowMainNav(
      !HideMainNavOnURL.includes(
        window.location.pathname.split("/").filter((path) => path)[0]
      )
    );
  }, []);

  // useEffect(() => {
  //   getUserDetails().then((data: any) => {
  //     console.log(data);
  //     setUserDetails(data);
  //   });
  // }, []);

  // if (!childUserDetails) return "Loading...";

  return (
    <StyledHeader>
      <nav className="container">
        <HeaderContent>
          <li>
            <Logo isClickable={showMainNav} />
          </li>
          {showMainNav && (
            <MainNav>
              <CenteredLi>
                <ExpandSearch />{" "}
              </CenteredLi>
              <li>
                <AccountDropdown user={userDetails as IUserDetails} />
              </li>
              <li>
                <MegaMenu history={history} />
              </li>
            </MainNav>
          )}
        </HeaderContent>
      </nav>
    </StyledHeader>
  );
};

const Header = ConnectedHeader;
// Using React.memo for memoizing the Header component which mount only on first load and when update need in this.
export default memo(Header);
