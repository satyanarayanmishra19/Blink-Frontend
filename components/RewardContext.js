import React, { createContext, useState } from 'react';

export const RewardContext = createContext();

export const RewardProvider = ({ children }) => {
  const [rewardPoints, setRewardPoints] = useState(10);

  const incrementReward = (value) => {
    setRewardPoints((prev) => prev + value);
  };

  return (
    <RewardContext.Provider value={{ rewardPoints, incrementReward }}>
      {children}
    </RewardContext.Provider>
  );
};
