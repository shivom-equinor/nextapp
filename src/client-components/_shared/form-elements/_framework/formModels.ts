export interface ISelectOption {
  id: number;
  text: string;
  imageURL?: string;
  description?: string | null;
  isActive?: boolean;
}

export interface IField {
  label: string;
  helpText: string;
  visible: boolean;
  hyperLink: string;
  hyperLinkText: string;
}
