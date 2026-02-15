const Login = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border rounded" placeholder="Ingresa tu correo" />
                    </div>  
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded" placeholder="Ingresa tu contraseña" />
                    </div>
                    <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 transition duration-200">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}   

export default Login;