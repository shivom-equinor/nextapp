// colors
export const colors = {
  slateBlue: {
    standard: "#243746",
    standardTransparent: "rgba(36, 55, 70, 0.35)", // missing from style guide
    sb80: "#4F5F6B",
    sb70: "#929BA3",
    sb50: "#C5CACE",
    sb40: "#D6D9DC",
    sb30: "#EBEDEF",
  },
  red: {
    energic: "#FF1243",
    energic10: "#FFE6EC",
    energic05: "#FFF8FA", // missing from style guide
    heritage: "#7D0023",
    standard: "#FF0000",
    cadmiumRed: "#EB002F",
  },
  mistBlue: {
    darker: "#4a93b7",
    dark: "#B0D9ED",
    standard: "#D5EAF4",
    mb50: "#EAF4F9",
    mb40: "#F7FBFD", // missing from style guide
  },
  mossGreen: {
    dark: "#00545B", // missing from style guide
    standard: "#007079",
    mg35: "#A7CDD1",
    mg20: "#D3E6E8",
    mg15: "#DAE9EC",
    mg10: "#E1EEEF",
  },
  lichenGreen: {
    standard: "#E6FAEC",
    lg50: "#F2F8F8",
  },
  emeraldGreen: {
    standard: "#19A56F",
    eg10: "#E5F5EA",
  },
  green: {
    standard: "#008550",
  },
  yellow: {
    standard: "#EFC023",
    highlight: "#FFFF00",
  },
  floralWhite: {
    standard: "#FEFDF9",
  },
};

export const riskColors = {
  red: colors.red.cadmiumRed,
  yellow: "#EFB023",
  green: "#40d28f",
  darkBlue: "#1C89B9",
  standardBlue: "#7AC5E2",
  lightBlue: "#C9DCE4",
};

export const disabledColors = {
  background: "#D6DADD", // missing from style guide
  standard: colors.slateBlue.sb70,
  button: "#7f8989", // missing from style guide
};

// Semantic namings of colors.
// Use these instead of color-const when possible
export const backgrounds = {
  main: colors.mistBlue.mb50,
  dark: colors.slateBlue.standard,
  tableRowBg: "#f5f5f5", // missing from style guide
  tableRowDisabled: disabledColors.background,
};

export const interactiveColors = {
  bgHover: colors.mossGreen.mg20,
  bgHoverLighter: colors.mossGreen.mg10,
  focus: colors.slateBlue.standard,
  focusInverted: colors.mossGreen.mg35,
};

export const borderColors = {
  standard: colors.slateBlue.sb50,
  tableHeader: colors.mossGreen.mg10,
  tableBorder: "#ebebeb", // missing from style guide
  tableBorderDark: colors.slateBlue.sb50,
  tableBorderAlternate: "#c5cace80", // missing from style guide
  dark: "#ACACAC", // missing from style guide
  grayBorder: "#707070", // missing from style guide
};

export const boxShadowColors = {
  table: "#00000026",
};

export const skeleton = {
  light: colors.slateBlue.sb30,
  dark: colors.slateBlue.sb40,
  shine: "rgba(255, 255, 255, 0.5)",
};

// Will be given more sematic names when a pattern arises
export const dropshadow = {
  standard: " 0 15px 15px rgba(36, 55, 70, 0.1)",
};

export const transitions = {
  bgHover: "background-color .15s ease-in-out",
};

export const textColor = colors.slateBlue.standard;

export const errorColors = {
  border: colors.red.energic,
  background: colors.red.energic05,
  text: colors.red.cadmiumRed,
};

export const clearBtnColor = "#000000de";

export const disabled = colors.slateBlue.sb50;

export const verifiedColor = "#3eac0d";

// Whitespace
export const whitespace = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  m: "16px",
  l: "32px",
  xl: "64px",
};

// Whitespace shortened to ws with sematic names
// Use these when adding ws as padding and margin
export const ws = {
  padding: whitespace.m,
  paddingHalf: whitespace.xs, // to be removed, we will only use padding and margin, and whitespace.x for rest
  paddingQuarter: whitespace.xxs, // to be removed
  paddingMax: whitespace.xl, // to be removed
  margin: whitespace.l,
};

// Font stack
export const font = "'Equinor', sans-serif";

// Z-indexes
// all z-indexed in the whole app should be applied
// with constants from this file, except -1 an 1
export const z = {
  modal: "1500",
  mainHeader: "1201",
  pitchHeader: "1200",
  // snackBar: 1400 (provided by third party)
  stickyTabs: "1110",
  stickyTableHeader: "1105",
  stickyTableHeaderMatrixTable: "5",
  stickyPanels: "100",
  stickyColumn: "15",
  dropdown: "10",
  tooltip: "2",
};

export const numericValue = {
  value100: 100,
  value200: 200,
  value300: 300,
  value400: 400,
  value500: 500,
  value600: 600,
  value700: 700,
  value800: 800,
  value900: 900,
};

//Font-style
export const fontStyle = {
  italic: "italic",
  normal: "normal",
  initial: "initial",
};
