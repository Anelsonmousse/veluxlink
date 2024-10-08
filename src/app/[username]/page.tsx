"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Loader, Modal, Settings } from "@veluxlink/components";
import useSWR from "swr";
import { api, customFormData } from "@veluxlink/util";
import { useEffect, useState } from "react";
import TokenStorage from "@veluxlink/tokenStorage";
import toast from "react-hot-toast";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

export default function UserPage() {
  const { username } = useParams();
  const router = useRouter();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [callType, setCallType] = useState("voice");

  const { data, isLoading, error } = useSWR(
    "/users/findThisUser",
    async (url) => {
      const token = new TokenStorage(window.localStorage).get();
      if (!token) return null;
      const formdata = customFormData();
      formdata.append("username", username as string);
      const { data } = await api(url, {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data?.status) return null;
      return data.data;
    }
  );

  useEffect(() => {
    if (!isLoading && !data) router.replace("/");
  }, [data, isLoading, error, router]);

  if (isLoading)
    return (
      <div className="w-full h-screen text-white font-bold flex items-center justify-center">
        <Loader />
      </div>
    );

  if (data)
    return (
      <main className="px-4 pt-8 md:pt-28 md:px-20">
        <section className="w-full flex-col md:flex-row items-center mb-8 md:justify-between flex md:items-center">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Image
              alt="user image"
              src={"/pic.png"}
              width={64}
              height={64}
              className="rounded-full w-24 h-24"
            />
            <div className="text-center md:text-left">
              <p className="text-lg font-bold">{data.fullname}</p>
              <p
                className={
                  !!data.availability ? "text-green-600" : "text-neutral-400"
                }
              >
                {!!data.availability ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>

          <div className="flex gap-8 md:gap-2 mt-4 md:m-0 justify-center items-center">
            <Button
              onClick={() => setCallType("voice")}
              className={`rounded-full w-auto p-4 flex items-center justify-center shrink-0 ${
                callType === "voice" ? "border-white border-2" : ""
              }`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.723 30.1297C23.5353 30.1297 21.8668 29.7001 19.3684 28.3043C16.3303 26.6006 13.9804 25.0276 10.9587 22.0139C8.04534 19.1023 6.6276 17.2173 4.64336 13.6066C2.40175 9.52982 2.78387 7.39286 3.21102 6.47954C3.7197 5.38794 4.47056 4.73504 5.44107 4.08702C5.99232 3.72585 6.57568 3.41625 7.18374 3.16214C7.24459 3.13597 7.30118 3.11103 7.35168 3.08851C7.65288 2.95282 8.10923 2.74777 8.68728 2.96682C9.07305 3.11164 9.41745 3.40796 9.95656 3.94038C11.0622 5.03076 12.573 7.45918 13.1304 8.65179C13.5046 9.45558 13.7522 9.98617 13.7528 10.5813C13.7528 11.278 13.4023 11.8152 12.977 12.3951C12.8973 12.504 12.8182 12.6081 12.7415 12.7091C12.2785 13.3176 12.1769 13.4934 12.2438 13.8074C12.3795 14.4384 13.3914 16.3167 15.0544 17.976C16.7173 19.6354 18.5415 20.5834 19.1749 20.7184C19.5023 20.7884 19.6818 20.6825 20.3097 20.2031C20.3998 20.1343 20.4923 20.0631 20.589 19.9919C21.2377 19.5094 21.75 19.168 22.4303 19.168H22.4339C23.026 19.168 23.5328 19.4248 24.3725 19.8483C25.4678 20.4008 27.9692 21.8922 29.0663 22.999C29.5999 23.5369 29.8975 23.8801 30.0429 24.2652C30.2619 24.8451 30.0557 25.2996 29.9212 25.6039C29.8987 25.6544 29.8737 25.7097 29.8476 25.7712C29.5914 26.3782 29.28 26.9603 28.9172 27.5102C28.2704 28.4777 27.6151 29.2267 26.521 29.736C25.9593 30.0018 25.3444 30.1364 24.723 30.1297Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button
              onClick={() => setCallType("video")}
              className={`rounded-full w-auto p-4 flex items-center justify-center shrink-0 ${
                callType === "video" ? "border-white border-2" : ""
              }`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.82542 0.0623779H18.7004C19.0447 0.0623779 19.3749 0.199139 19.6183 0.442576C19.8617 0.686013 19.9985 1.01618 19.9985 1.36045V15.6393C19.9985 15.9836 19.8617 16.3137 19.6183 16.5572C19.3749 16.8006 19.0447 16.9374 18.7004 16.9374H1.82542C1.48115 16.9374 1.15098 16.8006 0.907542 16.5572C0.664105 16.3137 0.527344 15.9836 0.527344 15.6393V1.36045C0.527344 1.01618 0.664105 0.686013 0.907542 0.442576C1.15098 0.199139 1.48115 0.0623779 1.82542 0.0623779ZM21.2966 5.90372L25.6776 2.39892C25.8685 2.24611 26.0986 2.15031 26.3415 2.12255C26.5844 2.09478 26.8302 2.13618 27.0506 2.24198C27.271 2.34778 27.4571 2.51367 27.5874 2.72056C27.7176 2.92745 27.7868 3.16693 27.787 3.41142V13.5883C27.7868 13.8328 27.7176 14.0723 27.5874 14.2792C27.4571 14.4861 27.271 14.652 27.0506 14.7578C26.8302 14.8636 26.5844 14.905 26.3415 14.8772C26.0986 14.8494 25.8685 14.7536 25.6776 14.6008L21.2966 11.096V5.90372Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </section>
        <Settings
          values={{
            scheduleFee: data.schedule_fee,
            videoCharge: data.video_charge,
            voiceCharge: data.voice_charge,
          }}
        />
        <div className="fixed md:relative flex md:justify-center md:mt-16 bottom-2 w-full left-0 px-2">
          <Button
            onClick={() => {
              if (!!!data.availability)
                return toast.error("This user is not available for a meeting");
              setShowScheduleModal(true);
            }}
            className="w-auto px-10"
          >
            Schedule a meeting
          </Button>
        </div>
        <Modal
          open={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
        >
          <div className="flex flex-col">
            <p className="font-bold mb-8 text-lg text-center">
              Schedule a meeting with {data.fullname}
            </p>
            <Formik
              validationSchema={yup.object({
                call_date: yup.string().required(),
                call_time: yup
                  .string()
                  .test(
                    "amount",
                    "The field should in the format HH:MM",
                    (value) => /^(\d+):(\d+)$/.test(value as string)
                  ),
              })}
              initialValues={{
                call_time: "",
                call_date: "",
              }}
              onSubmit={async (values) => {
                const formdata = customFormData();
                formdata.append("r_user_id", data.user_id);
                formdata.append("from", values.call_time);
                formdata.append("call_type", callType);
                formdata.append(
                  "call_date",
                  values.call_date.split("-").reverse().join("-")
                );
                const { data: response } = await api(
                  "/schedules/scheduleCall",
                  {
                    headers: {
                      Authorization: `Bearer ${new TokenStorage(
                        window.localStorage
                      ).get()}`,
                    },
                    method: "POST",
                    body: formdata,
                  }
                );
                if (!response?.status)
                  return toast.error(
                    `Could not schedule a call with ${data.fullname}, please try again later`
                  );
                toast.success(
                  `Your have successfully scheduled a call with ${data.fullname}`
                );
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    className="mb-3"
                    placeholder="Call Date"
                    {...formik.getFieldProps("call_date")}
                    type="date"
                  />
                  <Input
                    placeholder="Call Time"
                    type="text"
                    className={
                      formik.errors.call_time && "shadow-red-400 border-red-400"
                    }
                    inputMode="numeric"
                    {...formik.getFieldProps("call_time")}
                  />
                  <p className="text-red-400 mt-1 text-sm">
                    <ErrorMessage name="call_time" />
                  </p>
                  <Button
                    type="submit"
                    className="mt-12 w-full py-4  md:px-6 md:rounded-md self-end"
                  >
                    Schedule
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      </main>
    );
}
