import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { generateId } from '../utils';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

export function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = price ? parseFloat(price.replace(',', '.')) : null;

    const newProduct: Product = {
      id: generateId(),
      name: name.trim(),
      price: parsedPrice,
      quantity: parseInt(quantity) || 1,
      inCart: false,
      createdAt: new Date(),
    };

    onAddProduct(newProduct);
    setName('');
    setPrice('');
    setQuantity('1');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full glass rounded-2xl p-4 shadow-lg flex items-center justify-center gap-2 text-market-600 font-medium hover:bg-market-50 transition-all group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        Adicionar Produto
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 shadow-xl animate-fade-in">
      <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent-400" />
        Novo Produto
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Nome do produto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-market-200 text-black transition-all focus:border-market-400"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="flex-1 py-3 rounded-xl border-2 border-market-300 text-black font-medium hover:bg-market-50 transition-all"
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
  );
}

