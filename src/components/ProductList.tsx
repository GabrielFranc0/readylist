import { useMemo } from 'react';
import { CheckCheck, X } from 'lucide-react';
import { Product } from '../types';
import { getProductCategory } from '../utils';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onToggleInCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onEdit: (product: Product) => void;
  onRemove: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

export function ProductList({
  products,
  onToggleInCart,
  onUpdateQuantity,
  onEdit,
  onRemove,
  onSelectAll,
  onDeselectAll,
  onClearCompleted,
  onClearAll,
}: ProductListProps) {
  const stats = useMemo(() => {
    const itemCount = products.length;
    const inCartCount = products.filter(p => p.inCart).length;
    return { itemCount, inCartCount };
  }, [products]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: { icon: string; name: string; products: Product[] } } = {};
    
    products.forEach(product => {
      const category = getProductCategory(product.name);
      const key = category.name;
      
      if (!groups[key]) {
        groups[key] = {
          icon: category.icon,
          name: category.name,
          products: []
        };
      }
      groups[key].products.push(product);
    });

    // Sort categories: "Outros" goes last, others alphabetically
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === 'Outros') return 1;
      if (b === 'Outros') return -1;
      return a.localeCompare(b, 'pt-BR');
    });

    return sortedKeys.map(key => groups[key]);
  }, [products]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
        <h2 className="text-sm font-medium text-market-600">Sua Lista</h2>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
          {stats.inCartCount < stats.itemCount ? (
            <button
              onClick={onSelectAll}
              className="flex items-center gap-1 text-xs bg-market-500 text-white px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-market-600 transition-colors font-medium shadow-sm"
              title="Selecionar todos"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Selecionar</span> todos
            </button>
          ) : (
            <button
              onClick={onDeselectAll}
              className="flex items-center gap-1 text-xs bg-market-200 text-market-700 px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-market-300 transition-colors font-medium"
              title="Desmarcar todos"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desmarcar</span> todos
            </button>
          )}
          {stats.inCartCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-market-500 hover:text-market-700 transition-colors whitespace-nowrap"
              title="Limpar concluídos"
            >
              <span className="sm:hidden">Limpar ✓</span>
              <span className="hidden sm:inline">Limpar concluídos</span>
            </button>
          )}
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-600 transition-colors whitespace-nowrap"
            title="Limpar tudo"
          >
            Limpar tudo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {groupedProducts.map((group, groupIndex) => (
          <div key={group.name} className="animate-fade-in" style={{ animationDelay: `${groupIndex * 100}ms` }}>
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-market-500 to-market-600 text-white px-4 py-2 rounded-xl shadow-md">
                <span className="text-lg">{group.icon}</span>
                <span className="font-semibold text-sm">{group.name}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {group.products.length}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-market-300 to-transparent"></div>
            </div>

            {/* Products in Category */}
            <div className="space-y-2 pl-2">
              {group.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleInCart={onToggleInCart}
                  onUpdateQuantity={onUpdateQuantity}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  animationDelay={(groupIndex * 100) + (index * 50)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

