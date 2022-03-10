import * as Yup from "yup";
import { ERROR } from "../../../constant/error";
import { AlphabetsRegx } from "../../../constant/regx";

export const ProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(AlphabetsRegx, ERROR.invalidString)
    .required(ERROR.required),
  lastName: Yup.string()
    .matches(AlphabetsRegx, ERROR.invalidString)
    .required(ERROR.required),
  email: Yup.string().email(ERROR.invalidEmail).required(ERROR.required),
  tagLine: Yup.string()
    .matches(AlphabetsRegx, ERROR.invalidString)
    .required(ERROR.required),
  skills: Yup.array().min(1, ERROR.required),
  experiences: Yup.array().of(
    Yup.object().shape({
      company: Yup.string()
        .matches(AlphabetsRegx, ERROR.invalidString)
        .required(ERROR.required),
      role: Yup.string()
        .matches(AlphabetsRegx, ERROR.invalidString)
        .required(ERROR.required),
      isCurrent: Yup.bool(),
      startDate: Yup.string().required(ERROR.required),
      endDate: Yup.mixed().when("isCurrent", {
        is: true,
        then: Yup.string().nullable(),
        otherwise: Yup.string().required(ERROR.required),
      }),
      description: Yup.string()
        .max(300, ERROR.maxLength300)
        .required(ERROR.required),
    })
  ),
});
