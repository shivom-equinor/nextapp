import React, { useRef } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { ITechnologyDetails } from "../../api/models";
import {
  technologyStatus,
  currentTRLNotApplicable,
} from "../_shared/constants";
import {
  colors,
  whitespace,
  textColor,
  interactiveColors,
  transitions,
  borderColors,
  errorColors,
  numericValue,
} from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import Tag from "../_shared/Tag";
import ClickableArea from "../../helpers/ClickableArea";
import { getNormalContent } from "./HelpFunctions";
import SearchContent from "./_shared/SearchContent";
import ContentWithHighlightedSearchText from "./_shared/ContentWithHighlightedSearchText";

interface SolutionTileProps {
  technology: ITechnologyDetails;
  searchText?: string;
}

interface DateProps {
  isOverDue?: boolean;
}

const ClickableCard = styled<any>(ClickableArea)`
  display: flex;
  border: ${remCalc(0.96)} solid ${borderColors.standard};
  margin-bottom: ${whitespace.xs};
  padding: ${whitespace.xs};
  transition: ${transitions.bgHover};
  cursor: pointer;
  border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
  box-sizing: border-box;
  border-radius: ${remCalc(4.8)};

  :hover {
    text-decoration: none;
    color: ${textColor};
    background-color: ${interactiveColors.bgHover};

    *:after,
    *:before {
      border-color: ${colors.slateBlue.standardTransparent} !important;
    }
  }

  :hover,
  :focus {
    border-color: ${colors.slateBlue.standard};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${remCalc(14)};
`;

const DetailsLine = styled.div`
  display: flex;
  line-height: 1rem;
  position: relative;
`;

const MetaData = styled.span`
  align-self: center;
`;

const MetaDataSeparator = styled.span`
  padding: ${remCalc(0)} ${whitespace.xs};
`;

const KeepSecretText = styled.span`
  font-weight: ${numericValue.value500};
  color: ${colors.red.energic};
  padding-left: ${whitespace.xxs};
`;

const Heading = styled.h3`
  line-height: 1.2rem;
  font-size: ${remCalc(16)};
  margin: ${whitespace.xs} ${remCalc(0)};
`;

const HeadingLink = styled(Link)`
  color: ${textColor};
  text-decoration: none;

  :hover {
    color: ${textColor};
    text-decoration: none;
  }
`;

const Description = styled.p`
  line-height: 1.2rem;
  margin-bottom: ${whitespace.xs};
`;

const NextSDG = styled.div`
  display: flex;
  padding-right: ${whitespace.l};
`;

const Label = styled.h6`
  margin-bottom: ${remCalc(0)};
  font-size: ${remCalc(14)};
  font-weight: ${numericValue.value500};
`;

const OverdueDateStyle = css`
  color: ${errorColors.text};
  font-weight: ${numericValue.value500};
`;

const NextSDGDate = styled.span<DateProps>`
  padding-left: ${whitespace.xs};
  ${(props) => props.isOverDue && OverdueDateStyle}
`;

const TechCategoryWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const TechCategory = styled.span`
  padding-left: ${whitespace.xxs};
  flex: 1;
`;

const NoData = styled.span`
  padding-left: ${whitespace.xs};
  font-size: ${remCalc(24)};
`;

const SolutionTile = ({ technology, searchText }: SolutionTileProps) => {
  const linkRef: any = useRef();

  const {
    status,
    currentStage,
    techId,
    trl,
    communication,
    technologyName,
    technologyPageURL,
    purpose,
    description,
    nextTDGDate,
    isNextTDGOverDue,
    projectCategories,
  } = technology;

  const getContentWithoutSearch: string =
    purpose?.trim().length > 0 || description?.trim().length > 0
      ? getNormalContent(purpose.concat(" " + description)) // Merge purpose & description
      : "";

  const getSearchedContent: JSX.Element | string =
    searchText &&
    (purpose?.trim().length > 0 || description?.trim().length > 0) ? (
      <SearchContent
        content={purpose.concat(" " + description)}
        searchText={searchText}
      /> // Merge purpose & description
    ) : (
      ""
    );

  return (
    <ClickableCard linkRef={linkRef} type="div">
      <Content>
        <DetailsLine>
          {/* Status */}
          {status && (
            <Tag
              label={status}
              backgroundColor={
                status.toLowerCase().trim() === technologyStatus.stopped ||
                status.toLowerCase().trim() === technologyStatus.replaced ||
                status.toLowerCase().trim() === technologyStatus.obsolete
                  ? colors.red.energic
                  : colors.lichenGreen.standard
              }
            />
          )}

          {/* Current stage */}
          {currentStage && <Tag label={currentStage} />}

          {/* Solution ID, TRL level and Keep secret */}
          <MetaData>
            {techId && (
              <>
                {searchText ? (
                  <ContentWithHighlightedSearchText
                    content={techId}
                    searchText={searchText}
                  />
                ) : (
                  techId
                )}
              </>
            )}
            {trl &&
              (techId ? (
                <>
                  <MetaDataSeparator>|</MetaDataSeparator>
                  {trl.trim().toLowerCase() ===
                  currentTRLNotApplicable.toLowerCase()
                    ? trl
                    : `TRL${trl}`}
                </>
              ) : trl.trim().toLowerCase() ===
                currentTRLNotApplicable.toLowerCase() ? (
                trl
              ) : (
                `TRL${trl}`
              ))}
            {communication && (
              <>
                {techId || trl ? <MetaDataSeparator>|</MetaDataSeparator> : ""}
                <KeepSecretText>{communication}</KeepSecretText>
              </>
            )}
          </MetaData>
        </DetailsLine>

        {/* Solution name */}
        {technologyName && (
          <Heading>
            <HeadingLink href={`${technologyPageURL}/summary`} prefetch={false}>
              {searchText ? (
                <ContentWithHighlightedSearchText
                  content={technologyName}
                  searchText={searchText}
                />
              ) : (
                technologyName
              )}
            </HeadingLink>
          </Heading>
        )}

        {/* Problem description & proposed solution/outcome */}
        {/**
         * When - searchText has value show content including searched text with highlight
         * Else - show normal content without highlight
         **/}
        {searchText
          ? getSearchedContent && (
              <Description>{getSearchedContent}</Description>
            )
          : getContentWithoutSearch.trim().length > 0 && (
              <Description>{getContentWithoutSearch}</Description>
            )}

        <DetailsLine>
          {/* Next SDG */}
          <NextSDG>
            <Label>Next SDG:</Label>
            {nextTDGDate ? (
              isNextTDGOverDue && isNextTDGOverDue === "1" ? (
                <NextSDGDate isOverDue={true}>
                  {nextTDGDate} (Overdue)
                </NextSDGDate>
              ) : (
                <NextSDGDate>{nextTDGDate}</NextSDGDate>
              )
            ) : (
              <NoData>-</NoData>
            )}
          </NextSDG>

          {/* Project category */}
          <TechCategoryWrapper>
            <Label>Project category:</Label>
            {projectCategories ? (
              <TechCategory>{projectCategories.join(", ")}</TechCategory>
            ) : (
              <NoData>-</NoData>
            )}
          </TechCategoryWrapper>
        </DetailsLine>
      </Content>
    </ClickableCard>
  );
};

export default SolutionTile;
