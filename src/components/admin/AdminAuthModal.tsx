import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password "admin123"
    if (password === 'admin123' || password === 'admin') {
      setError(false);
      setPassword('');
      sessionStorage.setItem('vcp_admin_auth', 'true');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-zinc-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-amber-700" />
        </div>

        <h3 className="text-center font-extrabold text-lg text-zinc-900 mb-1">
          Acceso Administrador
        </h3>
        <p className="text-center text-xs text-zinc-500 mb-5">
          Ingresa la contraseña para gestionar el catálogo y las estampas
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Contraseña (ej: admin123)"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-rose-600 text-[11px] font-semibold mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Contraseña incorrecta. Prueba con "admin123"</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all"
          >
            Ingresar al Panel
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-zinc-100 text-center">
          <span className="text-[10px] text-zinc-400">
            Contraseña predeterminada: <strong className="text-zinc-600">admin123</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
