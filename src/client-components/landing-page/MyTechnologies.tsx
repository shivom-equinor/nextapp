import React from "react";
import styled from "styled-components";

import SectionBlock from "../_shared/SectionBlock";
import ArrowLink from "../_shared/links/ArrowLink";
import EmptyStateText from "../_shared/EmptyStateText";
import Tabs from "../_shared/tabs/Tabs";
import { PitchStatusTypes } from "../../modals/PitchModals";
import MyTechTab from "./tabs/MyTechTab";

interface MyTechnologiesProps {
  myTechnologies: any[];
  router: any;
}

const TabsWrapper = styled.section`
  > div > div:first-of-type {
    width: 45%;
  }
`;

const MyTechnologies = ({ myTechnologies, router }: MyTechnologiesProps) => {
  //   useEffect(() => {
  //     loadMyTechnologyList();
  //   }, [loadMyTechnologyList]);

  const navigateToTechList = () => {
    // clearFilters();
    // addFilter("myTechnology", "My solutions");
    router.push("/technology-list-page/my-technologies");
  };

  // Filter  myTechnologies
  const Mytechnologies = myTechnologies?.filter(
    (technology) =>
      technology.status !== PitchStatusTypes.proposed &&
      technology.status !== PitchStatusTypes.rejected &&
      technology.status !== PitchStatusTypes.draft
  );

  // Filter proposal with rejected technologies
  const proposalTechnologies = myTechnologies?.filter(
    (technology) =>
      technology.status === PitchStatusTypes.proposed ||
      technology.status === PitchStatusTypes.rejected
  );
  const ProposedTechnologyCount =
    proposalTechnologies && proposalTechnologies.length;

  // Filter draft technologies
  const draftTechnologies = myTechnologies?.filter(
    (technology) => technology.status === PitchStatusTypes.draft
  );

  const draftTechnologyCount = draftTechnologies && draftTechnologies.length;

  const tabs = [
    {
      tabLabel: "Solutions",
      disabled: false,
    },
    {
      tabLabel: "Proposals",
      disabled: true,
    },
    {
      tabLabel: "Saved drafts",
      disabled: draftTechnologyCount === 0,
    },
  ];

  const myTechTabPanel = (
    <>
      {Mytechnologies && Mytechnologies.length > 0 ? (
        <>
          <MyTechTab technologiesList={Mytechnologies} />
          <ArrowLink
            to="/technology-list-page/my-technologies"
            pushToHistory={navigateToTechList}
          >
            Go to all my solutions {0}
          </ArrowLink>
        </>
      ) : (
        <EmptyStateText>Loading...</EmptyStateText>
      )}
    </>
  );
  //   const proposalsTabPanel = (
  //     <ProposalsTab
  //       proposalTechList={proposalTechnologies}
  //       count={ProposedTechnologyCount}
  //     />
  //   );

  //   const draftsTabPanel = (
  //     <DraftsTab draftTechList={draftTechnologies} count={draftTechnologyCount} />
  //   );

  const tabPanels = [myTechTabPanel];

  return (
    <SectionBlock heading="My solutions">
      <TabsWrapper>
        <Tabs tabContent={tabs} defaultSelectedTab={0} tabPanels={tabPanels} />
      </TabsWrapper>
    </SectionBlock>
  );
};

export default MyTechnologies;
