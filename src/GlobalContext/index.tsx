import React, { useState, ProviderProps, ProviderExoticComponent } from "react";

interface GlobalContextProps {
  children: React.ReactChild;
}

export const CalculatorContext = React.createContext<{
  fleetSize: number | null;
  setFleetSize: Function;
  averageWage: number | null;
  setAverageWage: Function;
}>({
  fleetSize: null,
  setFleetSize: () => null,
  averageWage: null,
  setAverageWage: () => null
});

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
