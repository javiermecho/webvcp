import React from 'react';
import { Sparkles, Phone, Truck, ShieldCheck, Heart, ArrowLeft, Church } from 'lucide-react';

interface HeaderProps {
  phone: string;
  onEditPhone?: () => void;
  onOpenAdmin: () => void;
  onBackToChurch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ phone, onOpenAdmin, onBackToChurch }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-950/5">
      {/* Top Banner */}
      <div className="bg-zinc-900 text-zinc-300 py-1.5 px-4 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToChurch && (
              <button
                onClick={onBackToChurch}
                className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold transition-colors mr-3 bg-white/10 px-2.5 py-0.5 rounded-lg border border-amber-300/30"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la web de la Iglesia</span>
              </button>
            )}
            <span className="flex items-center gap-1 text-amber-300">
              <Sparkles className="w-3 h-3" />
              <span>Colección Exclusiva 2026</span>
            </span>
            <span className="hidden sm:inline text-zinc-500">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Truck className="w-3 h-3 text-zinc-400" />
              <span>Envíos a todo el país</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Algodón 24/1 Premium</span>
            </span>
            <span className="text-zinc-500">•</span>
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 font-semibold text-emerald-300"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackToChurch && (
            <button
              onClick={onBackToChurch}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all shadow-xs mr-2 hover:border-amber-700"
              title="Volver a la web de la Iglesia"
            >
              <ArrowLeft className="w-4 h-4 text-amber-800" />
              <span>← Volver a la Iglesia</span>
            </button>
          )}

          {/* Logo Mark */}
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md font-serif font-black text-xl tracking-tighter">
            VCP
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-900 leading-none">
                VCP DESIGN
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                Boutique
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              Remeras Cristianas Contemporáneas • Personalizador Online
            </p>
          </div>
        </div>

        {/* Right Badges & Admin access */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/80 shadow-xs text-xs font-semibold text-zinc-700">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Prendas con Mensaje Eterno</span>
          </div>

          {/* Admin Panel Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/90 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 text-xs font-bold transition-all shadow-xs"
            title="Abrir Panel de Administración del Catálogo"
          >
            <span className="text-sm">⚙️</span>
            <span className="hidden sm:inline">Panel Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
