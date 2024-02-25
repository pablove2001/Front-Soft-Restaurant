"use client";
import React, { useState } from 'react';

// Modal para añadir/editar empleado
function EmployeeModal({ isOpen, onClose, onSave, employeeToEdit }) {
    const [name, setName] = useState(employeeToEdit ? employeeToEdit.name : '');
    const [id, setId] = useState(employeeToEdit ? employeeToEdit.id : '');
    const [role, setRole] = useState(employeeToEdit ? employeeToEdit.role : '');

    const handleSave = () => {
        onSave({ name, id, role });
        onClose();
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg w-1/3">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">{employeeToEdit ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
                </div>
                <input
                    type="text"
                    className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
                    placeholder="Nombre del empleado"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
                    placeholder="ID del empleado"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full border-gray-300 rounded-md mb-4 px-3 py-2"
                    placeholder="Rol del empleado"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <div className="flex justify-center">
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>{employeeToEdit ? 'Guardar' : 'Agregar'}</button>
                    <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

// Componente de Card reutilizable para empleados
function EmployeeCard({ name, id, role, onEdit, onDelete }) {
    return (
        <div className="w-full rounded overflow-hidden shadow-lg m-4">
            <div className="px-6 py-4">
                <div>Nombre del empleado: <strong>{name}</strong></div>
                <div>ID del empleado: <strong>{id}</strong></div>
                <div>Rol: <strong>{role}</strong></div>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onEdit}>
                        Editar
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EmployeePage() {
    const [employees, setEmployees] = useState([
        { id: "001", name: "Juan Perez", role: "Gerente" },
        { id: "002", name: "María López", role: "Cajero" },
        { id: "003", name: "Pedro Ramirez", role: "Cocinero" },
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    const handleAddEmployee = ({ name, id, role }) => {
        const newEmployee = { id, name, role };
        setEmployees([...employees, newEmployee]);
    };

    const handleEditEmployee = ({ name, id, role }) => {
        const editedEmployees = employees.map(employee =>
            employee.id === id ? { ...employee, name, role } : employee
        );
        setEmployees(editedEmployees);
        setIsEditModalOpen(false); // Cerrar el modal de edición después de guardar los cambios
    };

    const handleDeleteEmployee = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="fixed top-0 bg-amber-500 w-full z-10">
                <div className="mx-auto px-10 flex items-center justify-between h-16">
                    <div>
                        <a href="/admin">
                            <img src="/logo-login.png" width={30} alt="Admin Logo" />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-white font-bold italic text-4xl">Administrador / Empleados</h1>
                    </div>
                    <div className="flex items-center">
                    </div>
                </div>
            </nav>

            {/* Espacio en blanco */}
            <div className="h-20"></div>

            {/* Título y botón Agregar */}
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-bold">Empleados</h2>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsAddModalOpen(true)}>
                    Agregar
                </button>
            </div>

            {/* Cards de empleados */}
            <div>
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        name={employee.name}
                        id={employee.id}
                        role={employee.role}
                        onEdit={() => {
                            setEmployeeToEdit(employee);
                            setIsEditModalOpen(true);
                        }}
                        onDelete={() => handleDeleteEmployee(employee.id)}
                    />
                ))}
            </div>

            {/* Modales */}
            <EmployeeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddEmployee}
            />
            <EmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditEmployee}
                employeeToEdit={employeeToEdit}
            />
        </div>
    );
}
