import initialState from "../../redux/initialState";

// Constants for technology list page
export const DEFAULT_COLUMN = "techId";
export const ORDER = "desc";
export const AMOUNT_PER_LOAD = 15;

// Browse by my roles
export const BROWSE_BY_ROLE = {
  allMyRoles: "All my roles",
  productOwner: "Product owner",
  taskManager: "Delivery team lead",
  teamMember: "Team member",
  repProfessionalLadder: "Professional ladder representative",
  repIPR: "Discipline expert - IPR",
  repProcurement: "Discipline expert - Procurement",
  repExportCtrlSanction: "Discipline expert - Export control and sanctions",
  customerResponsible: "Customer representative",
  CustomerTechnicalContact: "Customer technical contact",
  stakeholder: "Stakeholders",
  leaders: "Leaders",
  businessSolutionOwner: "Business solution owner",
  technologyProductManager: "Technology product manager",
};

// Views
export const TILE_VIEW = "tile-view";
export const TABLE_VIEW = "table-view";

// Search content
export const NORMAL_CONTENT_CHAR_COUNT = 200;
export const EXTRA_CONTENT_CHAR_COUNT = 100;

// Search field limits
export const MIN_CHAR_LIMIT = 3;
export const MAX_CHAR_LIMIT = 100;
export const MIN_CHAR_LIMIT_MSG = `Minimum character limit is ${MIN_CHAR_LIMIT}`;
export const MAX_CHAR_LIMIT_MSG =
  "You have exceeded the maximum character limit";

// Fav search
export const MAX_LIMIT_FAV_SRCH = 10;
export const MAX_CHAR_LIMIT_FAV_SRCH_NAME = 50;
export const MAX_CHAR_LIMIT_FAV_SRCH_NAME_MSG =
  "You have exceeded the maximum character limit of 50";
export const DUPLICATE_FAV_SEARCH_NAME_MSG =
  "This favourite search name already exists!";
export const UNSAVED_CHANGES_MSG = "You have unsaved changes!";

export const ADD_FAV_SEARCH = "ADD_FAV_SEARCH";
export const RENAME_FAV_SEARCH = "RENAME_FAV_SEARCH";
export const UPDATE_FAV_SEARCH = "UPDATE_FAV_SEARCH";
export const DELETE_FAV_SEARCH = "DELETE_FAV_SEARCH";

export const DEFAULT_FILTERS_AND_SEARCH = {
  search: null,
  selectedFilters: null,
  selectedGroup: initialState.selectedGroup,
  selectedView: initialState.selectedView,
  selectedMyRole: initialState.selectedMyRole,
};

export const EXCLUDE_COLUMN_TO_SORT = {
  projectCategories: "projectCategories",
};

// Filter types
export const filterTypes = {
  input: "input",
  checkbox: "checkbox",
};
