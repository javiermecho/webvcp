import React, { useState } from 'react';
import { ProductModel, ProductColor, Size, PrintLocation } from '../types';
import { MessageCircle, Copy, Check, Sparkles } from 'lucide-react';

interface WhatsAppOrderProps {
  model: ProductModel;
  color: ProductColor;
  size: Size;
  quantity: number;
  printLocation: PrintLocation;
  phone?: string;
}

export const WhatsAppOrder: React.FC<WhatsAppOrderProps> = ({
  model,
  color,
  size,
  quantity,
  printLocation,
  phone = '5491100000000',
}) => {
  const [copied, setCopied] = useState(false);

  const totalPrice = model.price * quantity;
  const formattedPrice = `$${totalPrice.toLocaleString('es-AR')} ARS`;

  // Formatted with model, location, color, size, price
  const messageBody = `¡Hola VCP Design! 👋 Quiero reservar mi remera:
👕 Modelo: #${model.id} - ${model.title}
📍 Ubicación de Estampa: ${printLocation === 'pecho' ? 'Pecho (Frente)' : 'Espalda (Dorso)'}
🎨 Color: ${color.name}
📏 Talle: ${size}${quantity > 1 ? `\n📦 Cantidad: ${quantity} unidades` : ''}
💰 Precio: ${formattedPrice}
¿Tienen disponibilidad para coordinar?`;

  // Clean phone number (digits only)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageBody)}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="space-y-3">
      {/* Primary WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base shadow-xl shadow-emerald-700/20 hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
        </span>
        <span className="tracking-wide">Reservar por WhatsApp</span>
        <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Secondary Quick Action: Copy message preview */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-100/80 rounded-xl text-xs text-zinc-600 border border-zinc-200/80">
        <span className="truncate pr-2 font-medium">
          Envío de pedido directo al chat oficial
        </span>
        <button
          type="button"
          onClick={handleCopyMessage}
          className="flex items-center gap-1.5 font-semibold text-zinc-700 hover:text-zinc-950 px-2 py-1 rounded-md hover:bg-white transition-all flex-shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar texto</span>
            </>
          )}
        </button>
      </div>

      {/* Trust message */}
      <p className="text-[11px] text-center text-zinc-500 font-medium">
        ⚡ Respuesta inmediata por WhatsApp • Envíos a todo el país • Métodos de pago seguros (Transferencia / Mercado Pago)
      </p>
    </div>
  );
};
