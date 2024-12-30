/*
 * Include constants which are common for all components here.
 */

// All old stage names should be updated with
// the new names throughout the application.
// The comments besides each key value pair represents the old stage name
export const technologyStages = {
  ideate: "ideate", // pitch
  mature: "mature", // plan
  develop: "develop", // Develop & verify
  implement: "implement", // Implement & improve
  manage: "manage", // Run & maintain
};

// Technology status
export const technologyStatus = {
  available: "available",
  draft: "draft",
  obsolete: "obsolete",
  ongoing: "ongoing",
  proposed: "proposed",
  rejected: "rejected",
  replaced: "replaced",
  stopped: "stopped",
  end: "end",
  approved: "approved",
};

// Solution decision gates
export const decisionGates = {
  sdg: "sdg",
  sdg1: "sdg1",
  sdg2: "sdg2",
  sdg3: "sdg3",
  sdg4: "sdg4",
  sdg5: "sdg5",
};

// Technology readiness level
export const readinessLevels = {
  trl: "trl",
  trl4: "trl4",
  trl7: "trl7",
};

// Person left the company message
export const personLeftTheCompanyMessage: string =
  "Person has left the company";
// Person changed the organisation message
export const personChangedTheOrgMessage: string =
  "Person has changed the organisation unit";

// WBS field
export const addWBSBtnLabel: string = "Add new WBS";
export const verifiedWBSMessage: string = "WBS code verified.";
export const verifiedAndAddedWBSMessage: string =
  "WBS code verified and added.";
export const verifiedWBSExtraMessage: string =
  "Please click on 'ADD THIS WBS' button to continue.";
export const addThisWBSBtnLabel: string = "ADD THIS WBS";
export const verifyWBSBtnLabel: string = "VERIFY WBS";

export const unsavedInfoMessage: string =
  "You have unsaved changes. Are you sure you want to leave without saving your changes?";

//value creation headers
export const qualitative: string = "qualitative";
export const quantitative: string = "quantitative";
export const trlConstant: string = "TRL";
export const trlNotApplicable: string = "N/A";
export const currentTRLNotApplicable: string = "TRL N/A";

// NewRow ID in Implementation/Partial Solution Plan Table
export const newRowId = "NR";

export const endorsementApprovalNote =
  "<h6 style='padding-bottom: 8px;'>Note: Before endorsement and approval in Co-Lab, the TPM and BSO must ensure that decision is taken within approved funding frame made available from BPO and TPO and that decision are made under according to the appropriate financial mandate structure for R&D and IT invest.</h6>";
