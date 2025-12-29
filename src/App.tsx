import { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Plus, Trash2, Check, Package, Sparkles, TrendingUp, Minus } from 'lucide-react';
import { Product } from './types';

const STORAGE_KEY = 'readylist-products';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default function App() {
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

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const stats = useMemo(() => {
    const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const inCartTotal = products
      .filter(p => p.inCart)
      .reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const itemCount = products.length;
    const inCartCount = products.filter(p => p.inCart).length;

    return { total, inCartTotal, itemCount, inCartCount };
  }, [products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newProduct: Product = {
      id: generateId(),
      name: name.trim(),
      price: parseFloat(price.replace(',', '.')),
      quantity: parseInt(quantity) || 1,
      inCart: false,
      createdAt: new Date(),
    };

    setProducts(prev => [newProduct, ...prev]);
    setName('');
    setPrice('');
    setQuantity('1');
    setIsAdding(false);
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

  const clearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar toda a lista?')) {
      setProducts([]);
    }
  };

  const clearCompleted = () => {
    setProducts(prev => prev.filter(p => !p.inCart));
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="glass sticky top-0 z-50 shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-market-400 to-market-600 flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-market-800">ReadyList</h1>
                <p className="text-xs text-market-600">Sua lista de compras</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-market-100 text-market-700 px-2 py-1 rounded-full font-medium">
                {stats.itemCount} {stats.itemCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-market-500" />
              <span className="text-xs font-medium text-market-600">Total Estimado</span>
            </div>
            <p className="text-2xl font-bold text-market-800">{formatCurrency(stats.total)}</p>
          </div>
          <div className="glass-dark rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-market-500" />
              <span className="text-xs font-medium text-market-600">No Carrinho</span>
            </div>
            <p className="text-2xl font-bold text-market-700">{formatCurrency(stats.inCartTotal)}</p>
            <p className="text-xs text-market-500 mt-1">
              {stats.inCartCount} de {stats.itemCount} itens
            </p>
          </div>
        </div>

        {/* Add Product Form */}
        {isAdding ? (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-market-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-400" />
              Novo Produto
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-market-700 mb-1">
                  Nome do produto
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Arroz, Feijão, Leite..."
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-market-800 placeholder-market-400 transition-all focus:border-market-400"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-market-700 mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0,00"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-market-800 placeholder-market-400 transition-all focus:border-market-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-market-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-market-800 transition-all focus:border-market-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-market-300 text-market-600 font-medium hover:bg-market-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-market-500 to-market-600 text-white font-medium hover:from-market-600 hover:to-market-700 transition-all shadow-lg shadow-market-500/30"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full glass rounded-2xl p-4 shadow-lg flex items-center justify-center gap-2 text-market-600 font-medium hover:bg-market-50 transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Adicionar Produto
          </button>
        )}

        {/* Product List */}
        {products.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium text-market-600">Sua Lista</h2>
              <div className="flex gap-2">
                {stats.inCartCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="text-xs text-market-500 hover:text-market-700 transition-colors"
                  >
                    Limpar concluídos
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Limpar tudo
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`glass rounded-2xl p-4 shadow-lg animate-slide-in transition-all ${
                    product.inCart ? 'opacity-60' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={product.inCart}
                      onChange={() => toggleInCart(product.id)}
                      className="custom-checkbox flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-market-800 truncate ${
                        product.inCart ? 'line-through text-market-500' : ''
                      }`}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-market-500">
                        {formatCurrency(product.price)} × {product.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 rounded-lg bg-market-100 text-market-600 flex items-center justify-center hover:bg-market-200 transition-colors"
                        disabled={product.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-market-700">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 rounded-lg bg-market-100 text-market-600 flex items-center justify-center hover:bg-market-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-market-700">
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeProduct(product.id)}
                      className="w-8 h-8 rounded-lg text-red-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-market-100 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-market-400" />
            </div>
            <h3 className="text-lg font-medium text-market-700 mb-1">
              Lista vazia
            </h3>
            <p className="text-sm text-market-500">
              Adicione produtos para começar suas compras!
            </p>
          </div>
        )}
      </main>

      {/* Bottom Total Bar */}
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-market-200 shadow-2xl">
          <div className="max-w-lg mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-market-500 uppercase tracking-wider">Total a Pagar</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-market-600 to-market-700 bg-clip-text text-transparent">
                  {formatCurrency(stats.total)}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-market-600">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {stats.inCartCount}/{stats.itemCount} no carrinho
                  </span>
                </div>
                <div className="w-32 h-2 bg-market-100 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-market-400 to-market-600 rounded-full transition-all duration-500"
                    style={{ width: `${stats.itemCount > 0 ? (stats.inCartCount / stats.itemCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

