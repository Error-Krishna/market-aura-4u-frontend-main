import { useQuery } from "@tanstack/react-query";
import { getContentHistory } from "../api/content-api";

export function useContentHistory() {
  return useQuery({
    queryKey: ["contentHistory"],
    queryFn: getContentHistory,
  });
}
