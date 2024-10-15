import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QualificationAppState {
  step: number;
  certificateImage: File | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
}

const initialState: QualificationAppState = {
  step: 0,
  certificateImage: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const qualificationSlice = createSlice({
  name: "qualification",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setCertificateImage: (state, action: PayloadAction<File>) => {
      state.certificateImage = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    resetStep: (state) => {
      state.step = 0;
    },
    resetState: (state) => {
      state.step = initialState.step;
      state.certificateImage = initialState.certificateImage;
      state.email = initialState.email;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.phone = initialState.phone;
    },
  },
});

export const {
  setStep,
  setCertificateImage,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  resetStep,
  resetState,
} = qualificationSlice.actions;