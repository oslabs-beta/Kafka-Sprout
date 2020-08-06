import styled from 'styled-components';

/**
 * Outer container for the grid title section.
 * Horizontal flex container where items are vertically aligned
 * and have margins between them
 */
export const GridTitleContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 1rem;
  }
`;

/**
 * Inline h3 element
 */
export const GridTitle = styled.h3<{children: string}>`
  display: inline-block;
`;