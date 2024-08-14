import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Content from "../common/Content";
import { FaPlus } from "react-icons/fa6";

const CheckOutLeft = ({setAddresses,addresses}) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newAddress = {
      ...data,
      selected: addresses.length === 0, // Select the first address by default
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddressIndex(addresses.length);
    setShowForm(false);
    reset();
  };

  const handleAddNewAddress = () => {
    setShowForm(true);
  };

  const handleAddressSelection = (index) => {
    setSelectedAddressIndex(index);
    setAddresses((prevAddresses) =>
      prevAddresses.map((address, i) => ({
        ...address,
        selected: i === index,
      }))
    );
  };

  return (
    <div>
      <div className="bg-main-bg md:p-5  p-2">
      <Content text={"Address"} variant={6} weight={6} />
        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
              <div className="flex flex-col gap-1 pt-3">
                <label className="text-main-text font-600 text-[17px]">
                  First Name:
                </label>
                <input
                  className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                  {...register("firstName", {
                    required: "First name is required.",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1 pt-3">
                <label className="text-main-text font-600 text-[17px]">
                  Last Name:
                </label>
                <input
                  className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                  {...register("lastName", {
                    required: "Last name is required.",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-3">
              <label className="text-main-text font-600 text-[17px]">
                Flat, House No., Building:
              </label>
              <input
                className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                {...register("address", { required: "Address is required." })}
              />
              {errors.address && (
                <p className="text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 pt-3">
              <label className="text-main-text font-600 text-[17px]">
                Number:
              </label>
              <input
                className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                {...register("number", {
                  required: "Number is required.",
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid number.",
                  },
                })}
              />
              {errors.number && (
                <p className="text-red-600">{errors.number.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <label className="text-main-text font-600 text-[17px]">
                Area, Colony, Street:
              </label>
              <input
                className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                {...register("area", { required: "Area is required." })}
              />
              {errors.area && (
                <p className="text-red-600">{errors.area.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col gap-1 pt-3">
                <label className="text-main-text font-600 text-[17px]">
                  Town/City:
                </label>
                <input
                  className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                  {...register("city", { required: "Town/City is required." })}
                />
                {errors.city && (
                  <p className="text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1 pt-3">
                <label className="text-main-text font-600 text-[17px]">
                  Pin Code:
                </label>
                <input
                  className="border-2 border-main-bg outline-2 bg-white rounded-md p-1 text-main-text font-serif"
                  {...register("pinCode", {
                    required: "Pin Code is required.",
                    pattern: {
                      value: /^[1-9][0-9]{5}$/,
                      message: "Please enter a valid Pin Code.",
                    },
                  })}
                />
                {errors.pinCode && (
                  <p className="text-red-600">{errors.pinCode.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-5 w-full">
                <button
                  onClick={() => {
                    reset();
                    setShowForm(false)
                  }}
                  className="border-2 w-full cursor-pointer hover:bg-slate-400 border-main-text bg-main-bg text-black outline-2 rounded-md p-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-2 w-full cursor-pointer hover:bg-slate-400 border-main-text bg-black text-white outline-2 rounded-md p-1"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={handleAddNewAddress}
            className="border-2 flex items-center mt-3 gap-2 justify-center w-full cursor-pointer hover:bg-slate-100 border-main-text bg-white text-black outline-2 rounded-md p-1"
          >
            Add New Address <FaPlus />
          </button>
        )}

        <div className="mt-5 rounded-md ">
          {addresses.map((address, index) => (
            <div key={index} className="bg-white p-3 border border-main-text rounded-md shadow-md mb-3">
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddressIndex === index}
                onChange={() => handleAddressSelection(index)}
                className="mr-2 accent-black"
              />
              <strong>Address {index + 1}</strong>
              <p><strong>First Name:</strong> {address.firstName}</p>
              <p><strong>Last Name:</strong> {address.lastName}</p>
              <p><strong>Flat, House No., Building:</strong> {address.address}</p>
              <p><strong>Number:</strong> {address.number}</p>
              <p><strong>Area, Colony, Street:</strong> {address.area}</p>
              <p><strong>Town/City:</strong> {address.city}</p>
              <p><strong>Pin Code:</strong> {address.pinCode}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckOutLeft;
