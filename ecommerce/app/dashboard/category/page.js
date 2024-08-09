import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../../components/common/Modal';

const initialCategories = [
  { id: 1, name: 'Category A' },
  { id: 2, name: 'Category B' },
  // Add more categories here if needed
];

const Category = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [modalState, setModalState] = useState({
    open: false,
    type: '',
    category: null,
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '' }
  });

  const openModal = (type, category = null) => {
    setModalState({
      open: true,
      type,
      category,
    });
    reset(category || { name: '' });
  };

  const closeModal = () => {
    setModalState({
      open: false,
      type: '',
      category: null,
    });
  };

  const onAddCategory = (data) => {
    setCategories([...categories, { ...data, id: categories.length + 1 }]);
    closeModal();
  };

  const onEditCategory = (data) => {
    setCategories(categories.map(c => c.id === modalState.category.id ? { ...data, id: c.id } : c));
    closeModal();
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter(c => c.id !== modalState.category.id));
    closeModal();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      {/* Button to open Add Category Modal */}
      <div className='flex justify-end'>
        <button
          onClick={() => openModal('add')}
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
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 text-center p-2">{category.name}</td>
                <td className="border border-gray-300 p-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal('edit', category)}
                    className="bg-yellow-500 text-white p-1 px-3 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => openModal('delete', category)}
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
        open={modalState.open && (modalState.type === 'add' || modalState.type === 'edit')}
        setModelOpen={closeModal}
        modelContentCss="!w-[500px] relative !h-[200px] border border-main-text bg-main-bg p-5 scrollbar-hide !overflow-scroll"
      >
        <h3 className="text-lg font-semibold mb-2">{modalState.type === 'add' ? 'Add New Category' : 'Edit Category'}</h3>
        <form onSubmit={handleSubmit(modalState.type === 'add' ? onAddCategory : onEditCategory)}>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
          />
          <div className='absolute bottom-3 right-3'>
            <button
              type="submit"
              className={`bg-${modalState.type['edit'] ? 'green' : 'blue'}-500 flex gap-3 items-center text-white p-2 rounded`}
            >
              {modalState.type === 'edit' ? <FaEdit /> : <FaPlus />} {modalState.type ['edit'] ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Category Confirmation Modal */}
      <Modal
        open={modalState.open && modalState.type === 'delete'}
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
}

export default Category;
