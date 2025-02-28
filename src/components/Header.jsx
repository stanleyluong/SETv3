import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.navBackground};
  color: white;
  padding: 8px 12px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubTitle = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 300;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <Logo>SET Card Game</Logo>
        <SubTitle>Find patterns to make a SET</SubTitle>
      </div>
      <Links>
        <IconLink href="https://github.com/stanleyluong/SETv2" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </IconLink>
      </Links>
    </HeaderContainer>
  );
};

export default Header;