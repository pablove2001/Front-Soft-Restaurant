'use client'
import { useState } from 'react';

/*Lista de órdenes*/
function Orden({
    numeroOrden,
    status,
    onOrdenClick,
}: {
    numeroOrden: number;
    status: string;
    onOrdenClick: (numeroOrden: number) => void;
}) {
    return (
        <div
            className="w-full bg-gray-200 m-3 border-2 rounded-lg shadow-md p-4 flex justify-between items-center"
            onClick={() => onOrdenClick(numeroOrden)}
        >
            <div className="flex-grow">
                <div className="text-lg font-bold">Orden #{numeroOrden}</div>
                <div>Status: {status}</div>
            </div>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={(e) => {e.stopPropagation(); /* Aquí va la lógica para eliminar la orden */}}>Eliminar</button>
        </div>
    );
}

/*Modal al presionar una orden*/
function ModalOrden({
    onClose,
}: {
    onClose: () => void;
}) {
    //Lista productos
    const products =
    [
        {name: 'Tacos', quantity: 7},
        {name: 'Refrescos', quantity: 4},
        {name: 'Postre', quantity: 2},
    ]

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/2">
                <div className="flex justify-end">
                    <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cerrar</button>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold">Detalles de la orden</h2>
                </div>
                {/* Lista de productos */}
                <div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Cantidad</th>
                                <th className="px-4 py-2"></th> {/* Espacio para el botón Eliminar */}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className=" px-4 py-2">{product.name}</td>
                                    <td className=" px-4 py-2 text-center">{product.quantity}</td>
                                    <td className=" px-4 py-2 flex justify-end">
                                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Summary() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrden, setSelectedOrden] = useState<number | null>(null);

    const handleOrdenClick = (numeroOrden: number) => {
        setSelectedOrden(numeroOrden);
        setModalOpen(true);
    };

    // Aquí deberías obtener las órdenes correspondientes a la mesa seleccionada
    let ordenes = [
        { numero: 1, status: 'En proceso' },
        { numero: 2, status: 'No iniciado' },
        { numero: 3, status: 'Terminado' },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 bg-amber-500 w-full z-10">
                <div className="mx-auto px-10 flex items-center justify-between h-16">
                    <div>
                        {" "}
                        {/* Left side content of the navbar */}
                        <a href="/kiosko">
                            <img src="/t_de_taco_horizontal.png" width={80} alt="Logotipo"></img>
                        </a>
                        {/* Add empty div to push the icon to the right */}
                    </div>

                    <div className="flex items-center">
                        {" "}
                        {/* Middle content of the navbar */}
                        <div className="relative ">
                            <h1 className="text-white font-bold italic text-4xl">Resumen de la Mesa</h1>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {" "}
                        {/* Right side content of the navbar */}
                    </div>
                </div>
            </nav>

            {/*Body*/}
            {/* Espacio en blanco */}
            <div className="h-20"></div>

            {/*Boton Regresar*/}
            <div className="flex items-center justify-between px-10">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    <a href="/waiter">
                        Regresar
                    </a>
                </button>

                {/* Título */}
                {selectedOrden && (
                    <div className="text-center text-2xl font-bold">Órdenes</div>
                )}
                <div></div>{/* Este div vacío se utiliza para mantener el botón Regresar a la izquierda */}
            </div>

            {/* Enlistado de órdenes */}
            <div className="flex flex-col items-center">
                {ordenes.map((orden) => (
                    <Orden
                        key={orden.numero}
                        numeroOrden={orden.numero}
                        status={orden.status}
                        onOrdenClick={handleOrdenClick}
                    />
                ))}
            </div>

            {/* Renderizar el modal si está abierto */}
            {modalOpen && selectedOrden !== null && (
                <ModalOrden onClose={() => setModalOpen(false)} />
            )}
        </>
    );
}
