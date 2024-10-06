import { mixed, object, ref, string } from "yup";
import { ACCEPTED_MIMETYPES } from "./util";

const requiredString = string().required("Looks like you missed a field.");

const email = requiredString.email(
  "That doesn't look like a valid email. Please check and try again."
);

export const registerSchema = object({
  image: mixed()
    .required("An image is required for this step.")
    .test(
      "type",
      "Oops! That image doesn't seem to be in a supported format.",
      (value: unknown) => {
        if (value instanceof File) {
          return (
            ACCEPTED_MIMETYPES.findIndex(
              (mimeType) =>
                mimeType === "image/" + value.name.split(".")[1].toLowerCase()
            ) !== -1 && ACCEPTED_MIMETYPES.includes(value.type)
          );
        }
        return false;
      }
    ),
  fullname: requiredString,
  uname: requiredString,
  x_link: requiredString,
  insta_link: requiredString,
  linkedin_link: requiredString,
  email,
  password: requiredString.min(8),
  confirm_password: requiredString
    .required("Passwords must match")
    .oneOf([ref("password")], "Passwords must match"),
});

export const loginSchema = object({
  email,
  password: requiredString,
});

export const retrievePassword = object({
  otp: requiredString,
  password: requiredString,
  confirm_password: requiredString
    .required("Passwords must match")
    .oneOf([ref("password")], "Passwords must match"),
});
