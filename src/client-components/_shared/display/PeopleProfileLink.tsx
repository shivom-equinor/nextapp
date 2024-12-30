import React from "react";

import Link from "../links/Link";

export interface PeopleProfileLinkProps {
  myProfileUrl: string | undefined;
  name: string | undefined;
}

const PeopleProfileLink: React.FC<PeopleProfileLinkProps> = ({
  myProfileUrl,
  name,
}) => {
  return (
    <>
      {name &&
        (myProfileUrl ? (
          <Link to={myProfileUrl} external={true} withExternalIcon={true}>
            {name}
          </Link>
        ) : (
          <span>{name}</span>
        ))}
    </>
  );
};

export default PeopleProfileLink;
