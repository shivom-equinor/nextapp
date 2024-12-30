import React from "react";

import { htmlToText, getNormalContent } from "../HelpFunctions";
import { EXTRA_CONTENT_CHAR_COUNT } from "../constants";
import ContentWithHighlightedSearchText from "./ContentWithHighlightedSearchText";

interface SearchContentProps {
  content: string;
  searchText: string;
}

const SearchContent: React.FC<SearchContentProps> = ({
  content,
  searchText,
}) => {
  const plainText: string = htmlToText(content);
  let SearchContent: string = "";
  // Returns the content with highlighted search text if search value is present in content
  // Otherwise normal content
  if (searchText && plainText.includes(searchText.trim().toLowerCase())) {
    const lengthBeforeSearchText: number = plainText.slice(
      0,
      plainText.indexOf(searchText.trim().toLowerCase())
    ).length;
    const lengthAfterSearchText: number = plainText.slice(
      plainText.indexOf(searchText.trim().toLowerCase())
    ).length;

    /**
     * Create content with highlighted search text
     * Example - [...] previousText + searchTextAndExtraContent [...]
     * [...] - this shows,
     * when lengthBeforeSearchText > EXTRA_CONTENT_CHAR_COUNT and
     * when lengthAfterSearchText > EXTRA_CONTENT_CHAR_COUNT
     */
    const previousText: string =
      lengthBeforeSearchText > EXTRA_CONTENT_CHAR_COUNT
        ? "[...] " +
          plainText.slice(
            lengthBeforeSearchText >= EXTRA_CONTENT_CHAR_COUNT
              ? plainText.indexOf(searchText.trim().toLowerCase()) -
                  EXTRA_CONTENT_CHAR_COUNT
              : 0,
            plainText.indexOf(searchText.trim().toLowerCase())
          )
        : plainText.slice(
            lengthBeforeSearchText >= EXTRA_CONTENT_CHAR_COUNT
              ? plainText.indexOf(searchText.trim().toLowerCase()) -
                  EXTRA_CONTENT_CHAR_COUNT
              : 0,
            plainText.indexOf(searchText.trim().toLowerCase())
          );
    const searchTextAndExtraContent: string =
      lengthAfterSearchText > EXTRA_CONTENT_CHAR_COUNT
        ? plainText.substr(
            plainText.indexOf(searchText.trim().toLowerCase()),
            searchText.trim().toLowerCase().length + EXTRA_CONTENT_CHAR_COUNT
          ) + " [...]"
        : plainText.substr(
            plainText.indexOf(searchText.trim().toLowerCase()),
            searchText.trim().toLowerCase().length + EXTRA_CONTENT_CHAR_COUNT
          );

    SearchContent = previousText.concat(searchTextAndExtraContent);
  }

  return SearchContent.trim().length > 0 ? (
    <ContentWithHighlightedSearchText
      content={SearchContent}
      searchText={searchText.trim().toLowerCase()}
    />
  ) : (
    <>{getNormalContent(content)}</>
  );
};

export default SearchContent;
