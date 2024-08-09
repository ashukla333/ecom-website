import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../../components/common/Modal';

const initialProducts = [
  { id: 1, name: 'Product 1', price: '$10', category: 'Category A',brand: 'demo' },
  { id: 2, name: 'Product 2', price: '$20', category: 'Category B',brand:'demo2' },
  // Add more products here if needed
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [modalState, setModalState] = useState({
    open: false,
    type: '',
    product: null,
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', price: '', category: '' }
  });

  const openModal = (type, product = null) => {
    setModalState({
      open: true,
      type,
      product,
    });
    reset(product || { name: '', price: '', category: '' });
  };

  const closeModal = () => {
    setModalState({
      open: false,
      type: '',
      product: null,
    });
  };

  const onAddProduct = (data) => {
    setProducts([...products, { ...data, id: products.length + 1 }]);
    closeModal();
  };

  const onEditProduct = (data) => {
    setProducts(products.map(p => p.id === modalState.product.id ? { ...data, id: p.id } : p));
    closeModal();
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter(p => p.id !== modalState.product.id));
    closeModal();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      {/* Button to open Add Product Modal */}
    <div className='flex justify-end'>
    <button
        onClick={() => openModal('add')}
        className="bg-blue-500 text-white p-2 rounded mb-4 flex items-center gap-2"
      >
        <FaPlus /> Add Product
      </button>
    </div>

      {/* Product List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Product List</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 text-center p-2">{product.name}</td>
                <td className="border border-gray-300 text-center p-2">{product.price}</td>
                <td className="border border-gray-300 text-center p-2">{product.category}</td>
                <td className="border border-gray-300 text-center p-2">{product.brand}</td>
                <td className="border border-gray-300 text-center items-center justify-center p-2 flex gap-2">
                  <button
                    onClick={() => openModal('edit', product)}
                    className="bg-yellow-500 text-white p-1 px-3 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => openModal('delete', product)}
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

      {/* Add/Edit Product Modal */}
      <Modal
        open={modalState.open && (modalState.type === 'add' || modalState.type === 'edit')}
        setModelOpen={()=>closeModal()}
        modelContentCss="!w-[500px] relative !h-[350px] border border-main-text bg-main-bg p-5 scrollbar-hide !overflow-scroll"
      >
        <h3 className="text-lg font-semibold mb-2">{modalState.type === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
        <form onSubmit={handleSubmit(modalState.type === 'add' ? onAddProduct : onEditProduct)}>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            {...register('price', { required: true })}
            type="text"
            placeholder="Price"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            {...register('category', { required: true })}
            type="text"
            placeholder="Category"
            className="border p-2 rounded mb-2 w-full"
          />
             <input
            {...register('brand', { required: true })}
            type="text"
            placeholder="Brand"
            className="border p-2 rounded mb-2 w-full"
          />
          <div className='absolute bottom-3 right-3'>
            <button
              type="submit"
              className={`bg-${modalState.type['edit'] ? 'green' : 'blue'}-500 flex gap-3 items-center text-white p-2 rounded`}
            >
              {modalState.type === 'edit' ? <FaEdit /> : <FaPlus />} {modalState.type['edit'] ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Product Confirmation Modal */}
      <Modal
        open={modalState.open && modalState.type === 'delete'}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] p-5 border border-main-text  bg-main-bg h-[200px]"
      >
        <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDeleteProduct}
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
}

export default Product;
