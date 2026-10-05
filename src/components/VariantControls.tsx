import React from 'react';
import { ProductModel, ProductColor, Size, PrintLocation } from '../types';
import { Ruler, Check, Minus, Plus, Compass } from 'lucide-react';

interface VariantControlsProps {
  model: ProductModel;
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  selectedSize: Size;
  onSelectSize: (size: Size) => void;
  printLocation: PrintLocation;
  onSelectPrintLocation: (location: PrintLocation) => void;
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
  onOpenSizeGuide: () => void;
}

const AVAILABLE_SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const VariantControls: React.FC<VariantControlsProps> = ({
  model,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
  printLocation,
  onSelectPrintLocation,
  quantity,
  onChangeQuantity,
  onOpenSizeGuide,
}) => {
  return (
    <div className="space-y-6 bg-white p-5 sm:p-6 rounded-3xl border border-amber-950/10 shadow-lg">

      {/* 0. SELECTOR DE UBICACIÓN DEL ESTAMPADO (PECHO VS ESPALDA) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">
              Ubicación del Diseño:
            </span>
            <span className="text-sm font-extrabold text-zinc-900 capitalize">
              {printLocation === 'pecho' ? 'Pecho (Frente)' : 'Espalda (Dorso)'}
            </span>
          </div>
          <span className="text-[11px] font-medium text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
            Personalizable
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onSelectPrintLocation('pecho')}
            className={`py-3 px-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              printLocation === 'pecho'
                ? 'border-zinc-900 bg-zinc-900 text-white shadow-md ring-2 ring-zinc-900/20'
                : 'border-zinc-200 bg-zinc-50/70 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100'
            }`}
          >
            <span className="text-sm">👕</span>
            <span>Estampa en el Pecho</span>
            {printLocation === 'pecho' && <Check className="w-3.5 h-3.5 ml-auto text-white" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectPrintLocation('espalda')}
            className={`py-3 px-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              printLocation === 'espalda'
                ? 'border-zinc-900 bg-zinc-900 text-white shadow-md ring-2 ring-zinc-900/20'
                : 'border-zinc-200 bg-zinc-50/70 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100'
            }`}
          >
            <span className="text-sm">🔄</span>
            <span>Estampa en la Espalda</span>
            {printLocation === 'espalda' && <Check className="w-3.5 h-3.5 ml-auto text-white" />}
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-zinc-100" />

      {/* 1. SELECTOR DE COLOR (CRÍTICO: SOLO COLORES PERMITIDOS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">
              Color de Remera:
            </span>
            <span className="text-sm font-bold text-zinc-900">
              {selectedColor.name}
            </span>
          </div>
          <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
            {model.colors.length} {model.colors.length === 1 ? 'color disponible' : 'colores disponibles'}
          </span>
        </div>

        {/* Buttons for permitted colors only */}
        <div className="flex flex-wrap gap-3">
          {model.colors.map((color) => {
            const isSelected = selectedColor.id === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color)}
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all text-xs font-semibold ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-md ring-2 ring-zinc-900/20'
                    : 'border-zinc-200 bg-zinc-50/80 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                {/* Color Swatch Dot */}
                <span
                  className="w-5 h-5 rounded-full border border-black/15 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${color.isDark ? 'text-white' : 'text-zinc-900'}`}
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>

        {model.colors.length === 1 && (
          <p className="text-[11px] text-zinc-500 italic">
            * Este modelo exclusivo fue diseñado específicamente para confección en {model.colors[0].name}.
          </p>
        )}
      </div>

      <div className="h-[1px] bg-zinc-100" />

      {/* 2. SELECTOR DE TALLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">
              Talle Seleccionado:
            </span>
            <span className="text-sm font-bold text-zinc-900">
              {selectedSize}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-4 transition-colors"
          >
            <Ruler className="w-3.5 h-3.5" />
            Guía de medidas (cm)
          </button>
        </div>

        {/* Size chips */}
        <div className="flex flex-wrap gap-2">
          {(model.sizes && model.sizes.length > 0 ? model.sizes : AVAILABLE_SIZES).map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`h-11 flex-1 min-w-[50px] rounded-xl flex flex-col items-center justify-center font-bold transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-md ring-2 ring-zinc-900/20'
                    : 'bg-zinc-50 border border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100'
                }`}
              >
                <span className="text-sm">{size}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-zinc-100" />

      {/* 3. CANTIDAD Y PRECIO */}
      <div className="flex items-center justify-between">
        <div>
          <span className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-1">
            Cantidad:
          </span>
          <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-1">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onChangeQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-white hover:text-zinc-900 transition-all"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="block text-xs uppercase tracking-wider font-bold text-zinc-500 mb-1">
            Precio Total:
          </span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl font-extrabold text-zinc-900">
              ${(model.price * quantity).toLocaleString('es-AR')}
            </span>
            <span className="text-xs font-semibold text-zinc-500">ARS</span>
          </div>
          {quantity > 1 && (
            <p className="text-[11px] text-zinc-400 font-medium">
              ${model.price.toLocaleString('es-AR')} c/u
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
