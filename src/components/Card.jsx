import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: 100%;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-3px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: ${({ theme, $cardSize }) => 
      $cardSize === 'large' 
        ? theme.borderRadius.md 
        : $cardSize === 'small' 
          ? theme.borderRadius.xs 
          : theme.borderRadius.sm};
    border: ${({ $status, theme, $cardSize }) => {
      const color = $status === 'selected' 
        ? theme.colors.selectedCard 
        : $status === 'correct' 
          ? theme.colors.correctSet 
          : $status === 'incorrect' 
            ? theme.colors.incorrectSet 
            : theme.colors.cardBackground;
      
      // Border thickness based on size
      const thickness = $cardSize === 'large' 
        ? '3px' 
        : $cardSize === 'small' 
          ? '1px' 
          : '2px';
      
      return `${thickness} solid ${color}`;
    }};
    box-shadow: ${({ theme, $cardSize }) => 
      $cardSize === 'large' 
        ? theme.shadows.md 
        : $cardSize === 'small' 
          ? 'none' 
          : theme.shadows.sm};
    transition: border-color ${({ theme }) => theme.transitions.fast};
  }
`;

// Function to get the base URL - handles both development and production
const getBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use the correct base path
  return import.meta.env.BASE_URL || '/SETv3/';
};

const Card = ({ 
  card, 
  width, 
  isSelected, 
  isCorrect, 
  isIncorrect, 
  onClick,
  cardSize = 'medium',
  className
}) => {
  let status = 'default';
  if (isSelected) status = 'selected';
  if (isCorrect) status = 'correct';
  if (isIncorrect) status = 'incorrect';

  // Get the base URL for assets
  const baseUrl = getBaseUrl();

  return (
    <CardWrapper 
      width={width} 
      $status={status}
      $cardSize={cardSize}
      className={className}
      onClick={() => onClick(card)}
    >
      <img 
        src={`${baseUrl}images/${card.img}`} 
        alt={`${card.number} ${card.shading} ${card.color} ${card.shape}`} 
      />
    </CardWrapper>
  );
};

export default Card;