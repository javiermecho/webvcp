import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductModel, ProductColor } from '../types';
import { PRODUCTS, AVAILABLE_COLORS } from '../data/products';

const STORAGE_KEY = 'vcp_catalog_products';

interface ProductContextType {
  products: ProductModel[];
  addProduct: (productData: Omit<ProductModel, 'id'>) => ProductModel;
  updateProduct: (id: number, updatedData: Partial<ProductModel>) => void;
  duplicateProduct: (id: number) => ProductModel | null;
  deleteProduct: (id: number) => boolean;
  resetToDefaultCatalog: () => void;
  exportCatalogToJson: () => void;
  importCatalogFromJson: (jsonString: string) => { success: boolean; count?: number; error?: string };
  availableDefaultColors: Record<string, ProductColor>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Ensure default products have code
const initializeDefaultProducts = (): ProductModel[] => {
  return PRODUCTS.map((p) => ({
    ...p,
    code: p.code || `VCP-${String(p.id).padStart(2, '0')}`,
    sizes: p.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
  }));
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductModel[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error al cargar catálogo desde localStorage:', err);
    }
    return initializeDefaultProducts();
  });

  // Sync to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error al guardar catálogo en localStorage:', err);
    }
  }, [products]);

  const addProduct = (productData: Omit<ProductModel, 'id'>): ProductModel => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct: ProductModel = {
      ...productData,
      id: nextId,
      code: productData.code || `VCP-${String(nextId).padStart(2, '0')}`,
      sizes: productData.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: number, updatedData: Partial<ProductModel>) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedData,
          };
        }
        return item;
      })
    );
  };

  const duplicateProduct = (id: number): ProductModel | null => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return null;

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const duplicated: ProductModel = {
      ...existing,
      id: nextId,
      code: `VCP-${String(nextId).padStart(2, '0')}`,
      title: `${existing.title} (Copia)`,
      subtitle: existing.subtitle,
    };

    setProducts((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  const deleteProduct = (id: number): boolean => {
    if (products.length <= 1) {
      alert('No puedes eliminar todos los modelos. Debe haber al menos 1 modelo en el catálogo.');
      return false;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  const resetToDefaultCatalog = () => {
    const defaultList = initializeDefaultProducts();
    setProducts(defaultList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultList));
  };

  const exportCatalogToJson = () => {
    try {
      const dataStr = JSON.stringify(products, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `vcp-catalogo-backup-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al exportar catálogo:', err);
      alert('Ocurrió un error al exportar el catálogo.');
    }
  };

  const importCatalogFromJson = (jsonString: string): { success: boolean; count?: number; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return { success: false, error: 'El archivo JSON no contiene una lista válida de productos.' };
      }

      // Basic validation for required fields
      const isValid = parsed.every(
        (item) => typeof item.title === 'string' && Array.isArray(item.colors) && item.colors.length > 0
      );

      if (!isValid) {
        return { success: false, error: 'El formato de los productos importados es incompatible.' };
      }

      setProducts(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return { success: true, count: parsed.length };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al procesar el archivo JSON.' };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        duplicateProduct,
        deleteProduct,
        resetToDefaultCatalog,
        exportCatalogToJson,
        importCatalogFromJson,
        availableDefaultColors: AVAILABLE_COLORS,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};
