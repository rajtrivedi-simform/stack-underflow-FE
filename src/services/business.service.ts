import apiClient from "./api";

export interface BusinessProfile {
  businessName: string;
  ownerName: string;
  constitution: string;
  sector: string;
  state: string;
  district: string;
  taluka: string;
  yearEstablished: number;
  productionStart: string;
  annualTurnoverRange: string;
  investmentPlantMachinery: string;
  totalEmployees: number;
  maleEmployees: number;
  femaleEmployees: number;
  gstStatus: string;
  udyamNumber?: string;
  gstin?: string;
  existingRegistrations: string[];
  pendingNotices: boolean;
  ownerGender: string;
  ownerAgeGroup: string;
  socialCategory: string;
  education: string;
  womenLed: string;
  bplCard: boolean;
  knownSchemes?: string;
  documentsOnFile?: string[];
}

export interface BusinessResponse {
  success: boolean;
  data: {
    id: string;
    businessName: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
}

export const businessService = {
  // Create a new business profile
  createBusinessProfile: async (
    profileData: Partial<BusinessProfile>,
  ): Promise<BusinessResponse> => {
    try {
      const response = await apiClient.post<BusinessResponse>(
        "/businesses",
        profileData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get business profile for current user
  getBusinessProfile: async (): Promise<{
    success: boolean;
    data: BusinessProfile & { id: string; createdAt: string; updatedAt: string };
    message?: string;
  }> => {
    try {
      const response = await apiClient.get(
        "/businesses/me",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update business profile
  updateBusinessProfile: async (
    profileData: Partial<BusinessProfile>,
  ): Promise<BusinessResponse> => {
    try {
      const response = await apiClient.patch<BusinessResponse>(
        "/businesses/me",
        profileData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
