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
import { productApi, createProductApi, getproductApi } from "@/app/apis/list";
import { getBrandApi, getCategoryApi } from "@/app/apis/list";
import Image from "next/image";

const Product = () => {
  const [products, setProducts] = useState([]);
  console.log({products})
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    type: "",
    product: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      stock: 0,
      images: [{ url: "", altText: "" }], // Ensure proper default structure
      isActive: true,
    },
  });
  

  // Fetch products, brands, and categories from the API
  const fetchProducts = async () => {
    try {
      const response = await customAxiosGET("", getproductApi);
      if (response.status) {
        setProducts(response.data.productData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

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
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  // Open modal for adding, editing, or deleting a product
  const openModal = (type, product = null) => {
    setModalState({
      open: true,
      type,
      product,
    });
    reset(
      product || {
        name: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        stock: 0,
        images: [{ url: "", altText: "" }], // Ensure proper default structure
        isActive: true,
      }
    );
    if (product) {
      setValue("category", product.category._id);
      setValue("brand", product.brand._id);
      // Set images if they exist
      if (product.images && product.images.length > 0) {
        setValue("images", product.images);
      }
    }
  };
  

  // Close modal
  const closeModal = () => {
    setModalState({
      open: false,
      type: "",
      product: null,
    });
  };

  const onAddProduct = async (data) => {
    try {
      const response = await customAxiosPOST("", createProductApi, {
        ...data,
        category: data.category,
        brand: data.brand,
      });
      if (response.status) {
        setProducts([...products, response.data]);
        closeModal();
        toast.success(response.message);
        fetchProducts();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };
  
  const onEditProduct = async (data) => {
    try {
      const response = await customAxiosPUT(
        "",
        productApi(modalState.product._id),
        {
          ...data,
          category: data.category,
          brand: data.brand,
        }
      );
      if (response.status) {
        const updatedProducts = products.map((product) =>
          product._id === modalState.product._id
            ? { ...product, ...data }
            : product
        );
        setProducts(updatedProducts);
        closeModal();
        toast.success(response.message || "Product updated successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  // Delete a product
  const handleDeleteProduct = async () => {
    try {
      const response = await customAxiosDELETE(
        "",
        productApi(modalState.product._id)
      );
      if (response.status) {
        setProducts(products.filter((p) => p._id !== modalState.product._id));
        closeModal();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      <div className="flex justify-end">
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white p-2 rounded mb-4 flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Product List</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 text-center p-2">Image</th>
              <th className="border border-gray-300 text-center p-2">Name</th>
              <th className="border border-gray-300 text-center p-2">Price</th>
              <th className="border border-gray-300 text-center p-2">Stock</th>
              <th className="border border-gray-300 text-center p-2">Active</th>
              <th className="border border-gray-300 text-center p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products?.map((product,index) => (
                <tr key={index}>
                  <td className="border h-[50px] w-[50px] border-gray-300 p-2 text-center">
                    <Image
                      height={50}
                      width={50}
                      src={product?.images[0]?.url || ""}
                      alt={product?.images[0]?.altText || "Product Image"}
                      className="h-full w-full"
                    />
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.name && product['name']}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    ${product?.price && product['price']}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.stock && product['stock']}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    <input
                      type="checkbox"
                      checked={product?.isActive}
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 text-center p-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => openModal("edit", product)}
                      className="bg-yellow-500 text-white p-1 px-3 rounded flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => openModal("delete", product)}
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

      {/* Add Product Modal */}
      <Modal
        open={modalState.open && modalState.type === "add"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] !overflow-y-auto p-5 border border-main-text bg-main-bg"
      >
        <h3 className="text-lg font-semibold mb-2">Add Product</h3>
        <form onSubmit={handleSubmit(onAddProduct)}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              {...register("name", { required: "Product Name is required" })}
              className="border p-2 w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              {...register("description")}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="border p-2 w-full"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border p-2 w-full"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category?.categoryName}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Brand</label>
            <select
              {...register("brand", { required: "Brand is required" })}
              className="border p-2 w-full"
            >
              <option value="">Select Brand</option>
              {brands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand?.brandName}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="text-red-500 text-sm">
                {errors.brand.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Stock</label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="border p-2 w-full"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Images</label>
            <input
              type="text"
              {...register("images[0].url", {
                required: "Image URL is required",
              })}
              placeholder="Image URL"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              {...register("images[0].altText")}
              placeholder="Alt Text"
              className="border p-2 w-full"
            />
            {errors.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Active</label>
            <input type="checkbox" {...register("isActive")} className="mr-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        open={modalState.open && modalState.type === "edit"}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] !overflow-y-auto p-5 border border-main-text bg-main-bg"
      >
        <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
        <form onSubmit={handleSubmit(onEditProduct)}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              {...register("name", { required: "Product Name is required" })}
              className="border p-2 w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              {...register("description")}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="border p-2 w-full"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border p-2 w-full"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category?.categoryName}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Brand</label>
            <select
              {...register("brand", { required: "Brand is required" })}
              className="border p-2 w-full"
            >
              <option value="">Select Brand</option>
              {brands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand?.brandName}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="text-red-500 text-sm">
                {errors.brand.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Stock</label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="border p-2 w-full"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Active</label>
            <input type="checkbox" {...register("isActive")} className="mr-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Images</label>
            <input
              type="text"
              {...register("images[0].url", {
                required: "Image URL is required",
              })}
              placeholder="Image URL"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              {...register("images[0].altText")}
              placeholder="Alt Text"
              className="border p-2 w-full"
            />
            {errors.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Product
          </button>
        </form>
      </Modal>

      {/* Delete Product Modal */}
      <Modal
        open={modalState.open && modalState.type === "delete"}
        setModelOpen={closeModal}
        modelContentCss="!w-[600px]  !h-[180px] !overflow-y-auto p-5 border border-main-text bg-main-bg"
      >
        <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleDeleteProduct}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
