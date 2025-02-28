import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaRedo, FaLightbulb, FaEye, FaTrophy, FaSearchMinus, FaSearchPlus, FaMobile, FaDesktop, FaExpand } from 'react-icons/fa';

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary : 
    variant === 'secondary' ? theme.colors.secondary : 
    variant === 'accent' ? theme.colors.accent : 
    theme.colors.background};
  color: ${({ theme, variant }) => 
    variant === 'primary' || variant === 'secondary' || variant === 'accent' 
      ? '#ffffff' 
      : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`;

const GameControls = ({ 
  onNewGame, 
  onDrawOne, 
  onDrawThree,
  onToggleHints,
  onShowHighScores,
  onToggleCardSize,
  showHints,
  cardSize,
  deckEmpty
}) => {
  // Get appropriate icon for current card size
  const getSizeIcon = () => {
    switch (cardSize) {
      case 'small': return <FaSearchMinus />;
      case 'medium': return <FaDesktop />;
      case 'large': return <FaSearchPlus />;
      default: return <FaDesktop />;
    }
  };
  
  // Get appropriate label for current card size
  const getSizeLabel = () => {
    switch (cardSize) {
      case 'small': return 'Small';
      case 'medium': return 'Medium';
      case 'large': return 'Large';
      default: return 'Medium';
    }
  };
  
  return (
    <ControlsContainer>
      <Button variant="primary" onClick={onNewGame}>
        <FaRedo />
        <span>New Game</span>
      </Button>
      
      <Button variant="secondary" onClick={onDrawOne} disabled={deckEmpty}>
        <FaPlus />
        <span>Draw 1</span>
      </Button>
      
      <Button variant="secondary" onClick={onDrawThree} disabled={deckEmpty}>
        <FaPlus />
        <span>Draw 3</span>
      </Button>
      
      <Button variant={showHints ? 'accent' : undefined} onClick={onToggleHints}>
        {showHints ? <FaEye /> : <FaLightbulb />}
        <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
      </Button>
      
      <Button onClick={onToggleCardSize}>
        {getSizeIcon()}
        <span>{getSizeLabel()}</span>
      </Button>
      
      <Button onClick={onShowHighScores}>
        <FaTrophy />
        <span>High Scores</span>
      </Button>
    </ControlsContainer>
  );
};

export default GameControls;