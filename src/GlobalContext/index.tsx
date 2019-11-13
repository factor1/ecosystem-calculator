import React, { useState, ProviderProps, ProviderExoticComponent } from "react";

interface GlobalContextProps {
  children: React.ReactChild;
}

export const CalculatorContext = React.createContext({});

export const ContextProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [fleetSize, setFleetSize] = useState(null);
  const [averageWage, setAverageWage] = useState(null);
  return (
    <CalculatorContext.Provider
      value={{
        fleetSize,
        setFleetSize,
        averageWage,
        setAverageWage
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
