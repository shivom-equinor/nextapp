import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

import PeopleProfileLink from "../_shared/display/PeopleProfileLink";
import ArrowDown from "../../styles/assets/icons/arrow-down-small.svg";
import {
  colors,
  ws,
  whitespace,
  z,
  dropshadow,
  numericValue,
} from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import Profile from "../../styles/assets/icons/Profile.svg";
import Link from "../_shared/links/Link";
import { IUserDetails } from "@/api/models";

interface AccountDropdownProps {
  user: IUserDetails | null;
}

const DropdownComponent = styled.div`
  height: ${numericValue.value100}%;
  max-width: ${remCalc(250)};
  position: relative;
`;

const DropdownToggle = styled.button`
  height: ${numericValue.value100}%;
  width: ${numericValue.value100}%;
  background-color: white;
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value600};
  border: none;
  border-radius: 0;
  padding: ${ws.padding};
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.5rem;
    flex-shrink: 0;
    transition: transform 0.3s ease-in-out;
  }

  :hover,
  :focus,
  &[aria-expanded="true"] {
    background-color: ${colors.slateBlue.standard};
    color: white;

    .changeable-stroke {
      stroke: white;
    }

    .changeable-fill {
      fill: white;
    }
  }

  #toggle-arrow {
    margin-left: ${whitespace.xs};
  }

  &[aria-expanded="true"] #toggle-arrow {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 70px;
  right: 0;
  z-index: ${z.dropdown};
  list-style: none;
  background-color: white;
  box-shadow: ${dropshadow.standard};
  width: ${numericValue.value100}%;
  min-width: max-content;
  li > a > span {
    text-decoration: none;
  }
  a,
  button {
    display: block;
    padding: ${whitespace.sm} 20px;
    color: ${colors.mossGreen.standard};
    text-decoration: none;
    font-weight: ${numericValue.value500};
    font-size: 1rem;
    line-height: 1.2rem;

    :hover,
    :focus {
      background-color: ${colors.mossGreen.mg35};
      color: ${colors.slateBlue.standard};
    }
  }
`;

const DefaultProfileImage = styled(Profile)`
  padding-right: ${whitespace.xs};
`;

const AccountDropdown: React.FunctionComponent<AccountDropdownProps> = ({
  user,
}) => {
  const [isopen, setisopen] = useState(false);
  const node: any = useRef(null);

  // Consider creating a separate component for handling this when
  // reusing it other places
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (node.current.contains(e.target)) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeMenu = () => {
    setisopen(false);
  };

  const toggleMenu = () => {
    setisopen(!isopen);
  };

  const getFirstName = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0];
  };

  return (
    <DropdownComponent ref={node}>
      <DropdownToggle
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isopen}
        className="add-custom-field-close"
      >
        <DefaultProfileImage />
        <span className="ellipsis">{"Shivom"}</span>
        <ArrowDown id="toggle-arrow" />
      </DropdownToggle>
      {isopen && (
        <DropdownMenu onClick={closeMenu} role="menu">
          <li role="menuitem">
            <PeopleProfileLink myProfileUrl={""} name={""} />
          </li>
          {/* For bulk update */}
          <li role="menuitem">
            <Link to="/bulk-update" prefetch={false}>
              Manage portfolio
            </Link>
          </li>
          {/* For one pagers */}
          <li role="menuitem">
            <Link to="/one-pager-list" prefetch={false}>
              My solution one pager list
            </Link>
          </li>
          {/* If user is admin then show administration tool menu instead */}
          <li role="menuitem">
            <Link
              to="/administration-tool/manage-access-group"
              prefetch={false}
            >
              Administration tool
            </Link>
          </li>
          <li
            role="menuitem"
            onClick={() => {}}
            className="test-my-soln-click" // This class used to test click action in JEST test
          >
            <Link to="/technology-list-page">My solutions</Link>
          </li>
          <li role="menuitem">
            <a href="/.auth/logout">Log out</a>
          </li>
        </DropdownMenu>
      )}
    </DropdownComponent>
  );
};

export default AccountDropdown;
