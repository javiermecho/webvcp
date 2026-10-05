import React, { useState, useEffect, useRef } from 'react';
import { ProductModel, ProductColor, Size } from '../../types';
import { AVAILABLE_COLORS, BASE_PRICE } from '../../data/products';
import {
  X,
  Upload,
  Trash2,
  Plus,
  Check,
  Image as ImageIcon,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { ArtworkGraphic } from '../ArtworkGraphic';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: ProductModel | null; // null means adding a new product
  onSave: (productData: Omit<ProductModel, 'id'> | ProductModel) => void;
}

const ALL_SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_CATEGORIES = [
  'Fe y Esperanza',
  'Promesas',
  'Minimalista',
  'Ilustrado',
  'Boutique',
  'Urbano / Streetwear',
  'Edición Especial',
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave,
}) => {
  const isEditing = Boolean(productToEdit);

  // Form states
  const [code, setCode] = useState(productToEdit?.code || '');
  const [title, setTitle] = useState(productToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(productToEdit?.subtitle || '');
  const [verse, setVerse] = useState(productToEdit?.verse || '');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [category, setCategory] = useState(productToEdit?.category || 'Fe y Esperanza');
  const [price, setPrice] = useState<number>(productToEdit?.price || BASE_PRICE);
  const [defaultPrintLocation, setDefaultPrintLocation] = useState<'pecho' | 'espalda'>(
    productToEdit?.defaultPrintLocation || 'pecho'
  );
  const [customImage, setCustomImage] = useState<string | undefined>(productToEdit?.customImage);
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>(
    productToEdit?.colors || [AVAILABLE_COLORS.white]
  );
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(
    productToEdit?.sizes || ALL_SIZES
  );

  // Custom Color Addition
  const [showAddCustomColor, setShowAddCustomColor] = useState(false);
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#64748B');

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when productToEdit changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setCode(productToEdit.code || `VCP-${String(productToEdit.id).padStart(2, '0')}`);
        setTitle(productToEdit.title || '');
        setSubtitle(productToEdit.subtitle || '');
        setVerse(productToEdit.verse || '');
        setDescription(productToEdit.description || '');
        setCategory(productToEdit.category || 'Fe y Esperanza');
        setPrice(productToEdit.price || BASE_PRICE);
        setDefaultPrintLocation(productToEdit.defaultPrintLocation || 'pecho');
        setCustomImage(productToEdit.customImage);
        setSelectedColors(
          productToEdit.colors && productToEdit.colors.length > 0
            ? productToEdit.colors
            : [AVAILABLE_COLORS.white]
        );
        setSelectedSizes(
          productToEdit.sizes && productToEdit.sizes.length > 0
            ? productToEdit.sizes
            : ALL_SIZES
        );
      } else {
        // Reset for new creation
        setCode('');
        setTitle('');
        setSubtitle('');
        setVerse('');
        setDescription('');
        setCategory('Fe y Esperanza');
        setPrice(BASE_PRICE);
        setDefaultPrintLocation('pecho');
        setCustomImage(undefined);
        setSelectedColors([AVAILABLE_COLORS.white]);
        setSelectedSizes(ALL_SIZES);
      }
      setErrorMsg(null);
      setShowAddCustomColor(false);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // File to Base64 handler
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen (PNG, JPG o SVG). Se recomienda PNG transparente.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('La imagen supera los 5MB recomendados para rendimiento.');
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Color selection toggles
  const handleToggleColor = (color: ProductColor) => {
    const exists = selectedColors.some((c) => c.id === color.id);
    if (exists) {
      if (selectedColors.length === 1) {
        setErrorMsg('El modelo debe tener al menos 1 color de remera habilitado.');
        return;
      }
      setSelectedColors(selectedColors.filter((c) => c.id !== color.id));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
    setErrorMsg(null);
  };

  // Size selection toggles
  const handleToggleSize = (size: Size) => {
    const exists = selectedSizes.includes(size);
    if (exists) {
      if (selectedSizes.length === 1) {
        setErrorMsg('El modelo debe tener al menos 1 talle disponible.');
        return;
      }
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Helper to determine if hex is dark
  const isColorDark = (hex: string): boolean => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  const handleAddCustomColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customColorName.trim()) return;

    const newColor: ProductColor = {
      id: `custom-${Date.now()}`,
      name: customColorName.trim(),
      hex: customColorHex,
      isDark: isColorDark(customColorHex),
    };

    setSelectedColors([...selectedColors, newColor]);
    setCustomColorName('');
    setShowAddCustomColor(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg('Por favor ingresa un título para el modelo.');
      return;
    }

    if (selectedColors.length === 0) {
      setErrorMsg('Debes seleccionar al menos 1 color permitido para confeccionar este modelo.');
      return;
    }

    const payload: any = {
      title: title.trim(),
      code: code.trim() || undefined,
      subtitle: subtitle.trim() || 'Diseño exclusivo VCP',
      verse: verse.trim() || 'VCP Design',
      description: description.trim() || 'Remera de confección nacional 100% algodón peinado 24/1.',
      category: category.trim(),
      price: Number(price) || BASE_PRICE,
      defaultPrintLocation,
      colors: selectedColors,
      sizes: selectedSizes,
      customImage: customImage || undefined,
      tags: [
        ...title.toLowerCase().split(' '),
        ...verse.toLowerCase().split(' '),
        category.toLowerCase(),
      ].filter(Boolean),
      printDesign: productToEdit?.printDesign || {
        type: customImage ? 'custom-image' : 'typography',
        primaryText: title.toUpperCase(),
        secondaryText: subtitle.toUpperCase(),
        biblicalQuote: verse.toUpperCase(),
        layoutStyle: 'center-chest',
      },
    };

    if (isEditing && productToEdit) {
      payload.id = productToEdit.id;
    }

    onSave(payload);
    onClose();
  };

  // Standard color choices available to toggle
  const standardColorsList = Object.values(AVAILABLE_COLORS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FCFBF8] border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-900 text-white">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">
                {isEditing ? `Editar Modelo #${productToEdit?.id}` : 'Crear Nuevo Modelo de Remera'}
              </h3>
              <p className="text-xs text-zinc-500">
                Define la estampa PNG, colores habilitados de tela y datos para WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. SECCIÓN: CARGA DE ARCHIVO PNG PARA LA ESTAMPA */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              1. Estampa de la Remera (Archivo PNG Transparente)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`sm:col-span-8 border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-amber-600 bg-amber-50/50'
                    : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/60'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">
                      Haz clic o arrastra tu PNG aquí
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Fondo transparente recomendado • PNG, WEBP o SVG (hasta 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview Box */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-100 border border-zinc-200 aspect-square sm:aspect-auto sm:h-36 relative overflow-hidden">
                {customImage ? (
                  <div className="relative w-full h-full flex items-center justify-center group">
                    <img
                      src={customImage}
                      alt="Vista previa"
                      className="max-h-28 max-w-full object-contain drop-shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomImage(undefined);
                      }}
                      className="absolute top-1 right-1 p-1.5 rounded-lg bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                      title="Eliminar imagen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : productToEdit ? (
                  <div className="text-center p-2">
                    <div className="scale-75 origin-center">
                      <ArtworkGraphic
                        model={productToEdit}
                        color={selectedColors[0] || AVAILABLE_COLORS.white}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-semibold block mt-1">
                      (Gráfico vectorial actual)
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-zinc-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-40" />
                    <span className="text-[11px] font-medium">Sin imagen cargada</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-zinc-200" />

          {/* 2. SECCIÓN: DATOS DEL MODELO */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              2. Datos del Modelo
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Código */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ej: VCP-26"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
              </div>

              {/* Título */}
              <div className="sm:col-span-9">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Título / Nombre del Diseño *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej: Gracia Inagotable"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 font-bold"
                />
              </div>

              {/* Versículo */}
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Cita Bíblica / Versículo
                </label>
                <input
                  type="text"
                  value={verse}
                  onChange={(e) => setVerse(e.target.value)}
                  placeholder="ej: Romanos 8:31"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
              </div>

              {/* Subtítulo */}
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Subtítulo / Concepto
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="ej: Si Dios es con nosotros, ¿quién contra nosotros?"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
              </div>

              {/* Categoría */}
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Categoría
                </label>
                <input
                  type="text"
                  list="category-options"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Elige o escribe una categoría"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
                <datalist id="category-options">
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              {/* Precio */}
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Precio Base (ARS $)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min={1000}
                  step={500}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 font-mono font-bold"
                />
              </div>

              {/* Ubicación Sugerida del Estampado */}
              <div className="sm:col-span-12">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1.5">
                  Ubicación Principal de la Estampa
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDefaultPrintLocation('pecho')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      defaultPrintLocation === 'pecho'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <span>👕 Estampa en el Pecho</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDefaultPrintLocation('espalda')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      defaultPrintLocation === 'espalda'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <span>🔄 Estampa en la Espalda</span>
                  </button>
                </div>
              </div>

              {/* Descripción */}
              <div className="sm:col-span-12">
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Descripción del Producto
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Breve reseña sobre el concepto del estampado y características de la prenda..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-zinc-200" />

          {/* 3. SECCIÓN CRÍTICA: SELECTOR DE COLORES PERMITIDOS PARA ESTE DISEÑO */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  3. Colores de Remera Habilitados (Regla Estricta)
                </label>
                <p className="text-[11px] text-zinc-500">
                  Tilda únicamente los colores en los que este diseño puede confeccionarse. El cliente en la tienda SOLO podrá elegir entre los colores marcados.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCustomColor(!showAddCustomColor)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Color personalizado</span>
              </button>
            </div>

            {/* Custom Color Input Form (if toggled) */}
            {showAddCustomColor && (
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Nombre (ej: Verde Oliva)"
                  value={customColorName}
                  onChange={(e) => setCustomColorName(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs flex-1"
                />
                <input
                  type="color"
                  value={customColorHex}
                  onChange={(e) => setCustomColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-amber-300"
                  title="Elegir color HEX"
                />
                <button
                  type="button"
                  onClick={handleAddCustomColor}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white font-bold hover:bg-zinc-800"
                >
                  Agregar
                </button>
              </div>
            )}

            {/* Checkbox Grid for Colors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {standardColorsList.map((color) => {
                const isSelected = selectedColors.some((c) => c.id === color.id);
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleToggleColor(color)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-2.5 h-2.5 ${color.isDark ? 'text-white' : 'text-zinc-900'}`}
                        />
                      )}
                    </span>
                    <span className="text-xs font-semibold truncate">{color.name}</span>
                  </button>
                );
              })}

              {/* Show any already added custom colors not in standard list */}
              {selectedColors
                .filter((c) => !standardColorsList.some((sc) => sc.id === c.id))
                .map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleToggleColor(color)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-zinc-900 bg-zinc-900 text-white shadow-xs"
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      <Check className="w-2.5 h-2.5 text-white" />
                    </span>
                    <span className="text-xs font-semibold truncate">{color.name}</span>
                  </button>
                ))}
            </div>

            <div className="text-[11px] text-zinc-500 font-medium">
              Colores seleccionados para este modelo: <strong className="text-zinc-900">{selectedColors.length}</strong>
            </div>
          </div>

          <div className="h-[1px] bg-zinc-200" />

          {/* 4. SECCIÓN: TALLES HABILITADOS */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              4. Talles Habilitados
            </label>
            <div className="flex gap-2">
              {ALL_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`h-9 w-12 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-200/60 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 shadow-md transition-all"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear y Publicar Modelo'}
          </button>
        </div>
      </div>
    </div>
  );
};
