import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  margin-top: 8px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 4px;
`;

const SetsGrid = styled.div`
  display: grid;
  gap: 8px;
  padding: 4px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  /* Fixed 4-column layout */
  grid-template-columns: repeat(4, 1fr);
  
  /* Mobile - 3-column layout */
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  
  /* Small desktop/tablet - 4 columns */
  @media (min-width: 576px) and (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  /* Larger desktop - 5 columns */
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const SetCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 4px;
`;

const CardImages = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  width: 100%;
  
  img {
    width: 33%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const SetDisplay = ({ title, sets }) => {
  if (!sets || sets.length === 0) return null;
  
  // If there are many sets, just show the first few to save space
  const displaySets = sets.length > 8 ? sets.slice(0, 8) : sets;
  
  return (
    <Container>
      <Title>{title} ({sets.length})</Title>
      <SetsGrid>
        {displaySets.map((set, setIndex) => (
          <SetCard key={`set-${setIndex}`}>
            <CardImages>
              {set.map((card, index) => (
                <img 
                  key={`${card.img}-${index}`} 
                  src={`/images/${card.img}`}
                  alt={`${card.number} ${card.shading} ${card.color} ${card.shape}`}
                />
              ))}
            </CardImages>
          </SetCard>
        ))}
      </SetsGrid>
    </Container>
  );
};

export default SetDisplay;