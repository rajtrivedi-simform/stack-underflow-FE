import { useQuery } from '@tanstack/react-query';
import {
  getRegulatoryUpdates,
  type GetRegulatoryUpdatesParams,
} from '../services/regulatory.service';

export const useRegulatoryUpdates = (params: GetRegulatoryUpdatesParams) => {
  return useQuery({
    queryKey: ['regulatory-updates', params],
    queryFn: () => getRegulatoryUpdates(params),
  });
};
