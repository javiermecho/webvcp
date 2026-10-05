import React, { useState, useEffect } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { WHATSAPP_PHONE } from './data/products';
import { ProductModel, ProductColor, Size, PrintLocation } from './types';
import { Header } from './components/Header';
import { MockupViewer } from './components/MockupViewer';
import { VariantControls } from './components/VariantControls';
import { WhatsAppOrder } from './components/WhatsAppOrder';
import { DesignSelector } from './components/DesignSelector';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { ChurchLanding } from './components/church/ChurchLanding';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  HelpCircle,
  Settings2,
  ChevronRight,
  BookmarkCheck,
  Lock,
  ArrowLeft,
} from 'lucide-react';

interface StoreContentProps {
  onBackToChurch?: () => void;
}

const StoreContent: React.FC<StoreContentProps> = ({ onBackToChurch }) => {
  const { products } = useProducts();

  // 1. Navigation state
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 2. Product customization state
  const [selectedModel, setSelectedModel] = useState<ProductModel>(() => products[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(() => products[0]?.colors[0]);
  const [selectedSize, setSelectedSize] = useState<Size>('M');
  const [printLocation, setPrintLocation] = useState<PrintLocation>('pecho');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(WHATSAPP_PHONE);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>(WHATSAPP_PHONE);

  // Sync when products change (e.g. edited, deleted or added)
  useEffect(() => {
    if (products.length === 0) return;

    // Check if currently selected model still exists in updated catalog
    const existingModel = products.find((p) => p.id === selectedModel?.id);
    if (existingModel) {
      setSelectedModel(existingModel);
      // Ensure color is still permitted
      const colorValid = existingModel.colors.some((c) => c.id === selectedColor?.id);
      if (!colorValid) {
        setSelectedColor(existingModel.colors[0]);
      }
      // Ensure size is still enabled
      if (existingModel.sizes && existingModel.sizes.length > 0 && !existingModel.sizes.includes(selectedSize)) {
        setSelectedSize(existingModel.sizes[0]);
      }
    } else {
      // Fallback to first available model
      const fallback = products[0];
      setSelectedModel(fallback);
      setSelectedColor(fallback.colors[0]);
      if (fallback.sizes && fallback.sizes.length > 0) {
        setSelectedSize(fallback.sizes[0]);
      }
    }
  }, [products]);

  // Strict Rule: When model changes, automatically reset selected color to the first permitted color of the new model
  const handleSelectModel = (model: ProductModel) => {
    setSelectedModel(model);
    setSelectedColor(model.colors[0]);
    if (model.sizes && model.sizes.length > 0 && !model.sizes.includes(selectedSize)) {
      setSelectedSize(model.sizes[0]);
    }
    // Smooth scroll on mobile to viewer
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Model navigation by index
  const currentIndex = products.findIndex((p) => p.id === selectedModel?.id);

  const handlePrevModel = () => {
    if (products.length === 0) return;
    const prevIdx = (currentIndex - 1 + products.length) % products.length;
    handleSelectModel(products[prevIdx]);
  };

  const handleNextModel = () => {
    if (products.length === 0) return;
    const nextIdx = (currentIndex + 1) % products.length;
    handleSelectModel(products[nextIdx]);
  };

  const handleOpenAdminTrigger = () => {
    const isAuthed = sessionStorage.getItem('vcp_admin_auth') === 'true';
    if (isAuthed) {
      setViewMode('admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setViewMode('admin');
  };

  const handleBackToStore = (targetModel?: ProductModel) => {
    setViewMode('store');
    if (targetModel) {
      handleSelectModel(targetModel);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setPhone(tempPhone.trim() || WHATSAPP_PHONE);
    setIsEditingPhone(false);
  };

  // Keyboard navigation with left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'store') return;
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        handlePrevModel();
      } else if (e.key === 'ArrowRight') {
        handleNextModel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, products, viewMode]);

  // If in Admin mode, render AdminPanel
  if (viewMode === 'admin') {
    return <AdminPanel onBackToStore={handleBackToStore} />;
  }

  // Safety fallback if catalog is loading
  if (!selectedModel || !selectedColor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center p-8">
          <Sparkles className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-2" />
          <p className="text-sm font-bold text-zinc-700">Cargando catálogo VCP Design...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-zinc-900 pb-28 lg:pb-12">
      {/* 1. Header with branding, admin trigger, and back to church button */}
      <Header
        phone={phone}
        onOpenAdmin={handleOpenAdminTrigger}
        onBackToChurch={onBackToChurch}
      />

      {/* 2. Main Interactive Studio Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        
        {/* Breadcrumb / Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-amber-950/10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <span>Colección VCP 2026</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-600">{selectedModel.category}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-zinc-900 font-bold">
                {selectedModel.code || `Modelo #${selectedModel.id}`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-1">
              {selectedModel.title}
            </h1>
            <p className="text-sm font-medium text-amber-900/80 italic mt-0.5">
              "{selectedModel.verse}" — {selectedModel.subtitle}
            </p>
          </div>

          {/* Quick config phone toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsEditingPhone(!isEditingPhone)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 text-xs font-semibold transition-all shadow-xs"
              title="Configurar número de WhatsApp para reservas"
            >
              <Settings2 className="w-3.5 h-3.5 text-zinc-500" />
              <span>WhatsApp: +{phone}</span>
            </button>
          </div>
        </div>

        {/* Modal / Form for editing phone */}
        {isEditingPhone && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="text-xs">
              <span className="font-bold text-amber-950 block">Configurar Teléfono de Destino</span>
              <span className="text-amber-800">Ingresa el número con código de país (sin + ni espacios, ej: 5491100000000).</span>
            </div>
            <form onSubmit={handleSavePhone} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                placeholder="5491100000000"
                className="px-3 py-1.5 text-xs rounded-xl bg-white border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setIsEditingPhone(false)}
                className="px-2 py-1.5 text-xs text-zinc-600 hover:text-zinc-900"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}

        {/* 3. Core Workspace Grid: Left (Viewer) | Right (Variants & WhatsApp) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT COLUMN: T-Shirt Mockup Viewer (Sticky on desktop) */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-24">
            <MockupViewer
              model={selectedModel}
              color={selectedColor}
              size={selectedSize}
              printLocation={printLocation}
              onSelectPrintLocation={setPrintLocation}
              onPrevModel={handlePrevModel}
              onNextModel={handleNextModel}
              currentIndex={currentIndex >= 0 ? currentIndex : 0}
              totalModels={products.length}
            />

            {/* Model narrative box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/70 border border-amber-950/5 shadow-xs text-xs text-zinc-600 leading-relaxed">
              <span className="font-bold text-zinc-900 block mb-1">
                Sobre este diseño:
              </span>
              <p>{selectedModel.description}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Controls, Customization & Direct WhatsApp Booking */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            
            {/* Variant Controls (Print Location, Strict Colors, Sizes, Quantity) */}
            <VariantControls
              model={selectedModel}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              printLocation={printLocation}
              onSelectPrintLocation={setPrintLocation}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />

            {/* Direct WhatsApp Order Action */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-950/10 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800">
                  Reserva Instantánea
                </h3>
              </div>
              <WhatsAppOrder
                model={selectedModel}
                color={selectedColor}
                size={selectedSize}
                quantity={quantity}
                printLocation={printLocation}
                phone={phone}
              />
            </div>

            {/* Value Propositions / Assurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/60 border border-zinc-200/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-800">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Algodón 24/1</h4>
                  <p className="text-[11px] text-zinc-500">Tacto suave peinado</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-zinc-200/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Serigrafía / DTF</h4>
                  <p className="text-[11px] text-zinc-500">Cero cuarteaduras</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-zinc-200/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-800">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Envíos Rápidos</h4>
                  <p className="text-[11px] text-zinc-500">A todo el territorio</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Complete Dynamic Catalog of Models */}
        <section className="pt-8 border-t border-amber-950/10">
          <DesignSelector
            products={products}
            selectedModel={selectedModel}
            onSelectModel={handleSelectModel}
          />
        </section>

        {/* 5. Informative FAQs & Care Guide */}
        <section className="mt-16 pt-12 border-t border-amber-950/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-zinc-900 mb-1">
              ¿Cómo es el proceso de reserva?
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Al tocar el botón de WhatsApp se abrirá tu chat con todos los datos precargados (modelo, color, talle y precio). Coordinamos el medio de pago y despacho de manera personalizada.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-3">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-zinc-900 mb-1">
              Cuidado y lavado de tu remera
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Lavar con agua fría del revés. No usar blanqueadores abrasivos ni planchar directamente sobre la estampa para asegurar que los colores permanezcan intactos durante años.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-zinc-900 mb-1">
              Medios de Pago y Envíos
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Aceptamos Mercado Pago, transferencias bancarias y efectivo. Realizamos envíos por correo a sucursal o domicilio en todo el país con seguimiento en tiempo real.
            </p>
          </div>
        </section>

      </main>

      {/* 6. Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              Total ({quantity} {quantity === 1 ? 'prenda' : 'prendas'})
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-zinc-900">
                ${(selectedModel.price * quantity).toLocaleString('es-AR')}
              </span>
              <span className="text-[10px] font-semibold text-zinc-500">ARS</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[140px]">
              Talle {selectedSize} • {selectedColor.name} • {printLocation === 'pecho' ? 'Pecho' : 'Espalda'}
            </span>
          </div>

          <a
            href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `¡Hola VCP Design! 👋 Quiero reservar mi remera:\n👕 Modelo: #${selectedModel.id} - ${selectedModel.title}\n📍 Ubicación de Estampa: ${printLocation === 'pecho' ? 'Pecho (Frente)' : 'Espalda (Dorso)'}\n🎨 Color: ${selectedColor.name}\n📏 Talle: ${selectedSize}${quantity > 1 ? `\n📦 Cantidad: ${quantity}` : ''}\n💰 Precio: $${(selectedModel.price * quantity).toLocaleString('es-AR')} ARS\n¿Tienen disponibilidad para coordinar?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 7. Footer with Admin Access link */}
      <footer className="mt-auto border-t border-zinc-200 bg-white text-zinc-500 py-8 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="font-semibold text-zinc-800">
            VCP Design © 2026 • Remeras Cristianas Contemporáneas
          </p>
          <p className="text-[11px] text-zinc-400">
            Confección nacional con algodón 100% peinado de primera calidad. Venta y reservas exclusivas.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {onBackToChurch && (
              <button
                onClick={onBackToChurch}
                className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 text-[11px] font-bold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la Iglesia Vidas con Propósito</span>
              </button>
            )}
            <span className="text-zinc-300">•</span>
            <button
              onClick={handleOpenAdminTrigger}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-[11px] font-medium transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Administrador (CMS Catálogo)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 8. Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* 9. Admin Auth Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'church' | 'store'>('church');

  if (currentView === 'church') {
    return (
      <ChurchLanding
        onGoToStore={() => {
          setCurrentView('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <ProductProvider>
      <StoreContent
        onBackToChurch={() => {
          setCurrentView('church');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </ProductProvider>
  );
};

export default App;
