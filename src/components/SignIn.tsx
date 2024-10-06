"use client";
import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import LabelError from "./LabelError";
import { loginSchema } from "@veluxlink/schema";
import { NETWORK_ERROR, api, objectToFormdata } from "@veluxlink/util";
import toast from "react-hot-toast";
import TokenStorage from "@veluxlink/tokenStorage";

type Values = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Values) => {
    if (loading) return;
    setLoading(true);
    const loadingToastId = toast.loading(
      "Please wait while we verify your credentials."
    );
    const formdata = objectToFormdata(values);
    const { data, status } = await api("/users/loginfunc", {
      method: "POST",
      body: formdata,
    });
    toast.dismiss(loadingToastId);
    setLoading(false);
    toast[!data?.status || status !== 200 ? "error" : "success"](
      data?.message ?? NETWORK_ERROR
    );
    if (data?.access_token) {
      const storage = new TokenStorage(window.localStorage);
      storage.set(data.access_token);
      router.replace("/dashboard");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, handleSubmit, getFieldProps }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <div className="w-full sm:w-96 flex flex-col">
            <label className="mb-4">
              Email
              <Input
                className="mb-2"
                {...getFieldProps("email")}
                placeholder="John.doe@veluxlink.com"
              />
              {errors.email && <LabelError name="email" />}
            </label>
            <label className="mb-2">
              Password
              <Input
                type="password"
                className="mb-2"
                {...getFieldProps("password")}
                placeholder="********"
              />
              {errors.password && <LabelError name="password" />}
            </label>
            <Button
              onClick={() => setForgotPassword(true)}
              type="button"
              className="p-0 bg-transparent self-end w-auto"
            >
              Forgot Password?
            </Button>
            <Button className="mt-8 py-3" type="submit">
              Sign In
            </Button>
            <div className="flex mt-3 justify-center gap-2">
              <p>Don't have an account?</p>
              <Link className="text-main" href="/auth/register">
                Sign up
              </Link>
            </div>
          </div>
          <Modal open={forgotPassword} onClose={() => setForgotPassword(false)}>
            <h1 className="text-2xl mb-12 font-bold">Forgotten Password?</h1>
            <div className="mt-4 flex flex-col">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={async (values, helpers) => {
                  const formdata = objectToFormdata(values);
                  const { data, status } = await api("/users/loginfunc", {
                    body: formdata,
                  });
                }}
              >
                {({ getFieldProps, errors, handleSubmit }) => (
                  <form
                    method="post"
                    className="w-full"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="email">Email</label>
                    <Input
                      {...getFieldProps("email")}
                      className="mt-1 mb-2"
                      placeholder="John.doe@veluxlink.com"
                    />
                    {errors.email && <LabelError name="email" />}
                    <Button className="mt-4 py-3" type="submit">
                      Save
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </Modal>
        </form>
      )}
    </Formik>
  );
};

export default SignIn;
