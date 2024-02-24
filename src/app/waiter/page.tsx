function Lista({
    numeroMesa,
    nombreMesa,
}:{
    numeroMesa: number;
    nombreMesa: string;
}){
    return (
            <div className="h-auto w-auto bg-orange-200 m-3 border-2 drop-shadow-md rounded-lg">
                <div className="size-8 m-8 text-center w-auto text-xl">
                    <b>{nombreMesa}:</b> {numeroMesa}
                </div>
            </div>
        );
}

function ModalWaiter({

}:{

}){
    return(
            <div>
            </div>
    );
}

export default function Waiter() {
    let mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <>
            {/*Navbar*/}
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
            {/*Espacio en blanco*/}
            <div className="h-16"></div>

            {/*Enlistado de mesas*/}
            <div className="grid grid-cols-2">
                {mesas.map((mesa) => (
                    <Lista key={mesa} numeroMesa={mesa} nombreMesa="Mesa" />
                ))}
            </div>
        </>
    );
}