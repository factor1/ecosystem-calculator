import React, { useState, Component } from "react";

interface GlobalContextProps {
  children: React.ReactChild;
}

interface ContextState {
  fleetSize: number | null;
  averageWage: number | null;
  fuelCost: number | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
}

interface ContextValues {
  fleetSize: number | null;
  averageWage: number | null;
  fuelCost: number | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
  handleFormSubmit: (values: FormValues) => void;
}

interface FormValues {
  fuelCost: number | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
}

export const CalculatorContext = React.createContext<ContextValues>({
  fleetSize: null,
  averageWage: null,
  fuelCost: null,
  hoursWorkedPerDay: null,
  averageDailyMiles: null,
  daysWorkedPerMonth: null,
  averageDailyIdling: null,
  yearlyInsurancePremium: null,
  averageVehicleMPG: null,
  insuranceDeductible: null,
  accidentsPerYear: null,
  handleFormSubmit: () => null
});

export class ContextProvider extends Component<
  GlobalContextProps,
  ContextState
> {
  constructor(props: GlobalContextProps) {
    super(props);

    this.state = {
      fleetSize: null,
      averageWage: null,
      fuelCost: 0,
      hoursWorkedPerDay: 8,
      averageDailyMiles: 80,
      daysWorkedPerMonth: 20,
      averageDailyIdling: 120,
      yearlyInsurancePremium: 985,
      averageVehicleMPG: 18,
      insuranceDeductible: 500,
      accidentsPerYear: 5
    };
  }

  handleFormSubmit = (values: FormValues) => {
    return this.setState({ ...values });
  };

  render() {
    const {
      fleetSize,
      averageWage,
      fuelCost,
      hoursWorkedPerDay,
      averageDailyMiles,
      daysWorkedPerMonth,
      averageDailyIdling,
      yearlyInsurancePremium,
      averageVehicleMPG,
      insuranceDeductible,
      accidentsPerYear
    } = this.state;
    return (
      <CalculatorContext.Provider
        value={{
          fleetSize,
          averageWage,
          fuelCost,
          hoursWorkedPerDay,
          averageDailyMiles,
          daysWorkedPerMonth,
          averageDailyIdling,
          yearlyInsurancePremium,
          averageVehicleMPG,
          insuranceDeductible,
          accidentsPerYear,
          handleFormSubmit: this.handleFormSubmit
        }}
      >
        {this.props.children}
      </CalculatorContext.Provider>
    );
  }
}
