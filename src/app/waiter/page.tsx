'use client'
import { useState } from 'react';

/*Lista de mesas*/
function Lista({
    numeroMesa,
    nombreMesa,
    onMesaClick,
}: {
    numeroMesa: number;
    nombreMesa: string;
    onMesaClick: (numeroMesa: number) => void;
}) {
    return (
        <div
            className="h-auto w-auto bg-orange-200 m-3 border-2 rounded-lg shadow-md cursor-pointer p-4"
            onClick={() => onMesaClick(numeroMesa)}
        >
            <div className="text-lg font-bold text-center">{nombreMesa}: {numeroMesa}</div>
        </div>
    );
}

/*Modal al presionar una mesa*/
function ModalWaiter({
    numeroMesa,
    onClose,
}: {
    numeroMesa: number;
    onClose: () => void;
}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/2">
                {/*Boton cerrar*/}
                <div className="flex justify-end">
                    <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cerrar</button>
                </div>
                {/*Body modal*/}
                <div className="text-center">
                    <h2 className="text-xl font-bold">Número de mesa: {numeroMesa}</h2>
                    <p>Elige una opción:</p>
                </div>
                {/*Botones foot*/}
                <div className="flex justify-center mt-4">
                    {/*Añadir producto*/}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">
                        <a href="/kiosco">
                            Añadir producto
                        </a>
                    </button>
                    {/*Resumen*/}
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-4">
                        <a href="/waiter/summary">
                            Resumen de la mesa {numeroMesa}
                        </a>
                    </button>
                    {/*Cobrar*/}
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg ">
                        <a href="/waiter/pay">
                            Cobrar $$$
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Waiter() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMesa, setSelectedMesa] = useState<number | null>(null);

    const handleMesaClick = (numeroMesa: number) => {
        setSelectedMesa(numeroMesa);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMesa(null);
        setModalOpen(false);
    };

    let mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                            <h1 className="text-white font-bold italic text-4xl">Mesas</h1>
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
            <div className="h-16"></div>

            {/* Enlistado de mesas */}
            <div className="grid grid-cols-2">
                {mesas.map((mesa) => (
                    <Lista
                        key={mesa}
                        numeroMesa={mesa}
                        nombreMesa="Mesa"
                        onMesaClick={handleMesaClick}
                    />
                ))}
            </div>

            {/* Renderizar el modal si está abierto */}
            {modalOpen && selectedMesa !== null && (
                <ModalWaiter numeroMesa={selectedMesa} onClose={closeModal} />
            )}
        </>
    );
}