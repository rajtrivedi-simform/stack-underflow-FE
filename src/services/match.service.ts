import apiClient from "./api";

export interface MatchedScheme {
  id: string;
  schemeName: string;
  matchScore: number;
  level: string;
  category: string;
  description: string;
  benefits: string;
}

export interface MatchSchemesResponse {
  success: boolean;
  data: {
    matchedSchemes: MatchedScheme[];
    totalMatches: number;
    profileId: string;
  };
  message?: string;
}

export const matchService = {
  // Match business profile with schemes
  matchBusinessSchemes: async (
    businessProfileId: string,
  ): Promise<MatchSchemesResponse> => {
    try {
      const response = await apiClient.post<MatchSchemesResponse>(
        `/match-schemes`,
        {
          profileId: businessProfileId,
          profileType: 'business',
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Match startup profile with schemes
  matchStartupSchemes: async (
    startupProfileId: string,
  ): Promise<MatchSchemesResponse> => {
    try {
      const response = await apiClient.post<MatchSchemesResponse>(
        `/match-schemes`,
        {
          profileId: startupProfileId,
          profileType: 'startup',
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
