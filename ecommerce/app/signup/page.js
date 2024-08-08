"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { FaCrown } from "react-icons/fa6";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(data);
    reset(); // Reset form fields after submission
  };

  return (
    <div className="flex flex-1 flex-row w-full h-screen">
      <div className="md:flex-[0.35] md:block hidden w-full h-screen">
        <Image
          src="/images/signup.jpg"
          height={1000}
          width={1000}
          alt="Image"
          className="h-full w-full "
        />
      </div>
      <div className="md:flex-[0.65] w-full relative flex items-center justify-center bg-gray-100">
        <div className="bg-white relative p-6 rounded shadow-md w-full max-w-md">
          <div className="relative w-full">
            <h2 className="text-2xl relative text-center uppercase text-ellipsis font-mono font-bold mb-5">
              Kingsvilla
            </h2>
            <FaCrown className="text-yellow-500 text-lg absolute md:left-28 left-20 top-0 -rotate-45" />
          </div>
          <h2 className="text-2xl font-bold mb-5">Create a new account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                className={`w-full p-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded mt-1`}
                type="text"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded mt-1`}
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded mt-1`}
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                className={`w-full p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded mt-1`}
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                type="submit"
                className="text-main-text border mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer px-5 py-1 text-base font-semibold hover:bg-main-text hover:text-white bg-white outline-1 "
              >
                Sign Up
              </button>
              <button
                type="button"
                className="text-main-text border mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer px-5 py-1 text-base font-semibold hover:bg-main-text hover:text-white bg-white outline-1 "
                onClick={() => reset()}
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="/login" className="text-main-text underline">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
