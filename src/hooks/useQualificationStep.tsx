"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStep,
  resetStep,
  resetState,
  setCertificateImage,
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
} from "@/store/qualification/qualification.slice";

export const useQualificationStep = () => {
  const dispatch = useAppDispatch();
  const { step, certificateImage, email, firstName, lastName, phone } = useAppSelector(
    (state) => state.qualification,
  );

  const setStepStore = (step: number) => {
    dispatch(setStep(step));
  };

  const resetStepStore = () => {
    dispatch(resetStep());
  };

  const setCertificateImageStore = (certificateImage: File) => {
    dispatch(setCertificateImage(certificateImage));
  };

  const setFirstNameStore = (firstName: string) => {
    dispatch(setFirstName(firstName));
  };

  const setLastNameStore = (lastName: string) => {
    dispatch(setLastName(lastName));
  };

  const setPhoneStore = (phone: string) => {
    dispatch(setPhone(phone));
  };

  const setEmailStore = (email: string) => {
    dispatch(setEmail(email));
  };

  const resetStateStore = () => {
    dispatch(resetState());
  };

  return {
    setStepStore,
    resetStepStore,
    resetStateStore,
    setCertificateImageStore,
    setEmailStore,
    setFirstNameStore,
    setLastNameStore,
    setPhoneStore,
    step,
    certificateImage,
    email,
    firstName,
    lastName,
    phone
  };
};