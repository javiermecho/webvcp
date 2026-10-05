import React, { useState, useRef } from 'react';
import { useProducts } from '../../context/ProductContext';
import { ProductModel } from '../../types';
import { ProductEditModal } from './ProductEditModal';
import { ArtworkGraphic } from '../ArtworkGraphic';
import {
  Plus,
  Edit2,
  Copy,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  Shirt,
  Sparkles,
} from 'lucide-react';

interface AdminPanelProps {
  onBackToStore: (targetModel?: ProductModel) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToStore }) => {
  const {
    products,
    addProduct,
    updateProduct,
    duplicateProduct,
    deleteProduct,
    resetToDefaultCatalog,
    exportCatalogToJson,
    importCatalogFromJson,
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null);
  const [feedbackNotice, setFeedbackNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      (p.code && p.code.toLowerCase().includes(q)) ||
      p.verse.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      `#${p.id}`.includes(q)
    );
  });

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedbackNotice({ message, type });
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductModel) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleDuplicate = (id: number) => {
    const dup = duplicateProduct(id);
    if (dup) {
      showNotice(`Modelo #${id} duplicado con éxito como #${dup.id}.`);
    }
  };

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el modelo "${title}" (#${id})?`)) {
      const deleted = deleteProduct(id);
      if (deleted) {
        showNotice(`Modelo #${id} eliminado correctamente.`);
      }
    }
  };

  const handleResetCatalog = () => {
    if (
      window.confirm(
        '⚠️ ATENCIÓN: Esta acción reemplazará todos los modelos actuales y restablecerá el catálogo original de fábrica de 25 modelos. ¿Deseas continuar?'
      )
    ) {
      resetToDefaultCatalog();
      showNotice('Catálogo restablecido con los 25 modelos originales.');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importCatalogFromJson(content);
      if (res.success) {
        showNotice(`¡Catálogo restaurado exitosamente! Se cargaron ${res.count} modelos.`);
      } else {
        showNotice(res.error || 'Error al importar archivo', 'error');
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (importFileInputRef.current) {
      importFileInputRef.current.value = '';
    }
  };

  const handleSaveModal = (data: any) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, data);
      showNotice(`Modelo #${productToEdit.id} actualizado.`);
    } else {
      const created = addProduct(data);
      showNotice(`Modelo #${created.id} creado y publicado.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 flex flex-col">
      {/* Top Admin Navigation */}
      <header className="sticky top-0 z-30 bg-zinc-900 text-white border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBackToStore()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Tienda</span>
            </button>
            <div className="h-5 w-[1px] bg-zinc-700" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight">
                  Panel de Administración
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CMS Catálogo
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Gestor dinámico de remeras, colores permitidos y estampas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>Nuevo Modelo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 space-y-6">
        {/* Floating Notification */}
        {feedbackNotice && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-md animate-in slide-in-from-top-2 ${
              feedbackNotice.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            {feedbackNotice.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{feedbackNotice.message}</span>
          </div>
        )}

        {/* Toolbar: Search and Maintenance Tools */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, título o versículo..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
            />
          </div>

          {/* Backup & Reset Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Hidden file input for JSON import */}
            <input
              type="file"
              ref={importFileInputRef}
              onChange={handleFileImport}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={() => importFileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-all shadow-xs"
              title="Restaurar catálogo desde archivo JSON"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-500" />
              <span>Importar JSON</span>
            </button>

            <button
              onClick={exportCatalogToJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition-all shadow-xs"
              title="Descargar copia de seguridad en JSON"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span>Exportar JSON</span>
            </button>

            <button
              onClick={handleResetCatalog}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-800 text-xs font-semibold transition-all shadow-xs"
              title="Restablecer los 25 modelos de fábrica"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Restablecer Fábrica</span>
            </button>
          </div>
        </div>

        {/* Stats summary bar */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium px-1">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> modelos en el catálogo
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Persistencia activa en localStorage
          </span>
        </div>

        {/* Products Grid / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const firstColor = product.colors[0];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Code, ID, Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg bg-zinc-900 text-white">
                        {product.code || `VCP-${String(product.id).padStart(2, '0')}`}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        ID #{product.id}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
                      {product.category}
                    </span>
                  </div>

                  {/* Visual Preview Box */}
                  <div
                    className="w-full aspect-[4/2.6] rounded-2xl flex items-center justify-center p-3 mb-3 border border-zinc-100 relative overflow-hidden"
                    style={{ backgroundColor: firstColor?.hex || '#ffffff' }}
                  >
                    {product.customImage ? (
                      <img
                        src={product.customImage}
                        alt={product.title}
                        className="max-h-24 max-w-[85%] object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="scale-75 origin-center">
                        <ArtworkGraphic model={product} color={firstColor} />
                      </div>
                    )}

                    {/* Badge for custom image */}
                    {product.customImage && (
                      <span className="absolute bottom-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-900/80 text-white backdrop-blur-sm">
                        PNG Subido
                      </span>
                    )}
                  </div>

                  {/* Title & Verse */}
                  <h4 className="text-sm font-extrabold text-zinc-900 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-xs text-amber-800 font-medium mt-0.5 line-clamp-1">
                    "{product.verse}"
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    {product.subtitle}
                  </p>

                  {/* Permitted Colors Swatches (CRITICAL) */}
                  <div className="mt-3 pt-3 border-t border-zinc-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Colores Permitidos ({product.colors.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {product.colors.map((c) => (
                        <span
                          key={c.id}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200"
                          title={c.name}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="truncate max-w-[80px]">{c.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-medium">Precio</span>
                    <span className="text-sm font-black text-zinc-900">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onBackToStore(product)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                      title="Probar en el Mockup de la tienda"
                    >
                      <Shirt className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(product.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                      title="Duplicar modelo"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                      title="Editar modelo"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar modelo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Edit / Add Modal */}
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={productToEdit}
        onSave={handleSaveModal}
      />
    </div>
  );
};
