import React from 'react';
import styled from 'styled-components';
import Card from './Card';

// Grid with responsive columns based on card size
const Grid = styled.div`
  display: grid;
  padding: 5px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  /* ===== MEDIUM SIZE (DEFAULT) ===== */
  /* Medium size - balanced 4-column layout for wider screens (3x4 for 12 cards) */
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  /* Medium - mobile - 3-column layout (4x3 for 12 cards) */
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  /* ===== SMALL SIZE ===== */
  ${props => props.cardSize === 'small' && `
    /* Small size - 6-column layout for wider screens (2x6 for 12 cards) */
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    max-width: 1000px;
    
    @media (max-width: 576px) {
      /* Small - mobile - 4-column layout (3x4 for 12 cards) */
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    
    /* Ensure balanced grid for initial 12 cards */
    ${props.cardCount <= 12 ? `
      @media (min-width: 992px) {
        grid-template-columns: repeat(6, 1fr); /* 2 rows x 6 columns */
      }
    ` : ''}
    
    /* More cards - adjust grid */
    ${props.cardCount > 12 && props.cardCount <= 18 ? `
      @media (min-width: 992px) {
        grid-template-columns: repeat(6, 1fr); /* 3 rows x 6 columns */
      }
    ` : ''}
    
    ${props.cardCount > 18 ? `
      grid-template-columns: repeat(6, 1fr);
      
      @media (min-width: 992px) {
        grid-template-columns: repeat(6, 1fr);
      }
    ` : ''}
  `}
  
  /* ===== LARGE SIZE ===== */
  ${props => props.cardSize === 'large' && `
    /* Large - 3-column layout (4x3 for 12 cards) */
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 1400px;
    
    @media (max-width: 576px) {
      /* Large - mobile - 2-column layout (6x2 for 12 cards) */
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    /* Ensure balanced grid for initial 12 cards */
    ${props.cardCount <= 12 ? `
      @media (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr); /* 4 rows x 3 columns */
      }
    ` : ''}
    
    /* More cards, maintain balance */
    ${props.cardCount > 12 && props.cardCount <= 16 ? `
      @media (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr); /* 4 rows x 4 columns */
      }
    ` : ''}
  `}
  
  /* ===== MEDIUM WITH LOTS OF CARDS ===== */
  ${props => props.cardSize === 'medium' && props.cardCount > 16 && `
    grid-template-columns: repeat(4, 1fr);
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(5, 1fr);
    }
    
    ${props.cardCount > 25 ? `
      @media (min-width: 992px) {
        grid-template-columns: repeat(6, 1fr);
      }
    ` : ''}
  `}
`;

// Simple card container
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <Grid cardCount={cards.length} cardSize={cardSize}>
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