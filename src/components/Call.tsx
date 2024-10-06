"use client";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import LocalVideo from "./LocalVideo";
import { useEffect } from "react";
import { customFormData, fetcher, NETWORK_ERROR } from "@veluxlink/util";
import { useUser } from "@veluxlink/hooks";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Loader from "./Loader";

const Call = () => {
  const client = useRTCClient(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  const router = useRouter();
  const { user, loading, error } = useUser();
  const { id } = useParams();
  const {
    data,
    isLoading,
    error: scheduleError,
  } = useSWR("schedules/getSchedulledDetails", async (url) => {
    if (user) {
      const formdata = customFormData();
      formdata.append("call_id", id as string);
      const response = await fetcher(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "POST",
        body: formdata,
      });
      if (!response.ok) {
        throw new Error(NETWORK_ERROR);
      }
      const data = await response.json();

      return data;
    }
    return null;
  });

  useEffect(() => {
    if (error) {
      router.replace("/auth/login");
    }
  }, [error]);

  if (error) {
    return null;
  }

  if (loading || isLoading)
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );

  if (user && data) {
    return (
      <AgoraRTCProvider client={client}>
        <LocalVideo
          token={
            "006994c5ec6485943e59acef3f1f12e7213IAB3IQ017/MqC37hE/PFFFjqVsnktAf0U9v/gkwKBAwZZHC7oF+zLPykIgD2IgEA5n3+ZgQAAQDmwwNnAwDmwwNnAgDmwwNnBADmwwNn"
          }
          channel={"aBnW`_dC)MeLQ$St3S)5bT~lRf[)06^"}
          userId={user.user_id}
          receivingId={data.receiver_user_id}
        />
      </AgoraRTCProvider>
    );
  }
};

export default Call;
