import { TrendingUp, Check } from 'lucide-react';
import { formatCurrency } from '../utils';

interface StatsCardsProps {
  total: number;
  inCartTotal: number;
  itemCount: number;
  inCartCount: number;
}

export function StatsCards({ total, inCartTotal, itemCount, inCartCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="glass rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-market-500" />
          <span className="text-xs font-medium text-market-600">Total Estimado</span>
        </div>
        <p className="text-2xl font-bold text-market-800">{formatCurrency(total)}</p>
        <p className="text-xs text-market-500 mt-1">
          {itemCount} {itemCount === 1 ? 'item' : 'itens'}
        </p>
      </div>
      <div className="glass rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-market-500" />
          <span className="text-xs font-medium text-market-600">No Carrinho</span>
        </div>
        <p className="text-2xl font-bold text-market-700">{formatCurrency(inCartTotal)}</p>
        <p className="text-xs text-market-500 mt-1">
          {inCartCount} de {itemCount} itens
        </p>
      </div>
    </div>
  );
}

