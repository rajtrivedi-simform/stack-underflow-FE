import apiClient from "./api";

export interface Scheme {
  id: string;
  schemeName: string;
  slug: string;
  details: string;
  benefits: string;
  eligibility: string;
  application: string;
  documents: string[];
  level: 'Central' | 'State';
  schemeCategory: string[];
  tags: string[];
  targetCategory: string;
  applicableStates: string[];
  applicationLink: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SchemesListResponse {
  success: boolean;
  data: {
    schemes: Scheme[];
    total?: number;
    page?: number;
    limit?: number;
    hasNextPage?: boolean;
  };
  message?: string;
}

export interface SchemesQueryParams {
  state?: string;
  level?: string;
  targetCategory?: string;
  sector?: string;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export const schemeService = {
  // Fetch schemes list with optional filters
  getSchemes: async (params?: SchemesQueryParams): Promise<SchemesListResponse> => {
    try {
      const response = await apiClient.get<SchemesListResponse>("/schemes", {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          ...(params?.state && { state: params.state }),
          ...(params?.level && { level: params.level }),
          ...(params?.targetCategory && { targetCategory: params.targetCategory }),
          ...(params?.sector && { sector: params.sector }),
          ...(params?.search && { search: params.search }),
          ...(params?.isActive !== undefined && { isActive: params.isActive }),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single scheme by ID
  getSchemeById: async (id: string): Promise<{ data: Scheme; message: string }> => {
    try {
      const response = await apiClient.get<{ data: Scheme; message: string }>(`/schemes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get scheme filters/options (states, levels, categories, sectors)
  getSchemeFilters: async (): Promise<{
    data: {
      states: { label: string; value: string }[];
      levels: { label: string; value: string }[];
      categories: { label: string; value: string }[];
      sectors: { label: string; value: string }[];
    };
    message: string;
  }> => {
    try {
      const response = await apiClient.get("/schemes/filters", {
        params: { action: "filters" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
