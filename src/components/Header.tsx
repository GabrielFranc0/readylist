import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 shadow-lg">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-market-800">ReadyList</h1>
              <p className="text-xs text-market-600">Sua lista de compras</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

