"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimalBreeds, AnimalTypes } from "@/app/constants/formik/animalBreed";
import { createPetValidationSchema, CreatePetValue, emptyCreatePetValues } from "@/app/constants/formik/createPet.formik";
import { useFormik } from "formik";
import ValidatedInput from "@/components/Input/ValidatedInput";
import { getFieldProps } from "@/utils/getFieldProps";
import { petService } from "@/services/pet.service";
import { Toast } from "@/components/Toast/Toast";
import { useAppSelector } from "@/store/hooks";

export default function CreatePet() {
    const userData = useAppSelector((state) => state.auth.user);
    const [file, setFile] = useState<File | null>(null);

    const onFileUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        const files = e.target.files;
        if (files?.length) {
          formik.setFieldValue("file", files[0]);
          setFile(files[0]);
        }
    };

    const handleCreatePet = async () => {
        if(!formik.values.file || !userData){
            return ;
        }
        try {
            const response = await petService.createPet({
                ...formik.values,
                file: formik.values.file as File,
                ownerId: userData.id
            });
            console.log(response);
        } catch (error) {
            Toast("Failed to create pet.", "error");
        }
    }

    const formik = useFormik<CreatePetValue>({
        initialValues: {
            ...emptyCreatePetValues,
        },
        validateOnChange: false,
        enableReinitialize: true,
        validationSchema: createPetValidationSchema,
        onSubmit: handleCreatePet,
    });

    useEffect(() => {
        if (file && file instanceof Blob) {
          const objectUrl = URL.createObjectURL(file);
          formik.setFieldValue("imageUrl", objectUrl);
    
          return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    const breedIdInputProps = getFieldProps(formik, "breedId");
    const nameInputProps = getFieldProps(formik, "name");
    const ageInputProps = getFieldProps(formik, "age");
    const weightInputProps = getFieldProps(formik, "weight");
    const personalityInputProps = getFieldProps(formik, "personality");
    const allergyInputProps = getFieldProps(formik, "allergy");
    const otherDetailInputProps = getFieldProps(formik, "otherDetail");
    const fileInputProps = getFieldProps(formik, "file");

    return (
        <div className="flex justify-center bg-white pb-16">      
            <form noValidate className="w-[680px]" onSubmit={formik.handleSubmit}>
                <div className="mb-8 flex flex-col items-center gap-4 justify-center">
                    <div className="flex flex-col items-center">
                        {formik.values.imageUrl ? (
                            <Image
                                src={formik.values.imageUrl}
                                width={300}
                                height={300}
                                alt="Uploaded pet image"
                                className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-bright-blue justify-self-center"
                            />
                        ) : (
                            <Image
                                src="/paws.png"
                                width={150}
                                height={150}
                                alt="Placeholder image"
                                className="bg-very-light-gray rounded-full border-[3px] border-bright-blue justify-self-center"
                            />
                        )}
                        {fileInputProps.error && fileInputProps.errorMessage && (
                            <div className="mt-2 right-0 text-small text-red-500">
                            {fileInputProps.errorMessage}
                            </div>
                        )}
                    </div>
                    <div className="relative flex flex-row justify-center items-center text-white bg-bright-blue rounded-[8px] w-[163px] h-[32px] justify-self-center px-6 text-button cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileUploaded}
                            className="absolute left-0 right-0 top-0 bottom-0 cursor-pointer opacity-0"
                        />
                        Upload Image
                    </div>
                </div>

                <div className="w-full flex flex-col items-center gap-6">
                    <div className="w-full flex flex-row gap-8">
                        <div className="w-[205px]">
                            <label className="text-bright-blue block text-subheading2" htmlFor="animalTypeId">
                                Type
                            </label>
                            <select
                                name="animalTypeId"
                                className="w-full border rounded-[8px] px-[18px] py-[15px] mt-3"
                                onChange={(e) => {
                                    formik.setFieldValue("animalTypeId", e.target.value);
                                    formik.setFieldValue("breedId", "");
                                }}
                                value={formik.values.animalTypeId}
                            >
                                {
                                    AnimalTypes.map((animalType, index) => {
                                        return <option key={index} value={animalType.id}>{animalType.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="flex-1 relative">
                            <label className="text-bright-blue text-subheading2" htmlFor="size">
                                Breed
                                <span className={`text-subheading2 text-red-500`}>{breedIdInputProps.error && "*"}</span>
                            </label>
                            <select
                                name="breedId"
                                className="w-full border rounded-[8px] px-[18px] py-[15px] mt-3"
                                onChange={(e) => formik.setFieldValue("breedId", e.target.value)}
                                value={formik.values.breedId}
                                required
                            >
                                <option value="" disabled>Select breed</option>
                                {
                                    AnimalBreeds[formik.values.animalTypeId].map((breed, index) => {
                                        return <option key={index} value={breed.id}>{breed.name}</option>
                                    })
                                }
                            </select>
                            {breedIdInputProps.error && breedIdInputProps.errorMessage && (
                                <div className="absolute top-[105%] right-0 text-small text-red-500">
                                {breedIdInputProps.errorMessage}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-8">
                        <ValidatedInput 
                            {...nameInputProps}
                            label="Name"
                            containerStyle="relative w-[205px] flex flex-col gap-3"
                            labelStyle="text-subheading2 text-bright-blue"
                            value={formik.values.name}
                            onChange={(e) => formik.setFieldValue("name", e.target.value)}
                            type="text"
                        />
                        <div className="flex-1">
                            <label className="text-bright-blue block text-subheading2" htmlFor="gender">
                                Sex
                            </label>
                            <select
                                name="gender"
                                className="w-full rounded-[8px] border px-[18px] py-[15px] mt-3"
                                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                                value={formik.values.gender}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <ValidatedInput 
                            {...ageInputProps}
                            label="Age (year)"
                            containerStyle="relative flex-1 flex flex-col gap-3"
                            labelStyle="text-subheading2 text-bright-blue"
                            value={formik.values.age}
                            onChange={(e) => formik.setFieldValue("age", e.target.value)}
                            type="number"
                        />
                         <ValidatedInput 
                            {...weightInputProps}
                            label="Weight (kg)"
                            containerStyle="relative flex-1 flex flex-col gap-3 text-nowrap"
                            labelStyle="text-subheading2 text-bright-blue"
                            value={formik.values.weight}
                            onChange={(e) => formik.setFieldValue("weight", e.target.value)}
                            type="number"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-3 relative">
                        <label className="text-bright-blue block text-subheading2" htmlFor="personality">
                            Personality
                            <span className={`text-subheading2 text-red-500`}>{personalityInputProps.error && "*"}</span>
                        </label>
                        <textarea
                            name="personality"
                            className="w-full h-[96px] px-[18px] py-[15px] border rounded-[8px] resize-none"
                            onChange={(e) => formik.setFieldValue("personality", e.target.value)}
                            value={formik.values.personality}
                            required
                        />
                        {personalityInputProps.error && personalityInputProps.errorMessage && (
                            <div className="absolute top-[105%] right-0 text-small text-red-500">
                            {personalityInputProps.errorMessage}
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-col gap-3 relative">
                        <label className="text-bright-blue block text-subheading2" htmlFor="allergy">
                            Allergies
                            <span className={`text-subheading2 text-red-500`}>{allergyInputProps.error && "*"}</span>
                        </label>
                        <textarea
                            name="allergy"
                            className="w-full h-[96px] px-[18px] py-[15px]  border rounded-[8px] resize-none mt-3"
                            onChange={(e) => formik.setFieldValue("allergy", e.target.value)}
                            value={formik.values.allergy}
                            required
                        />
                        {allergyInputProps.error && allergyInputProps.errorMessage && (
                            <div className="absolute top-[105%] right-0 text-small text-red-500">
                            {allergyInputProps.errorMessage}
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-col gap-3 relative">
                        <label className="text-bright-blue block text-subheading2" htmlFor="otherDetail">
                            Other Details
                            <span className={`text-subheading2 text-red-500`}>{otherDetailInputProps.error && "*"}</span>
                        </label>
                        <textarea
                            name="otherDetail"
                            className="w-full h-[96px] px-[18px] py-[15px]  border rounded-[8px] resize-none mt-3"
                            onChange={(e) => formik.setFieldValue("otherDetail", e.target.value)}
                            value={formik.values.otherDetail}
                            required
                        />
                        {otherDetailInputProps.error && otherDetailInputProps.errorMessage && (
                            <div className="absolute top-[105%] right-0 text-small text-red-500">
                            {otherDetailInputProps.errorMessage}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-bright-green round-[8px] w-fit h-fit justify-self-center py-3 px-6 rounded-[8px] text-white text-button"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
