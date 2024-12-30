export enum PitchStatusTypes {
  draft = "Draft",
  proposed = "Proposed",
  rejected = "Rejected",
  ongoing = "Ongoing",
  stopped = "Stopped",
  available = "Available",
  obsolete = "Obsolete",
  replaced = "Replaced",
}

export enum PitchApprovalTypes {
  approved = "Approved",
  pendingApproval = "Pending approval",
  pendingMyApproval = "Pending my approval",
  changesRequested = "Changes requested",
  rejected = "Rejected",
  notEvaluated = "Not evaluated",
}

export enum PitchEndorsementTypes {
  endorsed = "Endorsed",
  pendingEndorsement = "Pending endorsement",
  pendingMyEndorsement = "Pending my endorsement",
  changesRequested = "Changes requested",
  notEndorsed = "Rejected",
  notEvaluated = "Not evaluated",
}

export enum PitchApprovalActionTypes {
  endorsement = "Endorsement",
  approval = "Approval",
}
