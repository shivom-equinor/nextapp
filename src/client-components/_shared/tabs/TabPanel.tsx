import React from "react";

export interface TabPanelProps {
  id: string;
  role: string;
  ariaLabelledBy: string;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
  id,
  role,
  ariaLabelledBy,
  children,
}) => {
  return (
    <div id={id} role={role} aria-labelledby={ariaLabelledBy}>
      {children}
    </div>
  );
};

export default TabPanel;
