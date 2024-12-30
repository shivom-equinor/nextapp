import { IFilterOptions } from "../../api/models";
import { IField } from "../_shared/form-elements/_framework/formModels";

export interface IFavSearchField extends IField {
  value: string | null;
  metaData: null;
}

export interface IFavSearch {
  favSearch: IFavSearchField;
}

export interface IFiltersAndSearch {
  selectedGroup: string;
  selectedView: string;
  selectedMyRole: string;
  search: string | null;
  solutionOwnerOrganisation: string | null;
  selectedFilters: ISelectedFilters | null;
}

export interface IFavSearchInfo extends IFiltersAndSearch {
  id: string;
  name: string;
}

export interface ISelectedFilters {
  myTechnology?: string[];
  myFavoriteTechnology?: string[];
  status?: string[];
  MainDiscipline?: string[];
  TDG?: string[];
  TRL?: string[];
  TechnologyCouncil?: string[];
  projectCategory?: string[];
  tags?: string[];
  prioritization?: string[];
  solutionArea?: string[];
}

export interface IFilterValueWithCount {
  label: string | null;
  count: number;
}

export interface IFilterAndCountDetails {
  displayName: string;
  name: keyof IFilterOptions;
  type: string;
  values: IFilterValueWithCount[] | null;
}
