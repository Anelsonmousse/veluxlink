"use client";
import { Formik } from "formik";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { registerSchema } from "@veluxlink/schema";
import LabelError from "./LabelError";
import { useState } from "react";
import { BiCamera } from "react-icons/bi";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { NETWORK_ERROR, api, objectToFormdata } from "@veluxlink/util";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MAX_STEPS = 2;

type Values = {
  email: string;
  fullname: string;
  uname: string;
  x_link: string;
  linkedin_link: string;
  insta_link: string;
  password: string;
  image: File | null;
  confirm_password: string;
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [imageDisplay, setImageDisplay] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: Values) => {
    if (submitting) return;

    const loadingToastId = toast.loading(
      "Creating your account. Please wait a moment..."
    );

    setSubmitting(true);

    const formdata = objectToFormdata(values);
    const { data, status } = await api("/users/register_user", {
      method: "POST",
      body: formdata,
    });
    toast.dismiss(loadingToastId);
    setSubmitting(false);
    toast[!data?.status || status !== 200 ? "error" : "success"](
      data?.message ?? NETWORK_ERROR
    );
    if (data.status) router.push("/auth/login");
  };

  return (
    <div className="w-full mb-4 gap-8 sm:w-96 flex flex-col">
      <Formik
        initialValues={{
          fullname: "",
          x_link: "",
          uname: "",
          insta_link: "",
          linkedin_link: "",
          image: null,
          email: "",
          password: "",
          confirm_password: "",
        }}
        validateOnMount
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, errors, handleSubmit, setFieldValue }) => (
          <form
            method="post"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {step === 1 && (
              <>
                <label>
                  Email
                  <Input
                    className="mb-2"
                    {...getFieldProps("email")}
                    placeholder="John.doe@veluxlink.com"
                  />
                  {errors.email && <LabelError name="email" />}
                </label>

                <label>
                  Password
                  <Input
                    className="mb-2"
                    type="password"
                    {...getFieldProps("password")}
                    placeholder="********"
                  />
                  {errors.password && <LabelError name="password" />}
                </label>
                <label>
                  Confirm Password
                  <Input
                    className="mb-2"
                    {...getFieldProps("confirm_password")}
                    type="password"
                    placeholder="********"
                  />
                  {errors.confirm_password && (
                    <LabelError name="confirm_password" />
                  )}
                </label>
              </>
            )}
            {step === 2 && (
              <>
                <div
                  className={
                    "w-28 h-28 rounded-lg border-white border-opacity-10 relative overflow-hidden border cursor-pointer  flex items-center justify-center self-center"
                  }
                >
                  <Input
                    className="w-full h-full absolute top-0 left-0 opacity-0"
                    type="file"
                    name="image"
                    onChange={async (e) => {
                      if (
                        !e.currentTarget.files ||
                        e.currentTarget.files.length === 0
                      )
                        return;

                      const image = e.currentTarget.files[0];

                      const errors = await setFieldValue("image", image, true);
                      if (errors && errors.image) {
                        setImageDisplay(null);
                        setFieldValue("image", null);
                        toast.error(errors.image);
                        return;
                      }
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        setImageDisplay(fileReader.result as string | null);
                      };
                      fileReader.readAsDataURL(image);
                    }}
                  />
                  {imageDisplay && (
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Image
                        fill
                        alt="Image"
                        src={imageDisplay}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                      <IoClose
                        onClick={() => {
                          setImageDisplay(null);
                          setFieldValue("image", null);
                        }}
                        className="absolute z-10 p-1 bg-black rounded-full cursor-pointer right-1 top-1"
                        size={24}
                      />
                    </div>
                  )}
                  <BiCamera size={24} className="fill-white" />
                </div>
                <label>
                  Username
                  <Input
                    className="mb-2"
                    {...getFieldProps("uname")}
                    placeholder="John.doe"
                  />
                  {errors.uname && <LabelError name="uname" />}
                </label>
                <label>
                  Full Name
                  <Input
                    className="mb-2"
                    {...getFieldProps("fullname")}
                    placeholder="John Doe"
                  />
                  {errors.fullname && <LabelError name="fullname" />}
                </label>
                <label>
                  X Link
                  <Input
                    className="mb-2"
                    {...getFieldProps("x_link")}
                    placeholder="https://x.com/johndoe"
                  />
                  {errors.x_link && <LabelError name="x_link" />}
                </label>
                <label>
                  Instagram Link
                  <Input
                    className="mb-2"
                    {...getFieldProps("insta_link")}
                    placeholder="https://instagram.com/johndoe"
                  />
                  {errors.insta_link && <LabelError name="insta_link" />}
                </label>
                <label>
                  LinkedIn Link
                  <Input
                    className="mb-2"
                    {...getFieldProps("linkedin_link")}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                  {errors.linkedin_link && <LabelError name="linkedin_link" />}
                </label>
              </>
            )}
            <div className="flex items-center justify-center gap-8 mt-4">
              {step > 1 && (
                <Button
                  className="bg-transparent px-6 py-3 w-auto"
                  onClick={() => {
                    if (step === 1) return;
                    setStep((step) => step - 1);
                  }}
                  type="button"
                >
                  Back
                </Button>
              )}
              {step < MAX_STEPS ? (
                <Button
                  className="py-3 px-6 rounded-md"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep((step) => step + 1);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const error = Object.keys(errors).reduce((_, key) => {
                      const error = (errors as Record<string, string>)[key];
                      if (error) return error;
                      return "";
                    }, "");

                    if (error !== "") toast.error(error);
                  }}
                  className="px-4 py-3"
                  type="submit"
                >
                  Register
                </Button>
              )}
            </div>

            <div className="flex justify-center gap-2">
              <p>Already have an account?</p>
              <Link className="text-main" href="/auth/login">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
