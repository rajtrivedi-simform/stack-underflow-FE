import apiClient from "./api";

export interface StartupPayload {
  startupName: string;
  ownerName: string;
  constitution: string;
  sector: string;
  state: string;
  district: string;
  taluka: string;
  city: string;
  yearEstablished: number;
  productionStart: string;
  startupStage: string;
  startupDescription: string;
  annualTurnoverRange: string;
  investmentPlantMachinery: string;
  investmentRaised: string;
  investmentType: string;
  totalEmployees: number;
  maleEmployees: number;
  femaleEmployees: number;
  coFounders: number;
  gstStatus: string;
  udyamNumber: string;
  gstin: string;
  dpiitNumber: string;
  investors: string;
  existingRegistrations: string[];
  pendingNotices: boolean;
  ownerGender: string;
  ownerAgeGroup: string;
  socialCategory: string;
  education: string;
  womenLed: string;
  bplCard: boolean;
  knownSchemes: string;
  documentsOnFile: string[];
}

export interface StartupResponse {
  data: StartupPayload & { id: string };
  message: string;
}

export const startupService = {
  create: async (payload: StartupPayload): Promise<StartupResponse> => {
    const response = await apiClient.post<StartupResponse>("/startups", payload);
    return response.data;
  },

  getMe: async (): Promise<StartupResponse> => {
    const response = await apiClient.get<StartupResponse>("/startups/me");
    return response.data;
  },
};
