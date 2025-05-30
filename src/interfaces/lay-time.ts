import { Country } from "@/utils/get-country-column";
import { TimeDiff } from "@/utils/get-time-diff-column";

export interface LayTime {
  id: number;
  portName: Country;
  cargo: string;
  f: string;
  blCode: string;
  quantity: number;
  ldRate: number;
  term: string;
  demRate: number;
  desRateD: number;
  allowed: number;
  used: TimeDiff;
  deduction: TimeDiff;
  balance: TimeDiff;
  laycanFrom: string;
  laycanTo: string;
  items: PortActivity[];
}

export interface PortActivity {
  id: number;
  activityType: PortActivityType;
  fromDateAndTime: string;
  percentage: 0 | 50 | 100;
  remarks: string;
}

export enum PortActivityType {
  Unknown = "Unknown",
  Loading = "Loading",
  Unloading = "Unloading",
  Waiting = "Waiting",
  Berthing = "Berthing",
  Unberthing = "Unberthing",
  Inspection = "Inspection",
  Bunkering = "Bunkering",
  Maintenance = "Maintenance",
}
