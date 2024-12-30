"use client";

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";

import SearchField from "./SearchField";
import RegisterTechnology from "./RegisterTechnology";
import MyTechnologies from "./MyTechnologies";
import { getMyTechnologies } from "../../api/technologyAPIs";

const LandingPage: React.FC<any> = ({ data }: any) => {
  const router = useRouter();

  // const [myTechnologies, setMyTechnologies] = useState([]);

  // useEffect(() => {
  //   getMyTechnologies().then((data: any) => {
  //     console.log(data);
  //     setMyTechnologies(data);
  //   });
  // }, []);

  return (
    <Row>
      <Col lg={8}>
        <SearchField router={router} />
      </Col>
      <Col lg={4}>
        <RegisterTechnology />
      </Col>
      <Col lg={8}>
        <MyTechnologies
          router={router}
          myTechnologies={data?.myTechnologyDetails}
        />
      </Col>
    </Row>
  );
};

export default LandingPage;
