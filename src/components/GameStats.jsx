import React, { useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '../utils/gameUtils';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const StatsWrapper = styled.div`
  margin: 8px 0;
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StatsTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const MinimalStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

const MinimalStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing.md};
  }
`;

const StatValue = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme, highlight }) => highlight ? theme.colors.primary : theme.colors.text};
`;

const GameStats = ({ 
  timer, 
  setsFound, 
  cardsRemaining, 
  cardsOnTable, 
  possibleSets,
  wrongSets,
  missedSets,
  hintsUsed
}) => {
  const [showStats, setShowStats] = useState(false);
  
  return (
    <StatsWrapper>
      <StatsHeader onClick={() => setShowStats(!showStats)}>
        <StatsTitle>Game Stats</StatsTitle>
        <MinimalStats>
          <MinimalStatItem>
            <StatLabel>Time:</StatLabel>
            <span>{formatTime(timer)}</span>
          </MinimalStatItem>
          <MinimalStatItem>
            <StatLabel>Sets:</StatLabel>
            <span>{setsFound}</span>
          </MinimalStatItem>
          {showStats ? <FaChevronUp /> : <FaChevronDown />}
        </MinimalStats>
      </StatsHeader>
      
      {showStats && (
        <StatsContainer>
          <StatItem>
            <StatLabel>Time</StatLabel>
            <StatValue>{formatTime(timer)}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Sets Found</StatLabel>
            <StatValue highlight>{setsFound}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Cards Remaining</StatLabel>
            <StatValue>{cardsRemaining}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Cards on Table</StatLabel>
            <StatValue>{cardsOnTable}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Possible Sets</StatLabel>
            <StatValue highlight>{possibleSets}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Wrong Sets</StatLabel>
            <StatValue>{wrongSets}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Missed Sets</StatLabel>
            <StatValue>{missedSets}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Hints Used</StatLabel>
            <StatValue>{hintsUsed}</StatValue>
          </StatItem>
        </StatsContainer>
      )}
    </StatsWrapper>
  );
};

export default GameStats;