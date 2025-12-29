import { Minus, Plus, Pencil, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, getSpecificProductIcon } from '../utils';

interface ProductCardProps {
  product: Product;
  onToggleInCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onEdit: (product: Product) => void;
  onRemove: (id: string) => void;
  animationDelay?: number;
}

export function ProductCard({
  product,
  onToggleInCart,
  onUpdateQuantity,
  onEdit,
  onRemove,
  animationDelay = 0,
}: ProductCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-3 sm:p-4 shadow-lg animate-slide-in transition-all ${
        product.inCart ? 'opacity-60' : ''
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* First row: Product info + action buttons */}
      <div className="flex items-start gap-2 sm:gap-3">
        <input
          type="checkbox"
          checked={product.inCart}
          onChange={() => onToggleInCart(product.id)}
          className="custom-checkbox flex-shrink-0 mt-1"
        />
        
        {/* Product Icon */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
          {getSpecificProductIcon(product.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-market-800 text-sm sm:text-base truncate ${
            product.inCart ? 'line-through text-market-500' : ''
          }`}>
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-market-500">
            {product.price !== null ? (
              <>{formatCurrency(product.price)} × {product.quantity}</>
            ) : (
              <span className="text-amber-600 italic"></span>
            )}
          </p>
        </div>

        {/* Action buttons - Always visible, right aligned */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={() => onEdit(product)}
            className="p-1.5 sm:p-2 rounded-lg text-market-500 hover:bg-market-100 hover:text-market-700 transition-all"
            title="Editar produto"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => onRemove(product.id)}
            className="p-1.5 sm:p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-all"
            title="Remover produto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Second row: Quantity controls and price */}
      <div className="flex items-center mt-2 sm:mt-3">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onUpdateQuantity(product.id, -1)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-market-100 text-market-600 flex items-center justify-center hover:bg-market-200 transition-colors disabled:opacity-50"
            disabled={product.quantity <= 1}
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-medium text-market-700">
            {product.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(product.id, 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-market-100 text-market-600 flex items-center justify-center hover:bg-market-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="text-right flex-shrink-0 ml-auto">
          {product.price !== null ? (
            <p className="font-bold text-market-700 text-sm sm:text-base">
              {formatCurrency(product.price * product.quantity)}
            </p>
          ) : (
            <p className="text-xs text-amber-600 font-medium"></p>
          )}
        </div>
      </div>
    </div>
  );
}

