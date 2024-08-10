import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../../components/common/Modal";
import {
  customAxiosDELETE,
  customAxiosGET,
  customAxiosPOST,
  customAxiosPUT,
} from "@/app/apis/methods";
import { toast } from "react-toastify";
import { brandApi, createBrandApi, getBrandApi } from "@/app/apis/list";
import Image from "next/image";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: "",
    brand: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { brandName: "", isActive: true, logoUrl: "" },
  });

  // Fetch brands from the API
  const fetchBrands = async () => {
    try {
      const response = await customAxiosGET("", getBrandApi);
      if (response.status) {
        setBrands(response.data.brandlist);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch brands.");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Open modal for adding, editing, or deleting a brand
  const openModal = (type, brand = null) => {
    setModalState({
      open: true,
      type,
      brand,
    });
    reset(brand || { brandName: "", isActive: true, logoUrl: "" });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      open: false,
      type: "",
      brand: null,
    });
  };

  // Add a new brand
  const onAddBrand = async (data) => {
    try {
      const response = await customAxiosPOST("", createBrandApi, data);
      if (response.status) {
        setBrands([...brands, response.data]);
        closeModal();
        toast.success(response.message);
        fetchBrands();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add brand.");
    }
  };

  // Edit a brand
  const onEditBrand = async (data) => {
    try {
      const response = await customAxiosPUT(
        "",
        brandApi(modalState.brand._id),
        data
      );
      if (response.status) {
        const updatedBrands = brands.map((brand) =>
          brand._id === modalState.brand._id ? { ...brand, ...data } : brand
        );
        setBrands(updatedBrands);
        closeModal();
        toast.success(response.message || "Brand updated successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update brand.");
    }
  };

  // Delete a brand
  const handleDeleteBrand = async () => {
    try {
      const response = await customAxiosDELETE(
        "",
        brandApi(modalState.brand._id)
      );
      if (response.status) {
        setBrands(brands.filter((b) => b._id !== modalState.brand._id));
        closeModal();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete brand.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Brands</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex items-center gap-2"
        >
          <FaPlus /> Add Brand
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Brand List</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 text-center p-2">Logo</th>
              <th className="border border-gray-300 text-center p-2">Name</th>
              <th className="border border-gray-300 text-center p-2">Active</th>
              <th className="border border-gray-300 text-center p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td className="border border-gray-300 h-[50px] w-[50px]   p-2 text-center">
                  <Image height={100} width={100} src={brand.logoUrl} alt="Brand Logo" className="h-full w-full" />
                </td>
                <td className="border border-gray-300 text-center p-2">
                  {brand.brandName}
                </td>
                <td className="border border-gray-300  p-2 text-center">
                  <input type="checkbox" checked={brand.isActive} readOnly />
                </td>

                <td className="border border-gray-300 text-center p-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal("edit", brand)}
                    className="bg-yellow-500 text-white p-1 px-3 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", brand)}
                    className="bg-red-500 text-white p-1 px-3 rounded flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Brand Modal */}
      <Modal
        open={modalState.open && modalState.type === "add"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] p-5 border border-main-text bg-main-bg"
      >
        <h3 className="text-lg font-semibold mb-2">Add Brand</h3>
        <form onSubmit={handleSubmit(onAddBrand)}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Brand Name</label>
            <input
              type="text"
              {...register("brandName", { required: "Brand Name is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.brandName && (
              <span className="text-red-500 text-sm">
                {errors.brandName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Logo URL</label>
            <input
              type="text"
              {...register("logoUrl")}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isActive")}
              defaultChecked
              className="form-checkbox"
            />
            <label className="font-semibold">Active</label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded flex items-center gap-1"
            >
              <FaPlus /> Add Brand
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded flex items-center gap-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal
        open={modalState.open && modalState.type === "edit"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] p-5 border border-main-text bg-main-bg"
      >
        <h3 className="text-lg font-semibold mb-2">Edit Brand</h3>
        <form onSubmit={handleSubmit(onEditBrand)}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Brand Name</label>
            <input
              type="text"
              defaultValue={modalState.brand?.brandName}
              {...register("brandName", { required: "Brand Name is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.brandName && (
              <span className="text-red-500 text-sm">
                {errors.brandName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Logo URL</label>
            <input
              type="text"
              defaultValue={modalState.brand?.logoUrl}
              {...register("logoUrl")}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isActive")}
              defaultChecked={modalState.brand?.isActive}
              className="form-checkbox"
            />
            <label className="font-semibold">Active</label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-yellow-500 text-white p-2 rounded flex items-center gap-1"
            >
              <FaEdit /> Edit Brand
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded flex items-center gap-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Brand Modal */}
      <Modal
        open={modalState.open && modalState.type === "delete"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] p-5 border border-main-text bg-main-bg !h-[200px]"
      >
        <h3 className="text-lg font-semibold mb-2">Delete Brand</h3>
        <p>Are you sure you want to delete this brand?</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDeleteBrand}
            className="bg-red-500 text-white p-2 rounded flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded flex items-center gap-1"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Brand;
