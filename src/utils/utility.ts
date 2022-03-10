import message from "antd/lib/message";

// get unique key
export const getRandomKey = () => {
  return Date.now();
};

// Success message
export const successMessage = (msg: string) => {
  message.success(msg);
};

// Error message
export const errMessage = (msg: string) => {
  message.error(msg);
};

// Check valid local storage key
export const chekValidLSKey = (key: string) => {
  return key.split("_")[0] === "profile";
};
