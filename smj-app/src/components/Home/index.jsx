import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
            <main className="container mx-auto px-4 py-20 text-center">
                <section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">Accesorios en piedras naturales & mostacillas miyuki</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
               Expresa la alegría y color todos los días con nuestras piezas únicas.
</p>
            
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Nueva colección
            </a>

            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Tienda
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a> 
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
        </div>                
    </div>
</section>

<section>
<div class="bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
  <div class="max-w-7xl mx-auto">
    
    <div class="flex justify-between items-end mb-8">
      <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Trending products
      </h2>
      <a href="#" class="hidden sm:block text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
        Shop the collection <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>

    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      
      <div class="group relative">
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:opacity-75 transition-opacity">
          <img src="URL_DE_TU_IMAGEN_WALLET" alt="Leather Long Wallet" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 flex flex-col">
          <h3 class="text-sm text-slate-700 dark:text-slate-300">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
              Leather Long Wallet
            </a>
          </h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Natural</p>
          <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">$75</p>
        </div>
      </div>

      <div class="group relative">
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:opacity-75 transition-opacity">
          <img src="URL_DE_TU_IMAGEN_PENS" alt="Machined Pencil and Pen Set" class="h-full w-full object-cover object-center" />
        </div>
        <div class="mt-4 flex flex-col">
          <h3 class="text-sm text-slate-700 dark:text-slate-300">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
              Machined Pencil and Pen Set
            </a>
          </h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Black</p>
          <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">$70</p>
        </div>
      </div>

      <div class="group relative">
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:opacity-75 transition-opacity">
          <img src="URL_DE_TU_IMAGEN_SKETCHBOOKS" alt="Mini-Sketchbooks" class="h-full w-full object-cover object-center" />
        </div>
        <div class="mt-4 flex flex-col">
          <h3 class="text-sm text-slate-700 dark:text-slate-300">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
              Mini-Sketchbooks
            </a>
          </h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Light Brown</p>
          <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">$27</p>
        </div>
      </div>

      <div class="group relative">
        <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:opacity-75 transition-opacity">
          <img src="URL_DE_TU_IMAGEN_ORGANIZER" alt="Organizer Set" class="h-full w-full object-cover object-center" />
        </div>
        <div class="mt-4 flex flex-col">
          <h3 class="text-sm text-slate-700 dark:text-slate-300">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
              Organizer Set
            </a>
          </h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Walnut</p>
          <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">$149</p>
        </div>
      </div>

    </div>

    <div class="mt-8 sm:hidden">
      <a href="#" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
        Shop the collection <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </div>
</div>


</section>
            </main>
           
        </>
	)
}

export default Home;
