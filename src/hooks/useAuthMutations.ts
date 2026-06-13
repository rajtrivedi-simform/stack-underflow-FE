import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useLogin = () =>
  useMutation({
    mutationFn: ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) => authService.login(identifier, password),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: ({
      name,
      email,
      phone,
      password,
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => authService.register(name, email, phone, password),
  });

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (refreshToken: string) =>
      authService.refreshToken(refreshToken),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => authService.logout(),
  });
