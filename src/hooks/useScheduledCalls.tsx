import TokenStorage from "@veluxlink/tokenStorage";
import { NETWORK_ERROR, customFormData, fetcher } from "@veluxlink/util";
import useSWR from "swr";

const useScheduledCalls = () => {
  const { data, isLoading, error } = useSWR(
    "/schedules/getSchedulledCalls",
    async (url) => {
      const storage = new TokenStorage(window.localStorage);
      const token = storage.get();
      const formdata = customFormData();

      if (!token) return null;

      const response = await fetcher(url, {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(NETWORK_ERROR);

      const data = await response.json();
      if (!data?.status) throw new Error(data?.message ?? NETWORK_ERROR);

      return data?.data ?? [];
    }
  );

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useScheduledCalls;
