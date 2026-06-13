import apiClient from "./api";

interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email?: string;
      phone?: string;
      displayName?: string;
    };
  };
  message: string;
}

export const authService = {
  // Login with email or phone
  login: async (
    identifier: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", {
        identifier,
        password,
      });

      // Store tokens in localStorage
      if (response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register with name, email, phone, and password
  register: async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      // Store tokens in localStorage
      if (response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh access token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/refresh", {
        refreshToken,
      });

      // Update tokens in localStorage
      if (response.data?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout", {});

      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      // Clear tokens even if logout request fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  },

  // Get stored access token
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  // Get stored refresh token
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};
