import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 5px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  margin-top: auto;
`;

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <Header />
      <Content>{children}</Content>
      <Footer>
        &copy; {new Date().getFullYear()} SET Card Game | Developed by Stanley Luong
      </Footer>
    </MainContainer>
  );
};

export default Layout;