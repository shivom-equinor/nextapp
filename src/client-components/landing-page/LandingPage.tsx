"use client";

import React, { useEffect, useState } from "react";
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

const LandingPage: React.FC<any> = ({ data }: any) => {
  const router = useRouter();
  const [myTechnologies, setMyTechnologies] = useState<any>([]);
  const [isFetchingTechList, setIsFetchingTechList] = useState(true);

  useEffect(() => {
    getMyTechnologies().then((data: any) => {
      setMyTechnologies(data);
      setIsFetchingTechList(false);
    });
  }, []);

  return (
    <Row>
      <Col lg={8}>
        <SearchField router={router} />
      </Col>
      <Col lg={4}>
        <RegisterTechnology />
      </Col>
      <Col lg={8}>
        {isFetchingTechList ? (
          <>
            <SectionBlock heading="My solutions">
              <MyTechTabSkeleton />
              <MyTechCardSkeleton />
              <MyTechCardSkeleton />
              <MyTechCardSkeleton />
            </SectionBlock>
          </>
        ) : (
          <MyTechnologies
            router={router}
            myTechnologies={myTechnologies?.myTechnologyDetails}
          />
        )}
      </Col>
    </Row>
  );
};

export default LandingPage;
