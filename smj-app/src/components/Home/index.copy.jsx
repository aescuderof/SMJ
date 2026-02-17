import React from 'react';
// Si usas Lucide React para los iconos, si no puedes usar SVGs simples
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react';

const Footer = () => {
  const sections = [
    {
      title: 'Solutions',
      links: ['Marketing', 'Analytics', 'Automation', 'Commerce', 'Insights'],
    },
    {
      title: 'Support',
      links: ['Submit ticket', 'Documentation', 'Guides'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Jobs', 'Press'],
    },
    {
      title: 'Legal',
      links: ['Terms of service', 'Privacy policy', 'License'],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Sección Superior: Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo y Eslogan (Toma 2 columnas en móvil, 1 en desktop amplio) */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* Reemplaza con tu logo SVG real */}
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">~</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            {/* Redes Sociales */}
            <div className="flex gap-5 text-gray-500 dark:text-gray-400 mt-2">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Github className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
            </div>
          </div>

          {/* Enlaces Dinámicos */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 dark:text-gray-400 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separador y Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
