"use client";

import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import AccountDropdown from "./AccountDropdown";
import Logo from "./Logo";
import { ws, z } from "../../styles/constants";
import MegaMenu from "./megamenu/MegaMenuSection";
import ExpandSearch from "./ExpandSearch";
import { getUserDetails } from "@/api/technologyAPIs";
import { useFetchingQuery } from "@/app/react-query/reactQueryUtils";

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

  // Use the custom query hook to fetch user details
  const {
    data: childUserDetails,
    isLoading,
    error,
  } = useFetchingQuery({
    queryKey: ["userDetails"], // Unique key for the query
    queryFn: getUserDetails, // Fetch function
    staleTime: 24 * 60 * 60 * 1000, // Optional: cache data for 30 minutes
  });

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
                <ExpandSearch />
              </CenteredLi>
              <li>
                <AccountDropdown user={childUserDetails} />
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
// Using React.memo for memoizing the Header component which mounts only on the first load and when updates are needed.
export default memo(Header);
