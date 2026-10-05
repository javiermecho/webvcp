import React, { useState, useMemo } from 'react';
import { ProductModel } from '../types';
import { Search, X, Sparkles, Filter } from 'lucide-react';
import { ArtworkGraphic } from './ArtworkGraphic';

interface DesignSelectorProps {
  products: ProductModel[];
  selectedModel: ProductModel;
  onSelectModel: (model: ProductModel) => void;
}

const CATEGORIES = ['Todos', 'Fe y Esperanza', 'Promesas', 'Minimalista', 'Ilustrado', 'Boutique'] as const;

export const DesignSelector: React.FC<DesignSelectorProps> = ({
  products,
  selectedModel,
  onSelectModel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.verse.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        `#${item.id}`.includes(q) ||
        `${item.id}` === q;

      return matchesCategory && matchesText;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="space-y-4">
      {/* Header and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
              Catálogo de Diseños
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-white">
              {filteredProducts.length} de {products.length}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Selecciona un diseño para previsualizarlo en el maniquí
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por versículo, palabra o #..."
            className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-zinc-400 ml-1 mr-0.5 flex-shrink-0" />
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of 25 Models */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center bg-white rounded-3xl border border-zinc-200/80 p-6">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-bold text-zinc-800">No encontramos modelos con ese criterio</p>
          <p className="text-xs text-zinc-500 mt-1">
            Intenta buscar con otra palabra clave o versículo bíblico.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            Ver todos los modelos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredProducts.map((item) => {
            const isSelected = selectedModel.id === item.id;
            const primaryColor = item.colors[0];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectModel(item)}
                className={`group relative text-left rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'bg-white border-2 border-zinc-900 shadow-xl ring-2 ring-zinc-900/10 -translate-y-1'
                    : 'bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Header Tag / Model ID */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200'
                    }`}
                  >
                    {item.code || `#${item.id}`}
                  </span>

                  {/* Available Colors Dot preview */}
                  <div className="flex items-center gap-1">
                    {item.colors.map((c) => (
                      <span
                        key={c.id}
                        className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Mini Preview Box */}
                <div
                  className="w-full aspect-[4/3] rounded-xl flex items-center justify-center p-2 mb-2 relative overflow-hidden transition-colors border border-black/5"
                  style={{
                    backgroundColor: primaryColor.hex,
                  }}
                >
                  <ArtworkGraphic
                    model={item}
                    color={primaryColor}
                    className="transform scale-75 origin-center pointer-events-none"
                  />
                </div>

                {/* Title and Verse info */}
                <div className="mt-1">
                  <h4 className="text-xs font-bold text-zinc-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium line-clamp-1">
                    {item.subtitle}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-amber-800">
                      {item.verse}
                    </span>
                    <span className="font-bold text-zinc-900">
                      ${item.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
