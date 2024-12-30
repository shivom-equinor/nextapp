import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";

import { CircleButton } from "../_shared/buttons";
import SearchIcon from "../../styles/assets/icons/search.svg";
import CloseIcon from "../../styles/assets/icons/close-white.svg";
import TextField from "../_shared/form-elements/TextField";
import ToolTip from "../_shared/Tooltip";
import {} from "../../styles/constants";
import { remCalc } from "../../styles/functions";

interface TextFieldWrapperInterface {
  isopen: boolean;
}

const TextFieldWrapper = styled.div<TextFieldWrapperInterface>`
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  width: ${(props) => (props.isopen ? "305px" : "0px")};
  transform: translate(40px, calc(50% - 23px));
  opacity: ${(props) => (props.isopen ? "1" : "0")};
  margin: 0;
  position: relative;
  z-index: 1;
  > div {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  .textFieldExpandTooltip {
    height: 30px;
    transform: translate(0px, 8px);
    z-index: 2;
    > button {
      max-height: 32px;
      align-self: center;
      position: relative;
      z-index: 2;
    }
    > span {
      margin-left: ${remCalc(0.96)};
      margin-top: ${remCalc(9.6)};
    }
  }
`;

const ExpandSearch: React.FC = () => {
  const [isopen, setOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const divRef: React.RefObject<HTMLDivElement> = useRef(null);

  const isQEmpty = search.trim() === "";
  const timeout = setTimeout(() => null, 0);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", collapseSearch);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", collapseSearch);
    };
  }, []);

  const onSearchClick = () => {
    if (!isopen) {
      clearTimeout(timeout);
      setOpen(true);
      setTimeout(() => {
        setSubmit(true);
      }, 300);
      inputRef && inputRef.current && inputRef.current.focus();
    } else if (isQEmpty) {
      setSubmit(false);
      setOpen(false);
    }
  };

  const collapseSearch = (event: MouseEvent) => {
    if (
      divRef &&
      divRef.current &&
      !divRef.current.contains(event.target as Node)
    ) {
      // Outside click
      setSearch("");
      setOpen(false);
      setSubmit(false);
    }
  };

  return (
    <form
      action="https://statoilsrm.sharepoint.com/search/Pages/results.aspx"
      target="_blank"
    >
      <Container ref={divRef}>
        <TextFieldWrapper isopen={isopen}>
          <TextField
            uniqueId={uniqueId()}
            label="Search"
            visibleLabel={false}
            reference={inputRef}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => clearTimeout(timeout)}
            placeholder="Corporate search"
            value={search}
            name="k"
          />
        </TextFieldWrapper>
        <ToolTip
          text="Equinor corporate search engine"
          className="textFieldExpandTooltip"
        >
          <CircleButton
            ariaLabel="Search"
            icon={isopen && isQEmpty ? CloseIcon : SearchIcon}
            onClick={onSearchClick}
            isSubmit={isQEmpty ? false : isSubmit}
          />
        </ToolTip>
      </Container>
    </form>
  );
};

export default ExpandSearch;
