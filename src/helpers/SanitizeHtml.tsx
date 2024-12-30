import React from "react";
import styled from "styled-components";
import * as DOMPurify from "dompurify";
import { numericValue } from "../styles/constants";

export interface SanitizeHTMLProps {
  dirtyHtml: string;
  options?: any;
  type: any; // What HTML element you want into display sanitized html
}

const Wrapper = styled.div`
  b,
  strong {
    font-weight: ${numericValue.value500};
  }
`;

const SanitizeHtml: React.FC<SanitizeHTMLProps> = ({
  dirtyHtml,
  options,
  type,
}) => {
  const defaultOptions = {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "nl",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "strike",
      "code",
      "hr",
      "br",
      "div",
      "table",
      "thead",
      "caption",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
      "img",
      "span",
    ],
    ALLOWED_ATTR: [
      "href",
      "name",
      "target",
      "width",
      "border",
      "height",
      "alt",
      "src",
      "style",
      "title",
    ],
  };

  const sanitizeMarkup = DOMPurify.sanitize(dirtyHtml, {
    ...defaultOptions,
    ...options,
  });
  const HTMLElement = type;

  return (
    <Wrapper>
      <HTMLElement dangerouslySetInnerHTML={{ __html: sanitizeMarkup }} />
    </Wrapper>
  );
};

export default SanitizeHtml;
