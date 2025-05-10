import React from 'react';
import styled from 'styled-components';
import Card from './Card';

// Grid with responsive columns based on card size
const Grid = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  align-items: stretch;
  justify-items: stretch;
  border: 2px dashed #00f; /* DEBUG: Remove after confirming layout */
  
  /* Always use 4 columns and 3 rows for 12 or fewer cards, and set height */
  ${props => props.$cardCount <= 12 && `
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 80vh;
  `}
  
  /* ===== SMALL ===== */
  ${props => props.$cardSize === 'small' && props.$cardCount > 12 && `
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    @media (max-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
  `}
  
  /* ===== MEDIUM ===== */
  ${props => props.$cardSize === 'medium' && props.$cardCount > 12 && `
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  `}
  
  /* ===== LARGE ===== */
  ${props => props.$cardSize === 'large' && props.$cardCount > 12 && `
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  `}

  @media (max-width: 700px) {
    ${props => props.$cardCount <= 12 && `
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: repeat(4, 1fr) !important;
      height: 95vh !important;
      max-width: 98vw !important;
    `}
  }
`;

// Simple card container
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardGrid = ({ 
  cards, 
  selectedCards, 
  correctSet, 
  incorrectSet, 
  onCardClick,
  cardSize = 'medium'
}) => {
  return (
    <Grid $cardCount={cards.length} $cardSize={cardSize}>
      {cards.map((card, index) => (
        <CardContainer key={`${card.img}-${index}`}>
          <Card
            card={card}
            width="100%"
            isSelected={selectedCards.includes(card)}
            isCorrect={correctSet && correctSet.includes(card)}
            isIncorrect={incorrectSet && incorrectSet.includes(card)}
            cardSize={cardSize}
            onClick={onCardClick}
          />
        </CardContainer>
      ))}
    </Grid>
  );
};

export default CardGrid;