"use client";
import React, { useState } from 'react';

// Navbar
function Navbar() {
    return (
        <nav className="fixed top-0 bg-amber-500 w-full z-10">
            <div className="mx-auto px-10 flex items-center justify-between h-16">
                <div>
                    <a href="/admin">
                        <img src="/logo-login.png" width={35} alt="Admin Logo" />
                    </a>
                </div>
                <div className="flex items-center">
                    <h1 className="text-white font-bold italic text-4xl">Administrador / Categorías</h1>
                </div>
                <div className="flex items-center">
                    {/* Aquí puedes agregar contenido adicional al navbar si es necesario */}
                </div>
            </div>
        </nav>
    );
}

// Modal para añadir/editar categoría
function CategoryModal({
  isOpen,
  onClose,
  onSave,
  categoryToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  categoryToEdit?: { name: string };
}) {
  const [name, setName] = useState(categoryToEdit ? categoryToEdit.name : "");

  const handleSave = () => {
    onSave(name);
    setName("");
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-1/3">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">
            {categoryToEdit ? "Editar Categoría" : "Añadir Categoría"}
          </h2>
        </div>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            {categoryToEdit ? "Guardar" : "Añadir"}
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}


// Componente de categoría
function CategoryItem({
  category,
  onEdit,
  onDelete,
}: {
  category: { id: number; name: string };
  onEdit: (category: { id: number; name: string }) => void;
  onDelete: (category: { name: string }) => void;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <span>{category.name}</span>
      <div>
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onEdit(category)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(category)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Tacos" },
    { id: 2, name: "Bebidas" },
    { id: 3, name: "Postres" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [categoryToEdit, setCategoryToEdit] = useState<
    { name: string; id: number } | undefined
  >();

  const handleAddCategory = (name: string) => {
    const newCategory = { id: categories.length + 1, name };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (name: string) => {
    if (categoryToEdit !== undefined) {
      const editedCategories = categories.map((category) =>
        category.id === categoryToEdit.id ? { ...category, name } : category
      );
      setCategories(editedCategories);
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
    const updatedCategories = categories.filter(
      (cat) => cat.name !== categoryName
    );
    setCategories(updatedCategories);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 px-4 ">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-bold">Categorias</h2>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddModalOpen(true)}
          >
            Añadir
          </button>
        </div>
        <div className="mb-4">
          <CategoryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddCategory}
          />
        </div>
        {categories.map((category) => (
          <CategoryItem
          key={category.id}
          category={category}
          onEdit={(category: { id: number; name: string }) => {
            setCategoryToEdit({ id: category.id, name: category.name });
            setIsEditModalOpen(true);
          }}
          onDelete={(category) => handleDeleteCategory(category.name)}
        />
        ))}
        <CategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditCategory}
          categoryToEdit={categoryToEdit ? categoryToEdit : undefined}
        />
      </div>
    </div>
  );
}
