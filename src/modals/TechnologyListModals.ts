export interface IFilterSectionUpdated {
  displayName: string;
  name: keyof IFilterOptions;
  type: string;
  values: (string | null)[] | null;
}

export interface IFilterOptions {
  status?: string;
  MainDiscipline?: string;
  TDG?: string;
  TRL?: string;
  TechnologyCouncil?: string;
  MainCompetenceArea?: string;
  myTechnology?: string;
  myFavoriteTechnology?: string;
  tags?: string;
  isWaitlist?: string;
  prioritization?: string;
  solutionArea?: string;
}

export interface ITechnologyDetails {
  technology: string;
  techId: string;
  tdg: string;
  tdgText: string;
  trl: string;
  trlText: string;
  phase: string;
  purpose: string;
  description: string;
  businessChallenge: string;
  mainProcess: string;
  mainCompetenceArea: string;
  mainDiscipline: string;
  myTechnology: string;
  myFavoriteTechnology: string;
  status: string;
  nextTDG: string;
  nextTDGDate: string;
  currentStage: string;
  nextStageOld: string;
  technologyPageURL: string;
  statusUpdatedDate: string;
  techImageURL: string;
  firstUserCustomer: string;
  firstdata: string;
  shortStatus: string;
  ctoOrganisation: string;
  technologyName: string;
  projectCategories: string[] | null;
  technologyCategory: string;
  isNextTDGOverDue: string;
  communication: string;
  otherCustomersCount: string;
  modifiedDate: string;
  marketYouTechnology: string;
  endorsementStatus: string;
  endorsementAction: boolean;
  endorsedBy: IPitchApproverInfo;
  approvedBy: IPitchApproverInfo;
  approvalStatus: string;
  approvalAction: boolean;
  submittedDate: string;
  technologyOwner: IUserDetails;
  technologyCouncil: string;
  prioritization: string;
  solutionArea: string;
  // These flags used for "Browse by my role" filter
  isTechnologyOwner: boolean;
  isProductOwner: boolean;
  isTaskManager: boolean;
  isTeamMember: boolean;
  isRepProfessionalLadder: boolean;
  isRepIPR: boolean;
  isRepProcurement: boolean;
  isRepExportCtrlSanction: boolean;
  isCustomerResponsible: boolean;
  isCustomerTechnicalContact: boolean;
  isStakeholder: boolean;
  isLeader: boolean;
  tags: ITagFilterSection[];
  businessSolutionOwner: IUserDetails;
  technologyProductManager: IUserDetails;
  isTechnologyProductManager: boolean;
  isBusinessSolutionOwner: boolean;
  isWaitlist: string;
}

export interface IPitchApproverInfo {
  label: string;
  helpText: string;
  value: IUserDetails;
}

export interface IUserDetails {
  displayName: string;
  businessPhones: string;
  mobilePhone: string;
  department: string;
  jobTitle: string;
  mail: string;
  myProfilePhoto: string;
  userName: string;
  surname: string;
  givenName: string;
  id: string;
  myProfileUrl: string;
  userPrincipalName: string;
  isExternalUser: boolean;
  isExternalMember: boolean;
  isAdmin: boolean;
  isAuditor: boolean;
  errorOcurredMessage: string | null;
  isBulkEditor: boolean;
  hasOnePagerAccess: boolean;
  isLocked?: boolean;
}

export interface ITagFilterSection {
  id: number;
  tagName: string;
}

export interface IField {
  label: string;
  helpText: string;
  visible: boolean;
  hyperLink: string;
  hyperLinkText: string;
}

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

export interface IFilterSection {
  displayName: string;
  name: keyof IFilterOptions;
  type: string;
  values: IFilterOptions[];
}

export interface IColumn {
  displayName: string;
  value: keyof ITechnologyDetails;
}

export interface ISelectOption {
  id: number;
  text: string;
  imageURL?: string;
  description?: string | null;
  isActive?: boolean;
}
