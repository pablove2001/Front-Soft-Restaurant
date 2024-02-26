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
                    <h1 className="text-white font-bold italic text-4xl">Administrador / Mesas</h1>
                </div>
                <div className="flex items-center">
                    {/* Aquí puedes agregar contenido adicional al navbar si es necesario */}
                </div>
            </div>
        </nav>
    );
}

// Modal para añadir/editar mesa
function TableModal({
  isOpen,
  onClose,
  onSave,
  tableToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, waiter: string) => void;
  tableToEdit?: { name: string; waiter: string };
}) {
  const [name, setName] = useState(tableToEdit ? tableToEdit.name : "");
  const [waiter, setWaiter] = useState(tableToEdit ? tableToEdit.waiter : "");

  const handleSave = () => {
    onSave(name, waiter);
    setName("");
    setWaiter("");
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
            {tableToEdit ? "Editar Mesa" : "Añadir Mesa"}
          </h2>
        </div>
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Nombre de la mesa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
          placeholder="Nombre del mesero asignado"
          value={waiter}
          onChange={(e) => setWaiter(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            {tableToEdit ? "Guardar" : "Añadir"}
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

// Componente de mesa
function TableItem({
  table,
  onEdit,
  onDelete,
}: {
  table: { id: number; name: string; waiter: string };
  onEdit: (table: { id: number; name: string; waiter: string }) => void;
  onDelete: (table: { name: string }) => void;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-2">
      <div>
        <span>{table.name}</span>
        <br />
        <small>Mesero asignado: {table.waiter}</small>
      </div>
      <div>
        <button
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onEdit(table)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(table)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function TablesPage() {
  const [tables, setTables] = useState([
    { id: 1, name: "Mesa 1", waiter: "Juan" },
    { id: 2, name: "Mesa 2", waiter: "Maria" },
    { id: 3, name: "Mesa 3", waiter: "Pedro" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tableToEdit, setTableToEdit] = useState<{ name: string; waiter: string; id: number } | undefined>();

  const handleAddTable = (name: string, waiter: string) => {
    const newTable = { id: tables.length + 1, name, waiter };
    setTables([...tables, newTable]);
  };

  const handleEditTable = (name: string, waiter: string) => {
    if (tableToEdit !== undefined) {
      const editedTables = tables.map((table) =>
        table.id === tableToEdit.id ? { ...table, name, waiter } : table
      );
      setTables(editedTables);
    }
  };

  const handleDeleteTable = (tableName: string) => {
    const updatedTables = tables.filter(
      (table) => table.name !== tableName
    );
    setTables(updatedTables);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 px-4 ">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-bold">Mesas</h2>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddModalOpen(true)}
          >
            Añadir
          </button>
        </div>
        <div className="mb-4">
          <TableModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddTable}
          />
        </div>
        {tables.map((table) => (
          <TableItem
            key={table.id}
            table={table}
            onEdit={(table) => {
              setTableToEdit({ id: table.id, name: table.name, waiter: table.waiter });
              setIsEditModalOpen(true);
            }}
            onDelete={(table) => handleDeleteTable(table.name)}
          />
        ))}
        <TableModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditTable}
          tableToEdit={tableToEdit ? tableToEdit : undefined}
        />
      </div>
    </div>
  );
}

