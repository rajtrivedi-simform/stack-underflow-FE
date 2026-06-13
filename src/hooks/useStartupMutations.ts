import { useMutation, useQuery } from "@tanstack/react-query";
import { startupService, type StartupPayload } from "../services/startup.service";

export const useCreateStartup = () =>
  useMutation({
    mutationFn: (payload: StartupPayload) => startupService.create(payload),
  });

export const useGetStartupMe = () =>
  useQuery({
    queryKey: ["startup", "me"],
    queryFn: () => startupService.getMe(),
  });
