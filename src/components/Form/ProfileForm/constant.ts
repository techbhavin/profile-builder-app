import { ExperienceType, ProfileValuesType } from "./types";

export const experiencesFields: ExperienceType = {
  company: "",
  role: "",
  startDate: "",
  isCurrent: false,
  endDate: "",
  description: "",
};

export const initialValues: ProfileValuesType = {
  firstName: "",
  lastName: "",
  email: "",
  tagLine: "",
  experiences: [experiencesFields],
  skills: [],
};
