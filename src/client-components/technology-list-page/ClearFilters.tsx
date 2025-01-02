import React from "react";
import isEmpty from "lodash/isEmpty";

import { TertiaryButton } from "../_shared/buttons";
import { ISelectedFilters } from "../../api/models";

interface ClearFiltersProps {
  solnOrgSearchTerm?: string;

  // clear: () => void;
  handleSolnOrgSearch?: (value: string) => void;
}

const ClearFilters: React.FunctionComponent<ClearFiltersProps> = ({
  solnOrgSearchTerm,
  // selectedFilters,
  // clear,
  handleSolnOrgSearch,
}) => {
  const handleClear = () => {
    handleSolnOrgSearch && handleSolnOrgSearch("");
    // clear();
  };

  const hasSelectedFilters = () => {
    // Checking if the object itself is empty
    // if (isEmpty(selectedFilters)) {
    //   return false;
    // }

    // Checking if there are empty arrays in the object
    // for (let value of Object.values(selectedFilters)) {
    //   if (value.length > 0) {
    //     return true;
    //   }
    // }
    return false;
  };

  return (
    <>
      {((solnOrgSearchTerm && solnOrgSearchTerm.trim().length > 0) ||
        hasSelectedFilters()) && (
        <TertiaryButton label="Clear filters" onClick={handleClear} />
      )}
    </>
  );
};

export default ClearFilters;
