import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import useUserInfo from "@/app/apis/userInfo";

const Product = () => {
  const userID = useUserInfo();
  console.log({ userID });
  const [products, setProducts] = useState([]);
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
    control,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      offer: 0,
      ratings: [
        {
          user: userID?.user?._id, // Default value for user ID
          rating: 1,
          comment: "Great product!",
        },
      ],
      gender: "",
      category: "",
      brand: "",
      stock: 0,
      images: [{ url: "", altText: "" }],
      sizes: [{ size: "", stock: 0 }],
      isActive: true,
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const {
    fields: ratingFields,
    append: appendRating,
    remove: removeRating,
  } = useFieldArray({
    control,
    name: "ratings",
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

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
        offer: 0,
        ratings: [
          {
            user: userID?.user?._id, // Default value for user ID
            rating: 1,
            comment: "Great product!",
          },
        ],
        gender: "",
        category: "",
        brand: "",
        stock: 0,
        images: [{ url: "", altText: "" }],
        sizes: [{ size: "", stock: 0 }],
        isActive: true,
      }
    );
    if (product) {
      setValue("category", product.category._id);
      setValue("brand", product.brand._id);
      if (product.images && product.images.length > 0) {
        setValue("images", product.images);
      }
      if (product.ratings && product.ratings.length > 0) {
        setValue("ratings", product.ratings);
      }
      if (product.sizes && product.sizes.length > 0) {
        setValue("sizes", product.sizes);
      }
    }
  };

  const closeModal = () => {
    setModalState({
      open: false,
      type: "",
      product: null,
    });
  };

  const onAddProduct = async (data) => {
    try {
      const response = await customAxiosPOST("", createProductApi, data);
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
        data
      );
      if (response.status) {
        const updatedProducts = products.map((product) =>
          product._id === modalState.product._id
            ? { ...product, ...data }
            : product
        );
        setProducts(updatedProducts);
        closeModal();
        fetchProducts();
        toast.success(response.message || "Product updated successfully.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (modalState) => {
    try {
      const response = await customAxiosDELETE(
        "",
        productApi(modalState)
      );
      if (response.status) {
        setProducts(products.filter((p) => p._id !== modalState.product._id));
        closeModal();
        toast.success(response.message);
        fetchProducts();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      fetchProducts();
      console.log(error)
      // toast.error("Failed to delete product.");
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
              <th className="border border-gray-300 text-center p-2">Offer</th>
              <th className="border border-gray-300 text-center p-2">Rating</th>
              <th className="border border-gray-300 text-center p-2">Stock</th>
              <th className="border border-gray-300 text-center p-2">Gender</th>
              <th className="border border-gray-300 text-center p-2">Active</th>
              <th className="border border-gray-300 text-center p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products?.map((product, index) => (
                <tr key={index}>
                  <td className="border h-[50px] w-[50px] border-gray-300 p-2 text-center">
                    <Image
                      height={50}
                      width={50}
                      src={product?.images[0]?.url || ``}
                      alt={product?.images[0]?.altText || "Product Image"}
                      className="h-full w-full"
                    />
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.name && product["name"]}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    ₹{product?.price && product["price"]}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.offer && product["offer"]}%
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.ratings && product["ratings"][0]?.rating}/5
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.stock && product["stock"]}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {product?.gender && product["gender"]}
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
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalState.open && (
        <Modal
          open={modalState.open}
          setModelOpen={closeModal}
          modelContentCss={`!w-[800px] !overflow-y-auto ${
            modalState.type === "delete" && "!h-[200px]"
          } p-5 border border-main-text bg-main-bg`}
        >
          <h3 className="text-xl font-semibold mb-4">
            {modalState.type === "add" ? "Add New Product" : "Edit Product"}
          </h3>

          <form
            onSubmit={handleSubmit(
              modalState.type === "add" ? onAddProduct : onEditProduct
            )}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: "Price is required" })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="offer" className="block mb-1">
                Offer (%)
              </label>
              <input
                type="number"
                id="offer"
                {...register("offer")}
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block mb-1">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="brand" className="block mb-1">
                Brand
              </label>
              <select
                id="brand"
                {...register("brand", { required: "Brand is required" })}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="stock" className="block mb-1">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                {...register("stock", { required: "Stock is required" })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.stock && (
                <p className="text-red-500">{errors.stock.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="isActive" className="block mb-1">
                Active
              </label>
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="mr-2"
              />
              <label htmlFor="isActive">Is Active</label>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Images</label>
              {imageFields.map((field, index) => (
                <div key={field.id} className="mb-2 flex gap-2 items-center">
                  <input
                    type="text"
                    {...register(`images.${index}.url`)}
                    placeholder="Image URL"
                    className="border border-gray-300 p-2 w-full"
                  />
                  <input
                    type="text"
                    {...register(`images.${index}.altText`)}
                    placeholder="Alt Text"
                    className="border border-gray-300 p-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendImage({ url: "", altText: "" })}
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Image
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Ratings</label>
              {ratingFields.map((field, index) => (
                <div key={field.id} className="mb-2">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      {...register(`ratings.${index}.user`)}
                      placeholder="User ID"
                      className="border border-gray-300 p-2 w-full"
                    />
                    <input
                      type="number"
                      {...register(`ratings.${index}.rating`, { required: "rating is required" })}
                      placeholder="Rating (1-5)"
                      className="border border-gray-300 p-2 w-full"
                    />
                  </div>
                  {errors.ratings && (
                <p className="text-red-500">{errors.ratings.message}</p>
              )}

                  <textarea
                    {...register(`ratings.${index}.comment`)}
                    placeholder="Comment"
                    className="border border-gray-300 p-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeRating(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove Rating
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendRating({
                    user: "",
                    rating: 0,
                    comment: "Great product!",
                  })
                }
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Rating
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Sizes and Stock</h3>
              {sizeFields.map((item, index) => (
                <div key={item.id} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register(`sizes.${index}.size`, { required: true })}
                    placeholder="Size"
                    className="border p-2 rounded w-1/2"
                  />
                  <input
                    type="number"
                    {...register(`sizes.${index}.stock`, { required: true })}
                    placeholder="Stock"
                    className="border p-2 rounded w-1/2"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendSize({ size: "", stock: 0 })}
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
              >
                <FaPlus /> Add Size
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                {modalState.type === "add" ? "Add Product" : "Update Product"}
              </button>
              {modalState.type === "delete" && (
                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Delete Product
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Product;
