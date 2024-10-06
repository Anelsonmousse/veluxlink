import { randomBytes } from "crypto";

export const ACCEPTED_MIMETYPES = ["image/jpeg", "image/png", "image/jpg"];
export const NETWORK_ERROR =
  "There seems to be a network error. Please make sure you're connected to the internet.";
const BASE_URL = "https://api.veluxlink.com";

const formatAndMergePath = (...paths: string[]) => {
  return paths.reduce((result, path) => {
    if (!path || typeof path !== "string") return result;
    return (
      result +
      (result === "" ? "" : "/") +
      path.slice(
        path.startsWith("/") ? 1 : 0,
        path.endsWith("/") ? path.length - 1 : path.length
      )
    );
  }, "");
};

export const objectToFormdata = (
  object: Record<string, string | File | null>
) => {
  const formdata = customFormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (!value) return;
    formdata.append(key, value);
  });
  return formdata;
};

export const customFormData = () => {
  const formdata = new FormData();
  formdata.append("requestID", randomBytes(16).toString("hex"));
  return formdata;
};

export const fetcher = (url: string, init?: RequestInit) => {
  return fetch(formatAndMergePath(BASE_URL, url), init);
};

export const api = async (url: string, init?: RequestInit) => {
  console.log("url: ", formatAndMergePath(BASE_URL, url));
  try {
    const response = await fetcher(url, init);
    return {
      data: response.ok ? await response.json() : null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
    };
  }
};
