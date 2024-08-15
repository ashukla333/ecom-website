"use client"
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
import {
  categoryApi,
  createCategoryApi,
  getCategoryApi,
} from "@/app/apis/list";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  console.log({ categories });
  const [modalState, setModalState] = useState({
    open: false,
    type: "",
    category: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { categoryName: "", description: "", isActive: true },
  });

  // Fetch categories when the component is mounted
  const fetchCategories = async () => {
    try {
      const response = await customAxiosGET("", getCategoryApi);
      if (response.status) {
        setCategories(response.data.categorylist);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (type, category = null) => {
    setModalState({
      open: true,
      type,
      category,
    });
    reset(category || { categoryName: "", description: "", isActive: true });
  };

  const closeModal = () => {
    setModalState({
      open: false,
      type: "",
      category: null,
    });
  };

  const onAddCategory = async (data) => {
    try {
      const response = await customAxiosPOST("", createCategoryApi, data);
      if (response.status) {
        setCategories([...categories, response.data]);
        closeModal();
        toast.success(response.message);
        fetchCategories();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };

  const onEditCategory = async (data) => {
    const response = await customAxiosPUT(
      "",
      categoryApi(modalState.category._id),
      data
    );

    // Debugging: Log the entire response to understand its structure
    console.log("Response:", response);

    if (response && response.data) {
      if (Array.isArray(response.data.categories)) {
        const validCategories = response.data.categories.filter(
          (cat) => cat !== null
        );
        setCategories(validCategories);
        closeModal();
        fetchCategories();
        toast.success(response.message || "Category updated successfully.");
      } else {
        // toast.success(response.message || "Category updated successfully.");
        closeModal();
        fetchCategories();
      }
    } else {
      closeModal();
      fetchCategories();
    //   toast.error("No data received from the server.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await customAxiosDELETE(
        "",
        categoryApi(modalState.category._id)
      );
      if (response.status) {
        setCategories(
          categories.filter((c) => c._id !== modalState.category._id)
        );
        closeModal();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      {/* Button to open Add Category Modal */}
      <div className="flex justify-end">
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Category List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Category List</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Active</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-gray-300 text-center p-2">
                  {category["categoryName"]}
                </td>
                <td className="border border-gray-300 text-center p-2">
                  {category["description"]}
                </td>
                <td className="border border-gray-300 text-center p-2">
                  {category["isActive"] ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal("edit", category)}
                    className="bg-yellow-500 text-white p-1 px-3 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", category)}
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

      {/* Add/Edit Category Modal */}
      <Modal
        open={
          modalState.open &&
          (modalState.type === "add" || modalState.type === "edit")
        }
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] relative !h-[300px] border border-main-text bg-main-bg p-5 scrollbar-hide !overflow-scroll"
      >
        <h3 className="text-lg font-semibold mb-2">
          {modalState.type === "add" ? "Add New Category" : "Edit Category"}
        </h3>
        <form
          onSubmit={handleSubmit(
            modalState.type === "add" ? onAddCategory : onEditCategory
          )}
        >
          <input
            {...register("categoryName", {
              required: "Category name is required",
            })}
            type="text"
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm">
              {errors.categoryName.message}
            </p>
          )}
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
            className="border p-2 rounded mb-2 w-full"
          />
          <div className="flex items-center mb-2">
            <input {...register("isActive")} type="checkbox" className="mr-2" />
            <label>Active</label>
          </div>
          <div className="absolute bottom-3 right-3">
            <button
              type="submit"
              className={`
                ${modalState.type === "edit" ? "bg-green-500" : "bg-blue-500"}
               flex gap-3 items-center text-white p-2 rounded`}
            >
              {modalState.type === "edit" ? <FaEdit /> : <FaPlus />}{" "}
              {modalState.type === "edit" ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Category Confirmation Modal */}
      <Modal
        open={modalState.open && modalState.type === "delete"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] p-5 border border-main-text bg-main-bg !h-[200px]"
      >
        <h3 className="text-lg font-semibold mb-2">Delete Category</h3>
        <p>Are you sure you want to delete this category?</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDeleteCategory}
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

export default Category;
