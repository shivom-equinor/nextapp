import React from "react";
import MyTechnologyCard from "../MyTechnologyCard";

interface MyTechTabProps {
  technologiesList: any;
}

const MyTechTab = ({ technologiesList }: MyTechTabProps) => {
  return (
    <>
      {technologiesList.map((technology: any, index: number) => (
        <MyTechnologyCard technology={technology} key={index} />
      ))}
    </>
  );
};

export default MyTechTab;
