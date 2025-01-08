"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";

import SearchField from "./SearchField";
import RegisterTechnology from "./RegisterTechnology";
import MyTechnologies from "./MyTechnologies";
import { getMyTechnologies } from "@/api/technologyAPIs";
import {
  MyTechCardSkeleton,
  MyTechTabSkeleton,
} from "../_shared/skeleton-screens/MyTechCardSkeleton";
import SectionBlock from "../_shared/SectionBlock";
import { useFetchingQuery } from "@/app/react-query/reactQueryUtils";

const LandingPage: React.FC<any> = ({ dehydratedState }) => {
  const router = useRouter();
  const {
    data: myTechnologiesData,
    isLoading,
    error,
  } = useFetchingQuery({
    queryKey: ["myTechnologies"],
    queryFn: getMyTechnologies,
    staleTime: 30 * 60 * 1000,
    initialData: dehydratedState,
  });

  return (
    <Row>
      <Col lg={8}>
        <SearchField router={router} />
      </Col>
      <Col lg={4}>
        <RegisterTechnology />
      </Col>
      <Col lg={8}>
        {isLoading ? (
          <SectionBlock heading="My solutions">
            <MyTechTabSkeleton />
            <MyTechCardSkeleton />
            <MyTechCardSkeleton />
            <MyTechCardSkeleton />
          </SectionBlock>
        ) : error ? (
          <SectionBlock heading="Error">
            <p>Failed to load technologies. Please try again later.</p>
          </SectionBlock>
        ) : (
          <MyTechnologies
            router={router}
            myTechnologies={myTechnologiesData?.myTechnologyDetails}
          />
        )}
      </Col>
    </Row>
  );
};

export default LandingPage;
