import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- NAV BAR --- */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <div className="flex items-center gap-8">
          {/* Logo - Simulado con un icono */}
          <div className="text-indigo-600">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition">Women</a>
            <a href="#" className="hover:text-black transition">Men</a>
            <a href="#" className="hover:text-black transition">Company</a>
            <a href="#" className="hover:text-black transition">Stores</a>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button className="text-gray-600">Sign in</button>
          <button className="text-gray-600">Create account</button>
          <div className="flex items-center gap-2 border-l pl-6 border-gray-200">
             <span className="text-lg">🇨🇦</span>
             <span className="text-gray-600">CAD</span>
          </div>
          <button className="p-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-gray-400">0</span>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Lado Izquierdo: Texto */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Summer styles are <br /> finally here
          </h1>
          <p className="text-lg text-gray-500 max-w-md leading-relaxed">
            This year, our new summer collection will shelter you from the harsh elements 
            of a world that doesn't care if you live or die.
          </p>
          <button className="bg-[#5850EC] hover:bg-indigo-700 text-white px-8 py-4 rounded-md font-medium transition-all shadow-lg shadow-indigo-100">
            Shop Collection
          </button>
        </div>

        {/* Lado Derecho: Grid de Imágenes */}
        <div className="lg:w-1/2 grid grid-cols-3 gap-4 h-[600px]">
          {/* Columna 1 */}
          <div className="space-y-4 pt-12">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" alt="Summer 1" className="rounded-2xl object-cover h-64 w-full shadow-sm" />
            <img src="https://images.unsplash.com/photo-1529139513477-3efb36707c6b?auto=format&fit=crop&q=80&w=400" alt="Summer 2" className="rounded-2xl object-cover h-80 w-full shadow-sm" />
          </div>
          {/* Columna 2 */}
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400" alt="Summer 3" className="rounded-2xl object-cover h-56 w-full shadow-sm" />
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400" alt="Summer 4" className="rounded-2xl object-cover h-64 w-full shadow-sm" />
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400" alt="Summer 5" className="rounded-2xl object-cover h-52 w-full shadow-sm" />
          </div>
          {/* Columna 3 */}
          <div className="space-y-4 pt-20">
            <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=400" alt="Summer 6" className="rounded-2xl object-cover h-72 w-full shadow-sm" />
            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400" alt="Summer 7" className="rounded-2xl object-cover h-64 w-full shadow-sm" />
          </div>
        </div>

      </main>
    </div>
  );
};

export default LandingPage;
