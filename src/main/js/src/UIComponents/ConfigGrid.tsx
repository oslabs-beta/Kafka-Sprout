import React from 'react';
import styled from 'styled-components';
import constants from './constants';
import { GridContainer, RowProps, Cell } from './Grid';

export const ConfigGrid = styled(GridContainer)`
  row-gap: 1px;
  background-color: ${constants.DARK_GREEN};
`;

export const ConfigRow = (props: RowProps) => {
  const cells = props.content.map((content) => <ConfigCell>{content}</ConfigCell>);
  return <>{cells}</>;
};

const ConfigCell = styled(Cell)`
`;