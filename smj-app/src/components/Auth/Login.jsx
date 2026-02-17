const Login = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md rounded-xl bg-dust-grey-50 p-8 shadow-md ring-1 ring-dust-grey-200">
                <h2 className="mb-6 text-center text-2xl font-bold text-dust-grey-900">Iniciar Sesión</h2>
                <form>
                    <div className="mb-4">
                        <label className="mb-2 block text-dust-grey-700" htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" className="w-full rounded border border-dust-grey-300 px-3 py-2 text-dust-grey-900 placeholder:text-dust-grey-400 focus:outline-none focus:ring-2 focus:ring-dust-grey-300" placeholder="Ingresa tu correo" />
                    </div>  
                    <div className="mb-6">
                        <label className="mb-2 block text-dust-grey-700" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="w-full rounded border border-dust-grey-300 px-3 py-2 text-dust-grey-900 placeholder:text-dust-grey-400 focus:outline-none focus:ring-2 focus:ring-dust-grey-300" placeholder="Ingresa tu contraseña" />
                    </div>
                    <button type="submit" className="w-full rounded bg-dust-grey-700 py-2 text-dust-grey-50 transition duration-200 hover:bg-dust-grey-800">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}   

export default Login;