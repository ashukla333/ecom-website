"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { FaCrown } from "react-icons/fa6";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); // Reset form fields after submission
  };

  return (
    <div className="flex flex-1 bg-main-bg h-screen flex-row w-full">
      <div className="md:flex-[0.35] md:block hidden w-full h-screen">
        <Image
          src="/images/loginscreen.jpg"
          height={1000}
          width={1000}
          alt="Image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:flex-[0.65] flex-1 w-full relative flex items-center justify-center bg-gray-100">
        {/* <div className="h-full w-full absolute top-0 left-0">
          <Image
            src="/images/img11.jpg"
            height={1000}
            width={1000}
            alt="Image"
            className="h-full w-full object-cover"
          />
        </div> */}
        <div className="bg-white relative p-6 rounded shadow-md w-full max-w-md">
          <div className="relative w-full">
            <h2 className="text-2xl relative text-center uppercase text-ellipsis font-mono font-bold mb-5">
              Kingsvilla
            </h2>
              <FaCrown className="text-yellow-500 text-lg absolute md:left-28 left-20 top-0 -rotate-45" />
          </div>
          <h2 className="text-2xl font-bold mb-5">Login to your account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                type="submit"
                className="text-main-text border mt-2 shadow-md drop-shadow-md shadow-slate-300 border-main-text text-center hover:ring-white cursor-pointer px-5 py-1 text-base font-semibold hover:bg-main-text hover:text-white bg-white outline-1 "
              >
                Login
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
            <a href="/signup" className="text-main-text underline">
              Create New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
