import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from './types';
import {
  SplashScreen,
  Header,
  StatsCards,
  AddProductForm,
  ProductList,
  EmptyState,
  BottomBar,
  EditProductModal,
} from './components';

const STORAGE_KEY = 'readylist-products';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Show splash screen only once per session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('readylist-splash-seen');
    if (hasSeenSplash) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('readylist-splash-seen', 'true');
    setIsLoading(false);
  }, []);

  const stats = useMemo(() => {
    const total = products.reduce((sum, p) => sum + ((p.price ?? 0) * p.quantity), 0);
    const inCartTotal = products
      .filter(p => p.inCart)
      .reduce((sum, p) => sum + ((p.price ?? 0) * p.quantity), 0);
    const itemCount = products.length;
    const inCartCount = products.filter(p => p.inCart).length;
    const withoutPriceCount = products.filter(p => p.price === null).length;

    return { total, inCartTotal, itemCount, inCartCount, withoutPriceCount };
  }, [products]);

  // Show splash screen
  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const toggleInCart = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, inCart: !p.inCart } : p
      )
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
      )
    );
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleEditSave = (id: string, name: string, price: number | null, quantity: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, name, price, quantity } : p
      )
    );
    setEditingProduct(null);
  };

  const clearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar toda a lista?')) {
      setProducts([]);
    }
  };

  const clearCompleted = () => {
    setProducts(prev => prev.filter(p => !p.inCart));
  };

  const selectAll = () => {
    setProducts(prev => prev.map(p => ({ ...p, inCart: true })));
  };

  const deselectAll = () => {
    setProducts(prev => prev.map(p => ({ ...p, inCart: false })));
  };

  return (
    <div className="min-h-screen pb-32">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <StatsCards
          total={stats.total}
          inCartTotal={stats.inCartTotal}
          itemCount={stats.itemCount}
          inCartCount={stats.inCartCount}
        />

        <AddProductForm onAddProduct={handleAddProduct} />

        {products.length > 0 ? (
          <ProductList
            products={products}
            onToggleInCart={toggleInCart}
            onUpdateQuantity={updateQuantity}
            onEdit={setEditingProduct}
            onRemove={removeProduct}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
            onClearCompleted={clearCompleted}
            onClearAll={clearAll}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      {products.length > 0 && (
        <BottomBar
          total={stats.total}
          itemCount={stats.itemCount}
          inCartCount={stats.inCartCount}
          withoutPriceCount={stats.withoutPriceCount}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleEditSave}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
