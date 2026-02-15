import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a SMJ</h1>
                <p className="text-lg text-gray-700 mb-6">Explora nuestra variedad de collares hechos a mano, perfectos para cualquier ocasión.</p>
               
            <section className="mt-16 mx-auto max-w-dv">
                <article>
                    <Link to="/products" className="block bg-gray-200 p-6 rounded shadow hover:bg-gray-300 transition duration-200">
                      
                        <p className="text-gray-700">Nuestros collares</p>
                    </Link>
                </article>
                Ver el menu
            </section>
            </main>
           
        </>
	)
}

export default Home;
