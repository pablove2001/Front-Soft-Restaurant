import React from 'react';

// Componente de Card reutilizable
function AdminCard({ title, imageUrl, link }) {
    return (
        <a href={link}>
            <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-center items-center">
                <img className="w-40 h-40 object-cover m-4" src={imageUrl} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                </div>
            </div>
        </a>
    );
}

export default function AdminPage() {
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
                            <h1 className="text-white font-bold italic text-4xl">Administrador / Panel de control</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* Aquí puedes agregar contenido adicional al navbar si es necesario */}
                    </div>
                </div>
            </nav>

            {/* Espacio en blanco */}
            <div className="h-20"></div>

            {/* Cards de administrador */}
            <div className="flex flex-wrap justify-center">
                <div className="flex justify-center items-center h-screen">
                    <AdminCard title="Empleados" imageUrl="/empleados.png" link="/admin/empleados" />
                    <AdminCard title="Productos" imageUrl="/hamburguesa.png" link="/admin/productos" />
                    <AdminCard title="Categorías" imageUrl="/categorias.png" link="/admin/categorias" />
                    <AdminCard title="Mesas" imageUrl="/comedor.png" link="/admin/mesas" />
                </div>
            </div>
        </div>
    );
}
