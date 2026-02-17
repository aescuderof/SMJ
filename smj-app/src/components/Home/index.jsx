import { Link } from 'react-router-dom';

const products = [
  {
  id: 1,
  name: 'Pulsera Aura',
  variant: 'Piedra natural',
  price: 14990,
  image:
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
  },
  {
  id: 2,
  name: 'Collar Brisa',
  variant: 'Mostacillas Miyuki',
  price: 18990,
  image:
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  },
  {
  id: 3,
  name: 'Aros Sol',
  variant: 'Edición limitada',
  price: 11990,
  image:
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
  },
  {
  id: 4,
  name: 'Set Armonía',
  variant: 'Set combinado',
  price: 24990,
  image:
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  },
];

const Home = () => {
	return (
		<>
            <main className="container mx-auto px-4 py-20 text-center">
        <section className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">Accesorios en piedras naturales & mostacillas miyuki</h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
               Expresa la alegría y color todos los días con nuestras piezas únicas.
</p>
            
      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Nueva colección
            </a>

      <Link to="/products" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Tienda
        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </Link> 
        </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
        </div>                
    </div>
</section>

 <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Nuevos ingresos
          </h2>

          <Link
            to="/products"
            className="text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            Ir a la tienda →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image container */}
              <div className="bg-gray-200 rounded-xl overflow-hidden aspect-square mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Info */}
              <h3 className="text-base font-medium text-gray-900">
                {product.name}
              </h3>

              <p className="text-gray-500">{product.variant}</p>

              <p className="mt-2 text-gray-900 font-semibold">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
            </main>
           
        </>
	)
}

export default Home;
