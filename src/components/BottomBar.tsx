import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils';

interface BottomBarProps {
  total: number;
  itemCount: number;
  inCartCount: number;
  withoutPriceCount: number;
}

export function BottomBar({ total, itemCount, inCartCount, withoutPriceCount }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-market-200 shadow-2xl">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-market-500 uppercase tracking-wider">Total a Pagar</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-market-600 to-market-700 bg-clip-text text-transparent">
              {formatCurrency(total)}
            </p>
            {withoutPriceCount > 0 && (
              <p className="text-xs text-amber-600 mt-1">
                {withoutPriceCount} {withoutPriceCount === 1 ? 'item sem preço' : 'itens sem preço'}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-market-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">
                {inCartCount}/{itemCount} no carrinho
              </span>
            </div>
            <div className="w-32 h-2 bg-market-100 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-market-400 to-market-600 rounded-full transition-all duration-500"
                style={{ width: `${itemCount > 0 ? (inCartCount / itemCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

