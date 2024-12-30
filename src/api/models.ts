/*
 * All interfaces for data of global concern should be stored in this file
 */

export interface IShowcaseSortAndFilter {
  showCaseSortByFields: IShowcaseSort[];
  showCaseCategories: IShowcaseCategory[];
}

export interface IShowcaseCategory {
  tagId: string;
  tagName: string;
  tagDescription: string;
  tagOrder: string;
}

export interface IShowcaseSort {
  sortText: string;
  sortId: string;
}

export interface IShowcaseFilteredList {
  showCaseCategory: string;
  showCaseTechnologiesCount: string;
  technologyDetails: ITechnologyDetails[];
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

export interface IUserDetailsLite {
  displayName: string;
  mail: string | null;
  profileUrl: string | null;
}

export interface IMyTechnologyDetails {
  techId: string;
  technologyName: string;
  status: string;
  trl: string;
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
  endorsedBy: any;
  approvedBy: any;
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

export interface ITechnologyDetailsLite {
  techId: string;
  caseId: string;
  trl: string;
  trlText: string;
  technologyName: string;
  communication: string;
  status: string;
  currentStage: string;
  technologyPageURL: string;
}

export interface IFaqDetails {
  id: string;
  question: string;
  answer: string;
  order: string;
  hidden: string;
}

export interface ITechnologiesIFollow {
  technologiesCount: number;
  myTechnologyDetails: ITechnologyDetails[] | null;
}

export interface IFilterSection {
  displayName: string;
  name: keyof IFilterOptions;
  type: string;
  values: IFilterOptions[];
}

// TODO : Change the name while all reference of IFilterSection is updates with this interface
export interface IFilterSectionUpdated {
  displayName: string;
  name: keyof IFilterOptions;
  type: string;
  values: (string | null)[] | null;
}

export interface ITagFilterSection {
  id: number;
  tagName: string;
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

export interface ISelectedFilters {
  myTechnology?: string[];
  myFavoriteTechnology?: string[];
  status?: string[];
  MainDiscipline?: string[];
  TDG?: string[];
  TRL?: string[];
  TechnologyCouncil?: string[];
  MainCompetenceArea?: string[];
  tags?: string[];
  projectCategories?: string[] | null;
  prioritization?: string[] | null;
  solutionArea?: string[] | null;
}

export interface IMegaMenu {
  heading: string;
  list: IMegaMenuList[];
  action: string;
}

export interface IMegaMenuList {
  name: string;
  url: string;
  external: boolean;
}

export interface IColumn {
  displayName: string;
  value: keyof ITechnologyDetails;
}

export interface IGroupAndView {
  viewGroupName: string;
  viewNames: string[];
}

export interface ISummaryDetails {
  currentTechnologyDetails: ICurrentTechnologyDetails;
  customerDetails: ICustomerDetails[];
  roleDetails: IRoleDetails[];
  connectedTechnologyDetails: any;
  contactPersons: IContactPerson[];
  milestonesSchedule: IMilestonesSchedule[];
  groupDetails: any | null;
  externalPartners: string[];
}

export interface ICurrentTechnologyDetails {
  techId: string;
  status: string;
  statusModifiedDate: string;
  currentStage: string;
  communication: string;
  technologyName: string;
  modifiedDate: string;
  ctoDisplayName: string;
  ctoOrganisation: string;
  technologyType: string;
  ipCategory: string;
  trl: string;
  mainProcess: string;
  purpose: string;
  techImageURL: string;
  shortStatus: string;
  isFollow: boolean;
  mainProcessTagDesc: string;
  technologyTypeTagDesc: string;
  trlTagDesc: string;
  ipCategoryTagDesc: string;
  marketYouTechnology: string;
  description: string;
  isTechnologyMember: boolean;
  stoppedDate: any;
  stoppedReason: any;
  trlText: string;
  lastModifiedBy: string;
}

export interface ICustomerDetails {
  title: string;
  area: string;
  cluster: string;
}

export interface IContactPerson {
  roleDetails: IRoleDetails;
  userDetails: IUserDetails;
  isCurrent: boolean;
  previousDepartment: string | null;
}

export interface IRoleDetails {
  roleDisplayName: string;
}

export interface IMilestonesSchedule {
  milestoneStatusText: string;
  plannedDate: string;
  actualDate: string;
  isCurrentStage: boolean;
  milestoneId: string;
  stoppedDate: string;
  isPlannedDateOverDue: boolean;
}

export interface IConnTechGroupDetails {
  groupName: string;
  groupDescription: string;
  contactPersons: IGroupContactPersons[];
  groupMembers: ITechnologyDetailsLite[];
}

export interface IGroupContactPersons {
  displayName: string;
  myProfileUrl: string;
}

export interface IInfoLink {
  label: string;
  helpText: string;
  visible: boolean;
  hyperLink: string;
}

export interface IErrorLogging {
  errorMessage: string;
}

export interface ISiteDetails {
  isSessionHandlingEnabled: boolean;
  siteLogo: string | null;
  siteDetails: string | null;
}

export interface IUploadedAttachments {
  value: string[] | null;
  metaData: null;
}

export interface IResponseData<T = any> {
  success: boolean;
  message: string | null;
  data: T;
}
