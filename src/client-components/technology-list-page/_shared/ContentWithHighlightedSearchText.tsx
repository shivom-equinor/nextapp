import React from "react";
import styled from "styled-components";

import { escapeRegExp } from "../HelpFunctions";
import { colors } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";
interface HighlightedSearchTextProps {
  content: string;
  searchText: string;
}

const HighlightText = styled.span`
  mark {
    padding: ${remCalc(0)};
    background-color: ${colors.yellow.highlight};
  }
`;

const ContentWithHighlightedSearchText: React.FC<
  HighlightedSearchTextProps
> = ({ content, searchText }) => {
  if (!searchText.trim()) {
    return <span>{content}</span>;
  }

  const regex = new RegExp(`(${escapeRegExp(searchText.trim())})`, "gi");
  const parts: string[] = content.split(regex);

  return (
    <HighlightText>
      {parts.length > 0 &&
        parts
          .filter((part: string) => part)
          .map((part: string, index: number) =>
            regex.test(part) ? (
              <mark key={index}>{part}</mark>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
    </HighlightText>
  );
};

export default ContentWithHighlightedSearchText;
