import * as React from 'react';
import styled from 'styled-components';
import constants from './constants';
import withPopup from './withPopup';

/**
 * A CSS grid container div
 * @prop {Number} columns - The number of columns
 */
export const GridContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(2rem, auto)
  );
  column-gap: 1px;
  border: 1px solid ${constants.DARK_GREEN};
  width: 100%;
  box-sizing: border-box;
`;

export interface RowProps {
  rowNum?: number,
  content: string[],
}

/**
 * Row that renders content into basic Cells. 
 */
export const ContentRow = (props: RowProps) => {
  const cells = props.content.map((content) => <Cell>{content}</Cell>);
  return <>{cells}</>;
};

/**
 * Row that renders content into HeaderCells. 
 */
export const HeaderRow = (props: RowProps) => {
  const cells = props.content.map((header) => (
    <HeaderCell>{header}</HeaderCell>
  ));
  return <>{cells}</>;
};


//interface TopicListConfigProps {
//  popup: {
//    cleanUpPolicy: string;
//    minInsyncReplicas: string;
//    messageTimeStampType: string;
//    compressionType: string;
//  };
//}

//const TopicConfigInfo = (props: TopicListConfigProps) => {
//  console.log("from ConfigInfo", props);
//  const { cleanUpPolicy, minInsyncReplicas, messageTimeStampType, compressionType } = props.popup;
//  const configInfo = ["Clean Up Policy:", cleanUpPolicy, "Min Insyc Replicas:", minInsyncReplicas, "Time Stamp:", messageTimeStampType, "Compression Type:", compressionType];
//  return (
//    null
//    // <div>
//    //   <strong>Clean Up Policy</strong>
//    //   <ConfigInfoRow>{props.popup.cleanUpPolicy}</ConfigInfoRow>
//    //   <strong>Min Insync Replicas</strong>
//    //   <ConfigInfoRow>{props.popup.minInsyncReplicas}</ConfigInfoRow>
//    //   <strong>Message Time Stamp Type</strong>
//    //   <ConfigInfoRow>{props.popup.messageTimeStampType}</ConfigInfoRow>
//    //   <strong>Compression Type</strong>
//    //   <ConfigInfoRow>{props.popup.compressionType}</ConfigInfoRow>
//    // </div>
//    //<ContentRow content={configInfo}></ContentRow>
//  );
//};

const ConfigInfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

interface RowWithConfigProps extends RowProps {
  configInfo?: string[],
  popup?: React.ReactElement
}

export const TopicRow = (props: RowWithConfigProps) => {
  const cells = props.content.map((content, index) => {
    if (index === 0) {
      return withPopup(
        <AltBGCellwithPointer rowNum={props.rowNum}>{content}</AltBGCellwithPointer>,
        props.popup
      );
    } else {
      return <AltBGCell rowNum={props.rowNum}>{content}</AltBGCell>;
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
      return withPopup(
        <AltBGCellwithPointer rowNum={props.rowNum}>{content}</AltBGCellwithPointer>,
        <BrokerConfigInfo popup={props.configInfo[props.content[0]]} />
      );
    } else {
      return <AltBGCell rowNum={props.rowNum}>{content}</AltBGCell>;
    }
  });
  return <>{cells}</>;
};

interface CellProps {
  backgroundColor?: string,
  color?: string,
}

/**
 * Basic div to act as a cell for CSS grid components.
 * Default appearance is white BG with black text and content centered.
 */
const Cell = styled.div<CellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.backgroundColor || 'white'};
  color: ${props => props.color || 'black'};
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

interface AltBGCellProps extends CellProps {
  rowNum: number
}

/**
 * Cell with alternating background color for alternating row colors.
 * Colors are hard-coded for now.
 */
const AltBGCell = styled(Cell) <AltBGCellProps>`
  background-color: ${props => props.rowNum % 2 === 1 ? constants.DARK_GREY_GREEN : constants.GREY_GREEN};
  color: white;
`;

const AltBGCellwithPointer = styled(AltBGCell)`cursor: pointer;`;

/**
 * Header cell for grid with alternating rows.
 */
const HeaderCell = styled(Cell)`
  background-color: white;
  color: ${constants.DARK_GREEN};
`;
