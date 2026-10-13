import React from 'react';
import { FiInstagram, FiFacebook, FiMapPin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { LogoCUC } from './LogoCUC';

export const Footer = ({ setView }) => {
  const year = new Date().getFullYear();

  const redes = [
    { name: 'WhatsApp', icon: FaWhatsapp, url: 'https://wa.me/5491112345678' },
    { name: 'Instagram', icon: FiInstagram, url: '#' },
    { name: 'Facebook', icon: FiFacebook, url: '#' },
  ];

  const links = [
    { name: 'Catálogo de Modelos', action: () => setView('catalog') },
    { name: 'Ingreso Socios / Taller', action: () => setView('login') },
  ];

  const direccion = "Av. Eva Perón 2552, B1716 Gral. San Martín, Provincia de Buenos Aires";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Avenida Eva Perón 2552, General San Martín, Buenos Aires")}`;

  return (
    <footer className="bg-stone-950 text-stone-300 mt-20 border-t-4 border-amber-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

    {/* Columna 1: Brand & Logo Oficial */}
    <div className="space-y-4 md:col-span-1">
    <div className="cursor-pointer" onClick={() => setView('catalog')}>
    <LogoCUC className="h-14" variant="white" />
    </div>
    <p className="text-sm text-stone-400 leading-relaxed">
    Cooperativa de Trabajo Unidos por el Calzado Ltda. Calidad nacional, producción artesanal y precio justo.
    </p>
    </div>

    {/* Columna 2: Navegación */}
    <div>
    <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-500">
    Navegación
    </h4>
    <ul className="space-y-3 text-sm">
    {links.map(link => (
      <li key={link.name}>
      <button
      onClick={link.action}
      className="text-stone-300 hover:text-white transition duration-150 hover:underline text-left"
      >
      {link.name}
      </button>
      </li>
    ))}
    </ul>
    </div>

    {/* Columna 3: Ubicación y Contacto */}
    <div>
    <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-500">
    Contacto y Taller
    </h4>
    <ul className="space-y-3.5 text-sm">
    <li className="flex items-start gap-2.5">
    <FiMapPin className="text-lg text-amber-500 mt-1 shrink-0" />
    <a
    href={mapsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-stone-300 hover:text-amber-400 transition leading-snug"
    >
    {direccion}
    </a>
    </li>
    <li className="flex items-center gap-2.5">
    <FiMail className="text-lg text-amber-500 shrink-0" />
    <a
    href="mailto:contacto@unidos.coop"
    className="text-stone-300 hover:text-amber-400 transition"
    >
    contacto@unidos.coop
    </a>
    </li>
    </ul>
    </div>

    {/* Columna 4: Redes Sociales */}
    <div>
    <h4 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-500">
    Canales Oficiales
    </h4>
    <p className="text-xs text-stone-400 mb-4">
    Atención directa y novedades de producción:
    </p>
    <div className="flex gap-3">
    {redes.map(red => (
      <a
      key={red.name}
      href={red.url}
      target="_blank"
      rel="noopener noreferrer"
      title={red.name}
      className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-xl text-stone-300 hover:bg-amber-600 hover:text-stone-950 hover:border-amber-600 transition-all duration-200 shadow-sm"
      >
      <red.icon />
      </a>
    ))}
    </div>
    </div>

    </div>

    {/* Barra inferior */}
    <div className="border-t border-stone-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-2">
    <p>&copy; {year} Cooperativa Unidos por el Calzado (CUC) Ltda. Todos los derechos reservados.</p>
    <p className="text-stone-400">Industria y Trabajo Argentino 🇦🇷</p>
    </div>
    </div>
    </footer>
  );
};
