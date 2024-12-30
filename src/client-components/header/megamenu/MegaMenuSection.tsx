"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { History } from "history";

import { colors, numericValue, ws } from "../../../styles/constants";
import MenuIcon from "../../../styles/assets/icons/menu.svg";
import { remCalc } from "../../../styles/functions";
import MenuContainer from "./MenuContainer";
import Image from "next/image";

export interface ToggleProps {
  isExpanded: boolean;
}

interface MegaMenuSectionProps {
  history: History | any;
}

const MenuWrapper = styled.div`
  height: ${numericValue.value100}%;
  max-width: ${remCalc(250)};

  // Hide mega menu for printing an audit report page
  @media print {
    display: none;
  }
`;

const MenuButton = styled.button`
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

  img {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  :hover,
  :focus {
    background-color: ${colors.slateBlue.standard};
    color: white;

    svg path {
      fill: white;
    }
  }
`;

const Overlay = styled.div<ToggleProps>`
  display: ${(props) => (props.isExpanded ? "block" : "none")};
  position: fixed;
  height: ${numericValue.value100}%;
  width: ${numericValue.value100}%;
  left: 0;
  top: 230px;
  background: ${colors.slateBlue.standard} 0% 0% no-repeat padding-box;
  opacity: 0.8;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

const ConnectedMegaMenuDropdown: React.FunctionComponent<
  MegaMenuSectionProps
> = ({ history }) => {
  const [isopen, setisopen] = useState(false);
  const node: any = useRef(null);

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

  const registerTechnology = () => {
    history.push("/pitch/createNewPitch");
    setisopen(false);
  };

  return (
    <>
      <Overlay isExpanded={isopen} />
      <MenuWrapper ref={node}>
        <MenuButton onClick={toggleMenu}>
          <MenuIcon />
          &nbsp; Menu
        </MenuButton>
        {isopen && (
          <MenuContainer
            closeMenu={closeMenu}
            registerTechnology={registerTechnology}
          />
        )}
      </MenuWrapper>
    </>
  );
};

const MegaMenu = ConnectedMegaMenuDropdown;

export default MegaMenu;
