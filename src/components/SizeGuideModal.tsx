import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, AlertCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'unisex' | 'dama'>('unisex');

  if (!isOpen) return null;

  const unisexSizes = [
    { size: 'S', width: '48 cm', length: '68 cm', chest: '96 cm' },
    { size: 'M', width: '50 cm', length: '70 cm', chest: '100 cm' },
    { size: 'L', width: '53 cm', length: '72 cm', chest: '106 cm' },
    { size: 'XL', width: '56 cm', length: '74 cm', chest: '112 cm' },
    { size: 'XXL', width: '59 cm', length: '76 cm', chest: '118 cm' },
  ];

  const damaSizes = [
    { size: 'S', width: '44 cm', length: '62 cm', chest: '88 cm' },
    { size: 'M', width: '46 cm', length: '64 cm', chest: '92 cm' },
    { size: 'L', width: '48 cm', length: '66 cm', chest: '96 cm' },
    { size: 'XL', width: '51 cm', length: '68 cm', chest: '102 cm' },
    { size: 'XXL', width: '54 cm', length: '70 cm', chest: '108 cm' },
  ];

  const currentSizes = tab === 'unisex' ? unisexSizes : damaSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FCFBF8] border border-amber-950/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200/80 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-900">
              <Ruler className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                Tabla y Guía de Talles
              </h3>
              <p className="text-xs text-zinc-500">
                Medidas exactas en centímetros tomadas en plano
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tab Selector */}
          <div className="flex p-1 bg-zinc-200/60 rounded-xl">
            <button
              onClick={() => setTab('unisex')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'unisex'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Corte Unisex Regular (Estándar)
            </button>
            <button
              onClick={() => setTab('dama')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'dama'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Corte Dama Entallado
            </button>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F2EB] text-zinc-700 font-bold uppercase tracking-wider text-[11px] border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-4">Talle</th>
                  <th className="py-3 px-4">Ancho (Sisa a Sisa)</th>
                  <th className="py-3 px-4">Largo Total</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Contorno Aprox.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                {currentSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-zinc-950 flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-xs">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-3 px-4">{row.width}</td>
                    <td className="py-3 px-4">{row.length}</td>
                    <td className="py-3 px-4 text-zinc-500 hidden sm:table-cell">{row.chest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure guide */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/60 p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>¿Cómo medir para no errarle a tu talle?</span>
            </div>
            <ul className="text-xs text-amber-950/80 space-y-2 list-none pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>1. Extiende una remera que te quede cómoda</strong> sobre una mesa o cama plana.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>2. Mide el ancho (A):</strong> de costura a costura de axila a axila (a la altura del pecho).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>3. Mide el largo (B):</strong> desde el punto más alto del hombro junto al cuello hasta el borde inferior.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                <span>
                  <em>Tip:</em> Si estás entre dos talles, te recomendamos elegir el más grande para un calce más relajado.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Entendido, volver a personalizar
          </button>
        </div>
      </div>
    </div>
  );
};
