import { useMutation } from "@tanstack/react-query";
import { generateContent } from "../api/content-api";

export function useGenerateContent() {
  return useMutation({
    mutationFn: generateContent,
  });
}
