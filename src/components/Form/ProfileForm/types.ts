export interface ProfileValuesType {
  firstName: string;
  lastName: string;
  email: string;
  tagLine: string;
  experiences: ExperienceType[];
  skills: string[];
  id?: string;
}

export interface ExperienceType {
  company: string;
  role: string;
  startDate: string;
  isCurrent: boolean;
  endDate: string;
  description: string;
}
