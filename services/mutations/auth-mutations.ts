import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  changePassword,
  forgotPassword,
  signInWithCredentials,
  signInWithMagicLink,
  signOut,
  signUp,
} from "@/services/auth";
import { getApiErrorMessage } from "@/services/get-api-error-message";

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      toast({
        title: "Sign up successful",
        description: "Redirecting to Sign in",
        variant: "success",
      });
      // Allow time to read the toast message
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/sign-in");
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "Sign up error",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};

export const useSignInWithCredentials = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signInWithCredentials,
    onSuccess: async () => {
      toast({
        title: "Sign in successful",
        description: "Redirecting...",
        variant: "success",
      });
      // Allow time to read the toast message
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/");
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "Sign in error",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};

export const useSignInWithMagicLink = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signInWithMagicLink,
    onSuccess: async (res) => {
      toast({
        title: "Sign in successful",
        description: "Redirecting...",
        variant: "success",
      });
      // Allow time to read the toast message
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(res.data.redirectTo);
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "Sign in error",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};

export const useForgotPassword = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: async () => {
      toast({
        title: "Reset link sent",
        description:
          "We have sent you an email with a link to reset your password",
        variant: "success",
      });
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "An error occurred",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};

export const useChangePassword = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: async () => {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
        variant: "success",
      });
      // Allow time to read the toast message
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/sign-in");
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "An error occurred",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};

export const useSignOut = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async (res) => {
      router.push(res.redirectTo);
    },
    onError: (err) => {
      const errorMessage = getApiErrorMessage(err);
      toast({
        title: "An error occurred",
        description: errorMessage ?? "Please try again later",
        variant: "destructive",
      });
    },
  });
};
