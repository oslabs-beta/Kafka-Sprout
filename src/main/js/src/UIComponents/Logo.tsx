import React from 'react';
import styled from 'styled-components';
import logoWithTitle from '../assets/kafka_sprout_title.svg';
import logo from '../assets/kafka_sprout_logo.svg';

export const LogoWithTitle = (props) => {
  return <Image src={logoWithTitle} styles={props.styles} />;
}

export const Logo = (props) => {
  return <Image src={logo} styles={props.styles} />;
}

const Image = styled.img<{styles: string}>`
  ${props => props.styles}
`;