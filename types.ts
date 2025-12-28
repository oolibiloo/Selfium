
export interface Consumption {
  label: string;
  used: number; // in GB
  limit: number; // in GB
}

export interface UsageData {
  date: string;
  gb: number;
}

export interface Plan {
  id: string;
  name: string;
  speed: string;
  quota: string;
  price: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
}

export interface UserProfile {
  phone: string;
  name: string;
  balance: number;
  currentPlan: string;
  renewalDate: string;
  dailyUsage: UsageData[];
  monthlyUsage: UsageData[];
}
