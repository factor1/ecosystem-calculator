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
  insideSale: boolean;
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
  insideSale: boolean;
  handleInsideSale: (value: boolean) => void;
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
  monthlySavings: 0.0,
  insideSale: false,
  handleInsideSale: () => null
});

export class ContextProvider extends Component<
  GlobalContextProps,
  ContextState
> {
  constructor(props: GlobalContextProps) {
    super(props);

    this.state = {
      accidentCostAfter: 0.0,
      accidentCostBefore: 0.0,
      accidentsPerYear: null,
      averageDailyIdling: 2,
      averageDailyMiles: 80,
      averageVehicleMPG: 18,
      averageWage: null,
      daysWorkedPerMonth: 20,
      fleetSize: null,
      fuelCost: 0,
      fuelCostAfter: 0.0,
      fuelCostBefore: 0.0,
      gpsInsightCost: 0.0,
      hoursWorkedPerDay: 8,
      idleCostAfter: 0,
      idleCostBefore: 0,
      insuranceDeductible: 500,
      maintenanceAfter: 0.0,
      maintenanceBefore: 0.0,
      monthlySavings: 0.0,
      productivityLostAfter: 0.0,
      productivityLostBefore: 0.0,
      totalCostAfter: 0.0,
      totalCostBefore: 0.0,
      yearlyInsurancePremium: 985,
      insideSale: false
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
    this.setState({ ...values }, () => this.runCalculations());
  };

  handleInitialFormSubmit = (values: InitialFormValues) =>
    this.setState({ ...values }, () => this.runCalculations());

  runCalculations = async () => {
    await this.calculateAccidentsPerYear();
    await this.calculateAverageDailyIdling();
    await this.calculateIdle();
    await this.calculateGPSCost();
    await this.calculateFuelCosts();
    await this.calculateMaintenance();
    await this.calculateProductivity();
    await this.calculateAccidentCost();
    this.calculateTotals();
  };

  calculateAverageDailyIdling = () =>
    new Promise(resolve => {
      const { fleetSize, averageDailyIdling } = this.state;

      if (!fleetSize) {
        console.error("calculateAverageDailyIdling FAILED!");
        return;
      }

      return this.setState({ averageDailyIdling }, () => resolve());
    });

  calculateIdle = () =>
    new Promise(resolve => {
      const { averageDailyIdling, daysWorkedPerMonth, fleetSize } = this.state;

      if (!averageDailyIdling || !daysWorkedPerMonth || !fleetSize) {
        console.error("calculateIdle FAILED!");
        return;
      }

      const idleCostBefore =
        0.9 * averageDailyIdling * Number(fleetSize) * daysWorkedPerMonth;

      const idleCostAfter = idleCostBefore * 0.25;

      return this.setState({ idleCostBefore, idleCostAfter }, () => resolve());
    });

  calculateGPSCost = () =>
    new Promise(resolve => {
      const { fleetSize } = this.state;
      if (!fleetSize) {
        console.error("calculateGPSCost FAILED!");
        return null;
      }
      const gpsInsightCost = 21.95 * Number(fleetSize);

      return this.setState({ gpsInsightCost }, () => resolve());
    });

  calculateFuelCosts = () =>
    new Promise(resolve => {
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
        console.error("calculateFuelCosts FAILED!");
        return null;
      }
      const monthlyMileage =
        Number(fleetSize) * averageDailyMiles * daysWorkedPerMonth;
      const gallons = monthlyMileage / averageVehicleMPG;
      const fuelCostBefore = gallons * Number(fuelCost);

      const fuelCostAfter = fuelCostBefore * 0.67;

      return this.setState({ fuelCostBefore, fuelCostAfter }, () => resolve());
    });

  calculateMaintenance = () =>
    new Promise(resolve => {
      const { fleetSize, averageDailyMiles, daysWorkedPerMonth } = this.state;

      if (!fleetSize || !averageDailyMiles || !daysWorkedPerMonth) {
        console.error("calculateMaintenance FAILED!");
        return null;
      }
      const monthlyMileage =
        Number(fleetSize) * averageDailyMiles * daysWorkedPerMonth;
      const maintenanceBefore = 0.1 * monthlyMileage;

      const maintenanceAfter = maintenanceBefore * 0.75;

      this.setState({ maintenanceBefore, maintenanceAfter }, () => resolve());
    });

  calculateProductivity = () =>
    new Promise(resolve => {
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
        console.error("calculateProductivity FAILED!");
        return null;
      }

      const productivityLostBefore =
        Number(averageWage) *
        daysWorkedPerMonth *
        hoursWorkedPerDay *
        0.125 *
        Number(fleetSize);

      const productivityLostAfter = productivityLostBefore / 2;

      return this.setState(
        { productivityLostBefore, productivityLostAfter },
        () => resolve()
      );
    });

  calculateAccidentsPerYear = () =>
    new Promise(resolve => {
      const { fleetSize, accidentsPerYear } = this.state;
      if (!fleetSize) {
        console.error("calculateAccidentsPerYear FAILED!");
        return null;
      }

      if (!accidentsPerYear) {
        const accidentsPerYear = Number((Number(fleetSize) * 0.2).toFixed(2));
        this.setState({ accidentsPerYear }, () => resolve());
      } else {
        this.setState({ accidentsPerYear }, () => resolve());
      }
    });

  calculateAccidentCost = () =>
    new Promise(resolve => {
      const {
        insuranceDeductible,
        yearlyInsurancePremium,
        accidentsPerYear
      } = this.state;

      if (
        !accidentsPerYear ||
        !insuranceDeductible ||
        !yearlyInsurancePremium
      ) {
        console.error("accident cost failed");
        return null;
      }

      const accidentCostBefore =
        insuranceDeductible * accidentsPerYear + yearlyInsurancePremium * 0.5;

      const accidentCostAfter =
        0.75 * insuranceDeductible + 0.75 * 0.5 * yearlyInsurancePremium;

      return this.setState({ accidentCostBefore, accidentCostAfter }, () =>
        resolve()
      );
    });

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

  handleInsideSale = (value: boolean) => {
    return this.setState({ insideSale: value });
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
      monthlySavings,
      insideSale
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
          monthlySavings,
          insideSale,
          handleInsideSale: this.handleInsideSale
        }}
      >
        {this.props.children}
      </CalculatorContext.Provider>
    );
  }
}
