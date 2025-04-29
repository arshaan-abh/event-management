export interface LayTime {
  portName: { countryName: string; countryCode: string };
  cargo: string;
  f: string;
  blCode: string;
  quantity: number;
  ldRate: number;
  term: string;
  demRate: number;
  desRateD: number;
  allowed: number;
  used: { from: string; to: string };
  deduction: { from: string; to: string };
  balance: { from: string; to: string };
  laycanFrom: string;
  laycanTo: string;
  items: PortActivity[];
}

interface PortActivity {
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
