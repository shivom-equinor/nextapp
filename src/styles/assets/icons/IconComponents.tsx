import React from "react";

import { ReactComponent as Flag } from "./flag.svg";
import { ReactComponent as Connect } from "./connect.svg";
import { ReactComponent as Book } from "./book.svg";
import { ReactComponent as Improvement } from "./improvement.svg";

interface IconLibraryProps {
  iconName: string;
}

const IconLibrary: React.FC<IconLibraryProps> = ({ iconName }) => {
  switch (iconName) {
    case "flag":
      return <Flag />;
    case "book":
      return <Book />;
    case "connect":
      return <Connect />;
    case "improvement":
      return <Improvement />;
    default:
      const imageName = iconName && require(`../img/${iconName}`);
      return imageName && <img alt="" src={imageName} width="24" />;
  }
};

export default IconLibrary;
