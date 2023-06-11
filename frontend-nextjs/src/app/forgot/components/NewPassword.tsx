"use client";
import SignPageHeader from "@/components/SignPageHeader";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import Link from "next/link";

const ConfirmCodeSchema = z
  .object({
    email: z.string().email("Invalid email"),
    confirmcode: z.string().length(6, "Invalid Confirmation Code"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmpassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

type ConfirmCodeSchemaData = z.infer<typeof ConfirmCodeSchema>;

interface NewPasswordProps {
  setFormState: React.Dispatch<React.SetStateAction<string>>;
  username: string;
}

const NewPassword: React.FC<NewPasswordProps> = ({
  username,
  setFormState,
}) => {
  const [successState, setsuccessState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmCodeSchemaData>({
    defaultValues: {
      email: username || "",
      confirmcode: "",
      password: "",
      confirmpassword: "",
    },
    resolver: zodResolver(ConfirmCodeSchema),
  });

  const auth = useAuth();

  const onSubmit: SubmitHandler<ConfirmCodeSchemaData> = async (data) => {
    Auth.forgotPasswordSubmit(data.email, data.confirmcode, data.password)
      .then((data) => {
        setsuccessState(true);
      })
      .catch((err) => {
        console.log(err);
        setFormState("");
      });

    // add toast
  };

  return (
    <>
      {successState ? (
        <div className="flex justify-center items-center ">
          <div className="p-6 ">
            <p className="text-white font-semibold">
              Your password has been successfully reset!
            </p>
            <div className="w-full flex justify-center items-center mt-2">
              <Link href={`/signin`}>
                <p className="text-white font-semibold bg-[#9500FF] p-2 rounded-lg w-fit">
                  Proceed to Signin
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  flex-col justify-center px-6 py-8">
          <SignPageHeader heading="Set a new password" />

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-neutral-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmationcode"
                    className="block text-sm font-medium leading-6 text-neutral-400"
                  >
                    Confirmation Code
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    {...register("confirmcode")}
                    className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                  />
                  {errors.confirmcode && (
                    <p className="text-xs text-red-600">
                      {errors.confirmcode.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-neutral-400"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("password")}
                    className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-neutral-400"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("confirmpassword")}
                    className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                  />
                  {errors.confirmpassword && (
                    <p className="text-xs text-red-600">
                      {errors.confirmpassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={auth.isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#9500FF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9a20f0]"
                >
                  {auth.isLoading ? (
                    <>
                      <div
                        className="w-6 h-6 rounded-full animate-spin
              border-4 border-solid border-white border-t-transparent"
                      ></div>
                    </>
                  ) : (
                    <>Set New Password</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPassword;
