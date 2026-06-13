import { z } from 'zod';

export const step1Schema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Select a business type'),
  sector: z.string().min(1, 'Select a sector'),
  subSector: z.string().min(1, 'Select a sub-sector'),
  constitutionType: z.string().min(1, 'Select constitution type'),
  productionStartDate: z.string().optional(),
  startupStage: z.string().min(1, 'Select startup stage'),
  startupDescription: z.string().optional(),
});

export const step2Schema = z.object({
  state: z.string().min(1, 'Select a state'),
  district: z.string().min(1, 'Select a district'),
  taluka: z.string().optional(),
  city: z.string().optional(),
  businessAddress: z.string().min(1, 'Business address is required'),
});

export const step3Schema = z.object({
  annualTurnover: z.string().optional(),
  plantInvestment: z.string().optional(),
  investmentRaised: z.string().optional(),
  investmentType: z.string().min(1, 'Select investment type'),
  totalEmployees: z.string().optional(),
  yearEstablished: z.string().optional(),
  maleEmployees: z.coerce.number().min(0),
  femaleEmployees: z.coerce.number().min(0),
});

export const step4Schema = z.object({
  founderName: z.string().min(1, 'Founder name is required'),
  gender: z.string().optional(),
  ageGroup: z.string().optional(),
  socialCategory: z.string().optional(),
  education: z.string().optional(),
  coFounders: z.coerce.number().min(0),
  dpiitNumber: z.string().optional(),
  investors: z.string().optional(),
  isWomenLed: z.boolean(),
  isStartupRecognized: z.boolean(),
  isDpiitRegistered: z.boolean(),
  isBplHolder: z.boolean(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;

export interface OnboardingFormData {
  step1?: Partial<Step1Data>;
  step2?: Partial<Step2Data>;
  step3?: Partial<Step3Data>;
  step4?: Partial<Step4Data>;
}
