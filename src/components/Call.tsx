"use client";
import LocalVideo from "./LocalVideo";
import { useEffect } from "react";
import { customFormData, fetcher, NETWORK_ERROR } from "@veluxlink/util";
import { useUser } from "@veluxlink/hooks";
import { useParams, useRouter } from "next/navigation";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import useSWR from "swr";
import Loader from "./Loader";

const Call = () => {
  const client = useRTCClient(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  const router = useRouter();
  const { user, loading, error } = useUser();
  const { id } = useParams();
  // const {
  //   data,
  //   isLoading,
  //   error: scheduleError,
  // } = useSWR("schedules/getSchedulledDetails", async (url) => {
  //   if (user) {
  //     const formdata = customFormData();
  //     formdata.append("call_id", id as string);
  //     const response = await fetcher(url, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       method: "POST",
  //       body: formdata,
  //     });
  //     if (!response.ok) {
  //       throw new Error(NETWORK_ERROR);
  //     }
  //     const data = await response.json();

  //     return data;
  //   }
  //   return null;
  // });

  useEffect(() => {
    if ((!loading && !user) || error) {
      router.replace("/auth/login");
    }
  }, [error, user, router]);

  if (error) {
    return null;
  }

  if (loading)
    return (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );

  if (user) {
    return (
      <AgoraRTCProvider client={client}>
        <LocalVideo
          token={process.env.NEXT_PUBLIC_AGORA_TOKEN as string}
          channel={"veluxlink"}
          userId={""}
          receivingId={""}
        />
      </AgoraRTCProvider>
    );
  }
};

export default Call;
