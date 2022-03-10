import { ERROR } from "../../constant/error";
import { getAll, getItem, setItem } from "../../utils/localStorage";
import { chekValidLSKey, errMessage } from "../../utils/utility";

export const getAllProfiles = () => {
  try {
    const profiles = getAll();
    return profiles.length > 0
      ? profiles
          .filter((key: string) => chekValidLSKey(key))
          .map((key: string) => {
            const value = getItem(key);
            return value && JSON.parse(value);
          })
      : profiles;
  } catch (error) {
    errMessage(ERROR.noData);
  }
};

export const getProfile = (profileId: string) => {
  try {
    const profile = getItem(profileId);
    return profile ? JSON.parse(profile) : "";
  } catch (error) {
    errMessage(ERROR.noData);
  }
};

export const addProfile = (
  profileId: string,
  profileBody: string,
  CB?: () => void
) => {
  try {
    setItem(profileId, profileBody);
    CB && CB();
  } catch (error) {
    errMessage(ERROR.default);
  }
};

export const updateProfile = (
  profileId: string,
  profileBody: string,
  CB?: () => void
) => {
  try {
    setItem(profileId, profileBody);
    CB && CB();
  } catch (error) {
    errMessage(ERROR.default);
  }
};
