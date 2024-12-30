import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { colors, numericValue } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import { TILE_VIEW, TABLE_VIEW } from "./constants";

interface ToggleButtonProps {
  defaultView: string;
  handleToggleChange: (selectedView: string) => void;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;

  input[type="radio"] {
    display: none;
    position: absolute;
    width: ${numericValue.value100}%;
    appearance: none;
  }

  input[type="radio"]:checked + label {
    background: ${colors.mossGreen.standard};
    color: white;
  }

  label {
    display: block;
    background: none;
    color: ${colors.slateBlue.standard};
    padding: ${remCalc(5)} ${remCalc(25)};
    border: ${remCalc(0.96)} solid ${colors.slateBlue.sb50};
    cursor: pointer;
    font-size: ${remCalc(14)};
    font-weight: ${numericValue.value500};

    :hover {
      background: ${colors.lichenGreen.lg50};
    }
  }

  div:first-of-type > label {
    border-top-left-radius: ${remCalc(4.8)};
    border-bottom-left-radius: ${remCalc(4.8)};
    border-right: ${remCalc(0)};
  }

  div:last-of-type > label {
    border-top-right-radius: ${remCalc(4.8)};
    border-bottom-right-radius: ${remCalc(4.8)};
  }
`;

const ToggleOption = styled.div`
  position: relative;
  display: block;
  text-align: center;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  defaultView,
  handleToggleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultView);

  useEffect(() => {
    setSelectedOption(defaultView);
  }, [defaultView]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.currentTarget.value);
    handleToggleChange(e.currentTarget.value);
  };

  return (
    <Wrapper>
      <ToggleOption>
        <input
          type="radio"
          id="tile-view-rd"
          name="toggle-button"
          value={TILE_VIEW}
          checked={selectedOption === TILE_VIEW}
          onChange={(e) => handleToggle(e)}
        />
        <label>Tile view</label>
      </ToggleOption>
      <ToggleOption>
        <input
          type="radio"
          id="table-view-rd"
          name="toggle-button"
          value={TABLE_VIEW}
          checked={selectedOption === TABLE_VIEW}
          onChange={(e) => handleToggle(e)}
        />
        <label>Table view</label>
      </ToggleOption>
    </Wrapper>
  );
};

export default ToggleButton;
