"use client";
import { BiEdit } from "react-icons/bi";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

type Props = {
  values: {
    scheduleFee: number;
    voiceCharge: number;
    videoCharge: number;
  };
  actions?: {
    scheduleFee: (fee: string) => Promise<void>;
    voiceCharge: (fee: string) => Promise<void>;
    videoCharge: (fee: string) => Promise<void>;
  };
  editable?: boolean;
};

const Settings = ({
  values: { scheduleFee, videoCharge, voiceCharge },
  editable,
  actions,
}: Props) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showVoiceChargeModal, setShowVoiceChargeModal] = useState(false);
  const [showVideoChargeModal, setShowVideoChargeModal] = useState(false);
  return (
    <>
      <section className="justify-between sm:text-base text-sm w-full mb-6 item-center flex">
        <p>Schedule Fee:</p>
        <Button
          onClick={() => {
            return editable && setShowScheduleModal(true);
          }}
          className="bg-transparent w-auto p-0 text-main gap-2 flex items-center"
        >
          <p>{scheduleFee}SOL</p>
          {editable && <BiEdit size={24} className="fill-main" />}
        </Button>
      </section>
      <section className="justify-between sm:text-base text-sm w-full mb-6 item-center flex">
        <p>Voice Charge for 5mins:</p>
        <Button
          onClick={() => {
            return editable && setShowVoiceChargeModal(true);
          }}
          className="bg-transparent w-auto p-0 text-main gap-2 flex items-center"
        >
          <p>{voiceCharge}SOL</p>
          {editable && <BiEdit size={24} className="fill-main" />}
        </Button>
      </section>
      <section className="justify-between sm:text-base text-sm w-full item-center flex">
        <p>Video Charge for 5mins:</p>
        <Button
          onClick={() => editable && setShowVideoChargeModal(true)}
          className="bg-transparent w-auto p-0 text-main gap-2 flex items-center"
        >
          <p>{videoCharge}SOL</p>
          {editable && <BiEdit size={24} className="fill-main" />}
        </Button>
      </section>
      <Modal
        open={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      >
        <div className="flex flex-col">
          <p className="font-bold mb-8 text-lg text-center">Schedule Fee</p>
          <Formik
            validationSchema={yup.object({
              amount: yup
                .string()
                .test("amount", "The field should have digits only", (value) =>
                  /^(\d+)(\.\d+)?$/.test(value as string)
                ),
            })}
            initialValues={{
              amount: 0,
            }}
            onSubmit={async (values) => {
              await actions?.scheduleFee(values.amount.toString());
              setShowScheduleModal(false);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <p className="text-red-400 mb-1 text-sm">
                  <ErrorMessage name="amount" />
                </p>
                <Input
                  placeholder="Enter amount in SOL"
                  type="text"
                  className={
                    formik.errors.amount && "shadow-red-400 border-red-400"
                  }
                  inputMode="numeric"
                  {...formik.getFieldProps("amount")}
                />
                <p className="text-sm text-center md:text-left mt-4">
                  This fee helps protect your time. If the caller doesn’t come
                  on the call 3 minutes within the set time you receive 60% of
                  the fee
                </p>
                <Button
                  type="submit"
                  className="mt-12 md:w-auto md:py-2 md:px-6 md:rounded-md self-end"
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        open={showVoiceChargeModal}
        onClose={() => setShowVoiceChargeModal(false)}
      >
        <div className="flex flex-col">
          <p className="font-bold mb-8 text-lg text-center">
            Voice Charge for 5 minutes lapse
          </p>
          <Formik
            validationSchema={yup.object({
              amount: yup
                .string()
                .test("amount", "The field should have digits only", (value) =>
                  /^(\d+)(\.\d+)?$/.test(value as string)
                ),
            })}
            initialValues={{
              amount: 0,
            }}
            onSubmit={async (values) => {
              await actions?.voiceCharge(values.amount.toString());
              setShowVoiceChargeModal(false);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <p className="text-red-400 mb-1 text-sm">
                  <ErrorMessage name="amount" />
                </p>
                <Input
                  placeholder="Enter amount in SOL"
                  type="text"
                  className={
                    formik.errors.amount && "shadow-red-400 border-red-400"
                  }
                  inputMode="numeric"
                  {...formik.getFieldProps("amount")}
                />
                <Button
                  type="submit"
                  className="mt-12 md:w-auto md:py-2 md:px-6 md:rounded-md self-end"
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        open={showVideoChargeModal}
        onClose={() => setShowVideoChargeModal(false)}
      >
        <div className="flex flex-col">
          <p className="font-bold mb-8 text-lg text-center">
            Video Charge for 5 minutes lapse
          </p>
          <Formik
            validationSchema={yup.object({
              amount: yup
                .string()
                .test("amount", "The field should have digits only", (value) =>
                  /^(\d+)(\.\d+)?$/.test(value as string)
                ),
            })}
            initialValues={{
              amount: 0,
            }}
            onSubmit={async (values) => {
              await actions?.videoCharge(values.amount.toString());
              setShowVideoChargeModal(false);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <p className="text-red-400 mb-1 text-sm">
                  <ErrorMessage name="amount" />
                </p>
                <Input
                  placeholder="Enter amount in SOL"
                  type="text"
                  className={
                    formik.errors.amount && "shadow-red-400 border-red-400"
                  }
                  inputMode="numeric"
                  {...formik.getFieldProps("amount")}
                />
                <Button
                  type="submit"
                  className="mt-12 md:w-auto md:py-2 md:px-6 md:rounded-md self-end"
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
