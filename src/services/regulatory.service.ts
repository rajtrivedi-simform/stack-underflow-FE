import apiClient from './api';

export type ApiSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RegulatoryUpdateDto {
  id: string;
  title: string;
  effectiveDate: string;
  severity: ApiSeverity;
  summary: string;
  actionRequired: string;
  sourceUrl: string;
  affectsComplianceIds: string[];
  affectsSchemeIds: string[];
  createdAt: string;
}

export interface RegulatoryUpdatesResponse {
  updates: RegulatoryUpdateDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface GetRegulatoryUpdatesParams {
  severity?: ApiSeverity;
  afterDate?: string;
  page?: number;
  limit?: number;
}

export const getRegulatoryUpdates = async (
  params: GetRegulatoryUpdatesParams = {},
): Promise<RegulatoryUpdatesResponse> => {
  const response = await apiClient.get<RegulatoryUpdatesResponse>(
    '/regulatory-updates',
    { params },
  );
  return response.data;
};
