import * as React from "react";
import styled from "styled-components";
import constants from "./constants";
import Popup from "reactjs-popup";

/**
 * Outer container for the grid section.
 * Element hierarchy is something like:
 * <GridSectionContainer>
 *    <StyledGridTitle />
 *    <GridContainer />
 * </GridSectionContainer>
 */
export const GridSectionContainer = styled.div`
  width: calc(100% - 2rem);
  max-width: 50rem;
  overflow-x: auto;
  margin: 1rem 0;
`;

/**
 * A CSS grid container div
 * @prop {Number} columns - The number of columns
 */
// Typescript styled-components requires you to specify custom props
// https://styled-components.com/docs/api#using-custom-props
export const GridContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(2rem, auto)
  );
  border: 1px solid ${constants.DARKER_GREEN};
  width: 100%;
  box-sizing: border-box;
`;

interface RowProps {
  rowNum?: number,
  content: string[],
}

interface RowWithConfigProps extends RowProps {
  configInfo?: string[],
}

export const HeaderRow = (props: RowProps) => {
  const cells = props.content.map((header) => (
    <HeaderCell>{header}</HeaderCell>
  ));
  return <>{cells}</>;
};

export const ContentRow = (props: RowProps) => {
  const cells = props.content.map((content) => <Cell rowNum={props.rowNum}>{content}</Cell>);

  return <>{cells}</>;
};

interface TopicListConfigProps {
  [popup: string]: {
    cleanUpPolicy: string;
    minInsyncReplicas: string;
    messageTimeStampType: string;
    compressionType: string;
  };
}

const TopicConfigInfo = (props: TopicListConfigProps) => {
  console.log("from ConfigInfo", props);
  return (
    <div>
      <strong>Clean Up Policy</strong>
      <ConfigInfoRow>{props.popup.cleanUpPolicy}</ConfigInfoRow>
      <strong>Min Insync Replicas</strong>
      <ConfigInfoRow>{props.popup.minInsyncReplicas}</ConfigInfoRow>
      <strong>Message Time Stamp Type</strong>
      <ConfigInfoRow>{props.popup.messageTimeStampType}</ConfigInfoRow>
      <strong>Compression Type</strong>
      <ConfigInfoRow>{props.popup.compressionType}</ConfigInfoRow>
    </div>
  );
};

const ConfigInfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopicRow = (props: RowWithConfigProps) => {
  const cells = props.content.map((content, index) => {
    if (index === 0) {
      return (
        <CellWithPopup rowNum={props.rowNum}
          popup={<TopicConfigInfo popup={props.configInfo[props.content[0]]} />}
        >
          {content}
        </CellWithPopup>
      );
    } else {
      return <Cell rowNum={props.rowNum}>{content}</Cell>;
    }
  });
  return <>{cells}</>;
};

interface BrokerListConfigProps {
  [popup: string]: {
    backgroundThreads: string;
    compressionType: string;
    logDir: string;
    logRetentionHours: string;
    messageMaxBytes: string;
    minInsyncReplicas: string;
    zookeeperConnect: string;
  };
}

const BrokerConfigInfo = (props: BrokerListConfigProps) => {
  console.log("from ConfigInfo", props);
  return (
    <div>
      <strong>Background Threads</strong>
      <ConfigInfoRow>{props.popup.backgroundThreads}</ConfigInfoRow>
      <strong>Compression Type</strong>
      <ConfigInfoRow>{props.popup.compressionType}</ConfigInfoRow>
      <strong>Log Directory</strong>
      <ConfigInfoRow>{props.popup.logDir}</ConfigInfoRow>
      <strong>Log Retention Hours</strong>
      <ConfigInfoRow>{props.popup.logRetentionHours}</ConfigInfoRow>
      <strong>Message Max Bytes</strong>
      <ConfigInfoRow>{props.popup.messageMaxBytes}</ConfigInfoRow>
      <strong>Min Insync Replicas</strong>
      <ConfigInfoRow>{props.popup.minInsyncReplicas}</ConfigInfoRow>
      <strong>Zookeeper Connect</strong>
      <ConfigInfoRow>{props.popup.zookeeperConnect}</ConfigInfoRow>
    </div>
  );
};

export const BrokerRow = (props: RowWithConfigProps) => {
  const cells = props.content.map((content, index) => {
    if (index === 0) {
      return (
        <CellWithPopup rowNum={props.rowNum} popup={<BrokerConfigInfo popup={props.configInfo[props.content[0]]} />}
        >
          {content}
        </CellWithPopup>
      );
    } else {
      return <Cell rowNum={props.rowNum}>{content}</Cell>;
    }
  });
  return <>{cells}</>;
};

const Cell = styled.div<{rowNum?: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.rowNum % 2 === 1 ? constants.DARKER_GREEN : constants.GREY_GREEN};
  color: white;
  box-sizing: border-box;
`;

const HeaderCell = styled(Cell)`
  font-weight: 400;
  background-color: white;
  color: ${constants.DARKER_GREEN};
`;

interface CellWithPopupProps {
  children: string;
  popup: React.ReactElement;
  rowNum: number;
}

const CellWithPopup = (props: CellWithPopupProps) => {
  return (
    <Popup trigger={<Cell rowNum={props.rowNum}>{props.children}</Cell>} position="right center">
      {props.popup}
    </Popup>
  );
};
