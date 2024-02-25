"use client";
import React, { useState } from 'react';

// Modal para añadir/editar producto
function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: {
    title: string;
    imageUrl: string;
    price: number; // Corrección aquí
    description: string;
  }) => void;
  productToEdit?: {
    title: string;
    imageUrl: string;
    price: number; // Corrección aquí
    description: string;
  };
}) {
  const [title, setTitle] = useState(productToEdit ? productToEdit.title : "");
  const [imageUrl, setImageUrl] = useState(
    productToEdit ? productToEdit.imageUrl : ""
  );
  const [price, setPrice] = useState(productToEdit ? productToEdit.price.toString() : ""); // Corrección aquí
  const [description, setDescription] = useState(
    productToEdit ? productToEdit.description : ""
  );

  const handleSave = () => {
    onSave({ title, imageUrl, price: Number(price), description }); // Corrección aquí
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
            {productToEdit ? "Editar Producto" : "Agregar Producto"}
          </h2>
        </div>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Título del producto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Precio del producto"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Descripción del producto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            {productToEdit ? "Guardar" : "Agregar"}
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


// Componente de Card reutilizable para productos
function ProductCard({
  title,
  imageUrl,
  price,
  description,
  onEdit,
  onDelete,
}: {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="w-64 rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-40 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="text-gray-900 font-bold text-lg">${price}</div>
        <div className="flex justify-center m-2">
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onEdit}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [products, setProducts] = useState([
    {
      id: "001",
      title: "Taco de pastor",
      imageUrl: "/tacos.png",
      price: 20,
      description: "Descripción del producto 1",
    },
    {
      id: "002",
      title: "Coca cola",
      imageUrl: "/coca.png",
      price: 30,
      description: "Descripción del producto 2",
    },
    {
      id: "003",
      title: "Pastel chocolate",
      imageUrl: "/pastel.png",
      price: 25,
      description: "Descripción del producto 3",
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEditIndex, setProductToEditIndex] = useState<number | null>(
    null
  );

  interface Product {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
  }

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...product,
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (product: Omit<Product, "id">) => {
    const editedProducts = [...products];
    editedProducts[productToEditIndex!] = {
      ...editedProducts[productToEditIndex!],
      ...product,
    };
    setProducts(editedProducts);
    setIsEditModalOpen(false);
    setProductToEditIndex(null);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 bg-amber-500 w-full z-10">
        <div className="mx-auto px-10 flex items-center justify-between h-16">
          <div>
            <a href="/admin">
              <img src="/logo-login.png" width={35} alt="Admin Logo" />
            </a>
          </div>
          <div className="flex items-center">
            <div className="relative ">
              <h1 className="text-white font-bold italic text-4xl">
                Administrador / Productos
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            {/* Aquí puedes agregar contenido adicional al navbar si es necesario */}
          </div>
        </div>
      </nav>

      {/* Espacio en blanco */}
      <div className="h-20"></div>

      {/* Título y botón Agregar */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar
        </button>
      </div>

      {/* Cards de productos */}
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            price={product.price}
            description={product.description}
            onEdit={() => {
              setIsEditModalOpen(true);
              setProductToEditIndex(index);
            }}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>

      {/* Modales */}
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct} 
      />
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProduct} 
        productToEdit={products[productToEditIndex!]}
      />
    </div>
  );
}

