import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export const useCardContext = () => {
  return useContext(CardContext);
};

export const CardProvider = ({ children }) => {
  const [dashboardCards, setDashboardCards] = useState([]);

  const handleCardSave = (data) => {
    setDashboardCards((prevData) => [...prevData, data]);
  };

  const value = {
    dashboardCards,
    handleCardSave,
    setDashboardCards
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
