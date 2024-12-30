import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Tab from "./Tab";
import TabPanel from "./TabPanel";
import { whitespace } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";

interface ITabContent {
  tabLabel: string;
  disabled: boolean;
}

export interface TabsProps {
  tabContent: ITabContent[];
  defaultSelectedTab: number; // -1 when no selection by default
  id?: string;
  fullWidth?: boolean;
  tabPanels: React.ReactNode[];
  onChangeTab?: (tabNumber: number) => void; // This event set the tab index on change(i.e. switch form between read/edit)
}

const TabWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: ${whitespace.sm};

  > button:first-child {
    border-top-left-radius: ${remCalc(4.8)};
    border-bottom-left-radius: ${remCalc(4.8)};
  }

  > button:last-child {
    border-top-right-radius: ${remCalc(4.8)};
    border-bottom-right-radius: ${remCalc(4.8)};
  }

  > button:not(:first-of-type) {
    border-left: ${remCalc(0)};
  }
`;

const Tabs: React.FC<TabsProps> = ({
  tabContent,
  defaultSelectedTab,
  id,
  fullWidth = true,
  tabPanels,
  onChangeTab,
}) => {
  const [activeTab, setActiveTab] = useState(defaultSelectedTab);

  useEffect(() => {
    setActiveTab(defaultSelectedTab);
  }, [defaultSelectedTab]);

  const changeTab = (index: number): void => {
    // Handle on click of tabs to set selected tab number for switch between read/edit mode
    !!onChangeTab ? onChangeTab(index) : setActiveTab(index);
  };

  return (
    <div role="tablist" aria-label="Tabs" id={id}>
      <TabWrapper>
        {tabContent &&
          tabContent.map((items, index) => (
            <Tab
              id={`tab${index}`}
              role="tab"
              ariaSelected={index === activeTab ? true : false}
              aria-controls={`tab-panel${index}`}
              key={index}
              label={items.tabLabel}
              onClick={() => changeTab(index)}
              disabled={items.disabled}
              fullWidth={fullWidth}
            />
          ))}
      </TabWrapper>
      {tabContent && tabContent[activeTab] ? (
        <TabPanel
          key={activeTab}
          role="tabpanel"
          id={`tab-panel${activeTab}`}
          ariaLabelledBy={`tab${activeTab}`}
        >
          {tabPanels && !tabContent[activeTab].disabled && tabPanels[activeTab]}
        </TabPanel>
      ) : null}
    </div>
  );
};

export default Tabs;
