import React, { Component } from "react";
import axios from "axios";
import sum from "lodash/sum";

interface GlobalContextProps {
  children: React.ReactChild;
}

interface ContextState {
  fleetSize: number | string | null;
  averageWage: number | string | null;
  fuelCost: number | string | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
  idleCostBefore: number;
  idleCostAfter: number;
  gpsInsightCost: number;
  fuelCostBefore: number;
  fuelCostAfter: number;
  maintenanceBefore: number;
  maintenanceAfter: number;
  productivityLostBefore: number;
  productivityLostAfter: number;
  accidentCostBefore: number;
  accidentCostAfter: number;
  totalCostBefore: number;
  totalCostAfter: number;
  monthlySavings: number;
}

interface ContextValues {
  fleetSize: number | string | null;
  averageWage: number | string | null;
  fuelCost: number | string | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
  handleFormSubmit: (values: FormValues) => void;
  handleInitialFormSubmit: (values: InitialFormValues) => void;
  idleCostBefore: number;
  idleCostAfter: number;
  gpsInsightCost: number;
  fuelCostBefore: number;
  fuelCostAfter: number;
  maintenanceBefore: number;
  maintenanceAfter: number;
  productivityLostBefore: number;
  productivityLostAfter: number;
  accidentCostBefore: number;
  accidentCostAfter: number;
  totalCostBefore: number;
  totalCostAfter: number;
  monthlySavings: number;
}

interface FormValues {
  fuelCost: number | string | null;
  hoursWorkedPerDay: number | null;
  averageDailyMiles: number | null;
  daysWorkedPerMonth: number | null;
  averageDailyIdling: number | null;
  yearlyInsurancePremium: number | null;
  averageVehicleMPG: number | null;
  insuranceDeductible: number | null;
  accidentsPerYear: number | null;
}

interface InitialFormValues {
  fleetSize: number | string;
  averageWage: number | string;
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
  handleFormSubmit: () => null,
  handleInitialFormSubmit: () => null,
  idleCostBefore: 0,
  idleCostAfter: 0,
  gpsInsightCost: 0.0,
  fuelCostBefore: 0.0,
  fuelCostAfter: 0.0,
  maintenanceBefore: 0.0,
  maintenanceAfter: 0.0,
  productivityLostBefore: 0.0,
  productivityLostAfter: 0.0,
  accidentCostBefore: 0.0,
  accidentCostAfter: 0.0,
  totalCostBefore: 0.0,
  totalCostAfter: 0.0,
  monthlySavings: 0.0
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
      averageDailyIdling: 0,
      yearlyInsurancePremium: 985,
      averageVehicleMPG: 18,
      insuranceDeductible: 500,
      accidentsPerYear: 0,
      idleCostBefore: 0,
      idleCostAfter: 0,
      gpsInsightCost: 0.0,
      fuelCostBefore: 0.0,
      fuelCostAfter: 0.0,
      maintenanceBefore: 0.0,
      maintenanceAfter: 0.0,
      productivityLostBefore: 0.0,
      productivityLostAfter: 0.0,
      accidentCostBefore: 0.0,
      accidentCostAfter: 0.0,
      totalCostBefore: 0.0,
      totalCostAfter: 0.0,
      monthlySavings: 0.0
    };
  }

  componentDidMount() {
    this.fetchFuelCost();
  }

  fetchFuelCost = async () => {
    try {
      const response = await axios.get(
        "https://www.fueleconomy.gov/ws/rest/fuelprices"
      );
      if (response && response.data && response.data.regular) {
        const fuelCost = Number(response.data.regular).toFixed(2);
        return this.setState({ fuelCost });
      } else {
        throw new Error("Could not get pricing");
      }
    } catch (error) {
      console.error("There was an error fetching fuel cost. ", error);
    }
  };

  handleFormSubmit = (values: FormValues) => {
    return this.setState({ ...values }, () => this.runCalculations());
  };

  handleInitialFormSubmit = (values: InitialFormValues) =>
    this.setState({ ...values }, () => this.runCalculations());

  runCalculations = () => {
    const initialValues = new Promise(resolve => {
      this.calculateAverageDailyIdling();
      this.calculateIdle();
      this.calculateGPSCost();
      this.calculateFuelCosts();
      this.calculateMaintenance();
      this.calculateProductivity();
      this.calculateAccidentCost();
      this.calculateAccidentsPerYear();
      resolve();
    });

    initialValues.then(() => this.calculateTotals());
  };

  calculateAverageDailyIdling = () => {
    const { fleetSize } = this.state;

    if (!fleetSize) {
      return;
    }

    const averageDailyIdling = Number(fleetSize) * 2;

    return this.setState({ averageDailyIdling });
  };

  calculateIdle = () => {
    const { averageDailyIdling, daysWorkedPerMonth, fleetSize } = this.state;

    if (!averageDailyIdling || !daysWorkedPerMonth || !fleetSize) {
      return;
    }

    const idleCostBefore =
      (averageDailyIdling / 60) * daysWorkedPerMonth * Number(fleetSize) * 0.9;

    const idleCostAfter = idleCostBefore * 0.25;

    return this.setState({ idleCostBefore, idleCostAfter });
  };

  calculateGPSCost = () => {
    const { fleetSize } = this.state;
    if (!fleetSize) {
      return null;
    }
    const gpsInsightCost = -21.95 * Number(fleetSize);

    return this.setState({ gpsInsightCost });
  };

  calculateFuelCosts = () => {
    const {
      fleetSize,
      averageDailyMiles,
      daysWorkedPerMonth,
      averageVehicleMPG,
      fuelCost
    } = this.state;
    if (
      !fleetSize ||
      !averageDailyMiles ||
      !daysWorkedPerMonth ||
      !averageVehicleMPG ||
      !fuelCost
    ) {
      return null;
    }
    const monthlyMileage =
      Number(fleetSize) * averageDailyMiles * daysWorkedPerMonth;
    const gallons = monthlyMileage / averageVehicleMPG;
    const fuelCostBefore = gallons * Number(fuelCost);

    const fuelCostAfter = fuelCostBefore * 0.77;

    return this.setState({ fuelCostBefore, fuelCostAfter });
  };

  calculateMaintenance = () => {
    const { fleetSize, averageDailyMiles, daysWorkedPerMonth } = this.state;

    if (!fleetSize || !averageDailyMiles || !daysWorkedPerMonth) {
      return null;
    }
    const monthlyMileage =
      Number(fleetSize) * averageDailyMiles * daysWorkedPerMonth;
    const maintenanceBefore = 0.1 * monthlyMileage;

    const maintenanceAfter = maintenanceBefore * 0.75;

    this.setState({ maintenanceBefore, maintenanceAfter });
  };

  calculateProductivity = () => {
    const {
      averageWage,
      daysWorkedPerMonth,
      hoursWorkedPerDay,
      fleetSize
    } = this.state;

    if (
      !averageWage ||
      !daysWorkedPerMonth ||
      !hoursWorkedPerDay ||
      !fleetSize
    ) {
      return null;
    }

    const productivityLostBefore =
      Number(averageWage) *
      daysWorkedPerMonth *
      hoursWorkedPerDay *
      0.125 *
      Number(fleetSize);

    const productivityLostAfter = productivityLostBefore / 2;

    return this.setState({ productivityLostBefore, productivityLostAfter });
  };

  calculateAccidentsPerYear = () => {
    const { fleetSize } = this.state;
    if (!fleetSize) {
      return null;
    }

    const accidentsPerYear = Number((Number(fleetSize) * 0.2).toFixed(2));

    return this.setState({ accidentsPerYear });
  };

  calculateAccidentCost = () => {
    const {
      accidentsPerYear,
      insuranceDeductible,
      yearlyInsurancePremium
    } = this.state;

    if (!accidentsPerYear || !insuranceDeductible || !yearlyInsurancePremium) {
      return null;
    }

    const accidentCostBefore =
      accidentsPerYear * insuranceDeductible +
      0.5 * yearlyInsurancePremium * accidentsPerYear;

    const reducedAccidentRate = accidentsPerYear * 0.75;

    const accidentCostAfter =
      reducedAccidentRate * insuranceDeductible +
      reducedAccidentRate * yearlyInsurancePremium * 0.5;

    return this.setState({ accidentCostBefore, accidentCostAfter });
  };

  calculateTotals = () => {
    const {
      gpsInsightCost,
      fuelCostBefore,
      fuelCostAfter,
      maintenanceBefore,
      maintenanceAfter,
      productivityLostBefore,
      productivityLostAfter,
      accidentCostBefore,
      accidentCostAfter,
      idleCostBefore,
      idleCostAfter
    } = this.state;

    const totalCostBefore = sum([
      idleCostBefore,
      fuelCostBefore,
      maintenanceBefore,
      productivityLostBefore,
      accidentCostBefore
    ]);

    const totalCostAfter = sum([
      gpsInsightCost,
      fuelCostAfter,
      maintenanceAfter,
      productivityLostAfter,
      accidentCostAfter,
      idleCostAfter
    ]);

    const monthlySavings = totalCostBefore - totalCostAfter;

    return this.setState({ totalCostBefore, totalCostAfter, monthlySavings });
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
      accidentsPerYear,
      idleCostBefore,
      idleCostAfter,
      gpsInsightCost,
      fuelCostBefore,
      fuelCostAfter,
      maintenanceBefore,
      maintenanceAfter,
      productivityLostBefore,
      productivityLostAfter,
      accidentCostBefore,
      accidentCostAfter,
      totalCostBefore,
      totalCostAfter,
      monthlySavings
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
          handleFormSubmit: this.handleFormSubmit,
          handleInitialFormSubmit: this.handleInitialFormSubmit,
          idleCostBefore,
          idleCostAfter,
          gpsInsightCost,
          fuelCostBefore,
          fuelCostAfter,
          maintenanceBefore,
          maintenanceAfter,
          productivityLostBefore,
          productivityLostAfter,
          accidentCostBefore,
          accidentCostAfter,
          totalCostBefore,
          totalCostAfter,
          monthlySavings
        }}
      >
        {this.props.children}
      </CalculatorContext.Provider>
    );
  }
}
