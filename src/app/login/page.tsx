import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-row h-screen relative">
      <div className="w-1/2"></div>
      <div className="w-24"></div>
      <div className="flex-grow bg-amber-500"></div>
      <div className="absolute flex flex-row inset-0 items-center justify-center">
        <Image
          src="/logo-login.png"
          width={300}
          height={300}
          alt="Picture of the author"
        />
        <div className="ml-16 h-auto w-[28rem] bg-gray-200 rounded-3xl">
          <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8 p-10">
            <div className="mx-auto w-full">
              <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Iniciar sesión
              </h2>
            </div>
            <div className="mx-auto w-full">
              <form action="#" method="POST">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Correo electrónico"
                  className="mt-10 block w-full rounded-3xl p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Constraseña"
                  className="mt-4 block w-full rounded-3xl p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="mt-10 flex w-full justify-center rounded-3xl bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
