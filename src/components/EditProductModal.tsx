import { useState, useEffect } from 'react';
import { Pencil, X } from 'lucide-react';
import { Product } from '../types';

interface EditProductModalProps {
  product: Product;
  onSave: (id: string, name: string, price: number | null, quantity: number) => void;
  onClose: () => void;
}

export function EditProductModal({ product, onSave, onClose }: EditProductModalProps) {
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(
    product.price !== null ? product.price.toString().replace('.', ',') : ''
  );
  const [editQuantity, setEditQuantity] = useState(product.quantity.toString());

  useEffect(() => {
    setEditName(product.name);
    setEditPrice(product.price !== null ? product.price.toString().replace('.', ',') : '');
    setEditQuantity(product.quantity.toString());
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const parsedPrice = editPrice ? parseFloat(editPrice.replace(',', '.')) : null;
    onSave(product.id, editName.trim(), parsedPrice, parseInt(editQuantity) || 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass rounded-2xl p-5 shadow-xl w-full max-w-md animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black flex items-center gap-2">
            <Pencil className="w-5 h-5 text-market-500" />
            Editar Produto
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-market-500 flex items-center justify-center hover:bg-market-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Nome do produto
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Ex: Arroz, Feijão, Leite..."
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-black placeholder-text-black transition-all focus:border-market-400"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Preço (R$)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                placeholder="0,00 (opcional)"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-black placeholder-text-black transition-all focus:border-market-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-black transition-all focus:border-market-400"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-market-300 text-black font-medium hover:bg-market-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-market-500 to-market-600 text-white font-medium hover:from-market-600 hover:to-market-700 transition-all shadow-lg shadow-market-500/30"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

