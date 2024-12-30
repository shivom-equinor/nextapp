import {
  ADD_FAV_SEARCH,
  NORMAL_CONTENT_CHAR_COUNT,
  RENAME_FAV_SEARCH,
  UPDATE_FAV_SEARCH,
} from "./constants";
import { IFavSearchInfo, IFavSearchField, IFiltersAndSearch } from "./models";
import initialState from "../../redux/initialState";

// Covert html string to plain text
export const htmlToText = (htmlString: string): string => {
  // TODO : Replace all extra spaces
  const extractText: string = htmlString
    .toLowerCase()
    .trim()
    .replace(/(<([^>]+)>)/gi, "") // Remove all HTML tags
    .replace(/\s+/g, " "); // Replace all escape chars with single space
  let content = document.createElement("textarea");
  content.innerHTML = extractText;

  return content.value;
};

// Normal content when no search value present
export const getNormalContent = (content: string): string => {
  return (
    htmlToText(content).substr(0, NORMAL_CONTENT_CHAR_COUNT) +
    (htmlToText(content).length > NORMAL_CONTENT_CHAR_COUNT ? " [...]" : "")
  );
};

export const escapeRegExp = (text: string = "") =>
  text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

export const getSubmitObjectForFavSearch = (
  favSearchField: IFavSearchField | null,
  existingFavSearchList: IFavSearchInfo[] | null,
  actionType: string,
  favSearchName?: string,
  favSearchId?: string,
  newOrUpdatedFavSearch?: IFiltersAndSearch
) => {
  const defaultFavSearchField: IFavSearchField = {
    label: "",
    helpText: "",
    visible: false,
    hyperLink: "",
    hyperLinkText: "",
    value: null,
    metaData: null,
  };

  const newFavSearch: IFavSearchInfo | null =
    actionType === ADD_FAV_SEARCH && newOrUpdatedFavSearch
      ? {
          id: new Date().valueOf().toString().trim(),
          name: favSearchName ? favSearchName.trim() : "",
          ...newOrUpdatedFavSearch,
        }
      : null;

  const newlyAddedFavSearch: IFavSearchInfo[] | null = newFavSearch
    ? existingFavSearchList && existingFavSearchList.length > 0
      ? [...existingFavSearchList, newFavSearch]
      : [newFavSearch]
    : null;

  const finalFavSearchList: IFavSearchInfo[] | null =
    actionType === RENAME_FAV_SEARCH
      ? favSearchId &&
        favSearchName &&
        favSearchName.trim().length > 0 &&
        existingFavSearchList
        ? existingFavSearchList.map((favList) =>
            favList.id === favSearchId
              ? { ...favList, name: favSearchName.trim() }
              : favList
          )
        : null
      : actionType === UPDATE_FAV_SEARCH
      ? favSearchId && newOrUpdatedFavSearch && existingFavSearchList
        ? existingFavSearchList.map((favList) =>
            favList.id.trim() === favSearchId.trim()
              ? {
                  ...favList,
                  selectedGroup: newOrUpdatedFavSearch.selectedGroup
                    ? newOrUpdatedFavSearch.selectedGroup
                    : initialState.selectedGroup,
                  selectedView: newOrUpdatedFavSearch.selectedView
                    ? newOrUpdatedFavSearch.selectedView
                    : initialState.selectedView,
                  selectedMyRole: newOrUpdatedFavSearch.selectedMyRole
                    ? newOrUpdatedFavSearch.selectedMyRole
                    : initialState.selectedMyRole,
                  search: newOrUpdatedFavSearch.search
                    ? newOrUpdatedFavSearch.search
                    : null,
                  selectedFilters: newOrUpdatedFavSearch.selectedFilters
                    ? newOrUpdatedFavSearch.selectedFilters
                    : null,
                  solutionOwnerOrganisation:
                    newOrUpdatedFavSearch.solutionOwnerOrganisation
                      ? newOrUpdatedFavSearch.solutionOwnerOrganisation
                      : null,
                }
              : favList
          )
        : null
      : newlyAddedFavSearch; // Add new fav search

  return favSearchField
    ? {
        favSearch: {
          ...favSearchField,
          value: finalFavSearchList ? JSON.stringify(finalFavSearchList) : null,
        },
      }
    : {
        favSearch: {
          ...defaultFavSearchField,
        },
      };
};
