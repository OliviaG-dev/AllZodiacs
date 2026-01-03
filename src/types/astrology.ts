export type BirthDate = {
  day: number;
  month: number;
  year: number;
};

export type ZodiacSign = {
  name: string;
  system: string;
  description?: string;
  dateRange?: string;
};

export type AllSigns = {
  [systemName: string]: ZodiacSign;
};
