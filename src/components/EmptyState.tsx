import { Package } from 'lucide-react';

export function EmptyState() {
  return (
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
  );
}

