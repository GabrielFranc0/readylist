import { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Plus, Trash2, Check, Package, Sparkles, TrendingUp, Minus, Pencil, X, CheckCheck } from 'lucide-react';
import { Product } from './types';

const STORAGE_KEY = 'readylist-products';

// Function to normalize strings (remove accents and convert to lowercase)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Specific product icons mapping
const PRODUCT_ICONS: { [key: string]: string } = {
  // Laticínios
  'leite': '🥛',
  'queijo': '🧀',
  'mussarela': '🧀',
  'mozzarella': '🧀',
  'parmesão': '🧀',
  'parmesan': '🧀',
  'ricota': '🧀',
  'cream cheese': '🧀',
  'requeijão': '🧀',
  'iogurte': '🥛',
  'manteiga': '🧈',
  'creme de leite': '🥛',
  'nata': '🥛',
  
  // Carnes
  'carne': '🥩',
  'bife': '🥩',
  'picanha': '🥩',
  'alcatra': '🥩',
  'patinho': '🥩',
  'acém': '🥩',
  'costela': '🥩',
  'coxão': '🥩',
  'maminha': '🥩',
  'filé mignon': '🥩',
  'cupim': '🥩',
  'bacon': '🥓',
  'linguiça': '🌭',
  'salsicha': '🌭',
  'presunto': '🥓',
  'mortadela': '🥓',
  'tender': '🍖',
  
  // Aves
  'frango': '🍗',
  'peito de frango': '🍗',
  'coxa': '🍗',
  'sobrecoxa': '🍗',
  'peru': '🦃',
  
  // Peixes e Frutos do Mar
  'peixe': '🐟',
  'salmão': '🍣',
  'tilápia': '🐟',
  'bacalhau': '🐟',
  'atum fresco': '🐟',
  'sardinha fresca': '🐟',
  'merluza': '🐟',
  'pescada': '🐟',
  'robalo': '🐟',
  'anchova': '🐟',
  'camarão': '🦐',
  'lula': '🦑',
  'polvo': '🐙',
  'caranguejo': '🦀',
  'lagosta': '🦞',
  
  // Frutas
  'maçã': '🍎',
  'maca': '🍎',
  'banana': '🍌',
  'laranja': '🍊',
  'tangerina': '🍊',
  'mexerica': '🍊',
  'uva': '🍇',
  'abacaxi': '🍍',
  'manga': '🥭',
  'mamão': '🥭',
  'melão': '🍈',
  'melancia': '🍉',
  'morango': '🍓',
  'limão': '🍋',
  'abacate': '🥑',
  'pêra': '🍐',
  'pera': '🍐',
  'pêssego': '🍑',
  'pessego': '🍑',
  'kiwi': '🥝',
  'goiaba': '🍈',
  'maracujá': '🥝',
  'maracuja': '🥝',
  'acerola': '🍒',
  'cereja': '🍒',
  'ameixa': '🍑',
  'coco': '🥥',
  'fruta': '🍎',
  
  // Vegetais e Legumes
  'cenoura': '🥕',
  'batata': '🥔',
  'tomate': '🍅',
  'alface': '🥬',
  'cebola': '🧅',
  'alho': '🧄',
  'brócolis': '🥦',
  'brocolis': '🥦',
  'couve': '🥬',
  'espinafre': '🥬',
  'repolho': '🥬',
  'pepino': '🥒',
  'abobrinha': '🥒',
  'berinjela': '🍆',
  'pimentão': '🫑',
  'pimentao': '🫑',
  'pimenta': '🌶️',
  'beterraba': '🥬',
  'vagem': '🥬',
  'quiabo': '🥬',
  'jiló': '🥬',
  'chuchu': '🥬',
  'abóbora': '🎃',
  'abobora': '🎃',
  'mandioca': '🥔',
  'inhame': '🥔',
  'verdura': '🥬',
  'legume': '🥬',
  'salada': '🥗',
  'rúcula': '🥬',
  'rucula': '🥬',
  'agrião': '🥬',
  'agriao': '🥬',
  'acelga': '🥬',
  'milho verde': '🌽',
  'milho': '🌽',
  
  // Padaria
  'pão': '🍞',
  'pao': '🍞',
  'pão francês': '🥖',
  'pão de forma': '🍞',
  'bisnaguinha': '🥖',
  'baguete': '🥖',
  'bolo': '🎂',
  'torrada': '🍞',
  'croissant': '🥐',
  'rosca': '🥯',
  'sonho': '🍩',
  'pão de queijo': '🧀',
  'brioche': '🥐',
  'massa folhada': '🥐',
  
  // Bebidas
  'água': '💧',
  'agua': '💧',
  'suco': '🧃',
  'refrigerante': '🥤',
  'coca': '🥤',
  'coca-cola': '🥤',
  'guaraná': '🥤',
  'guarana': '🥤',
  'fanta': '🥤',
  'sprite': '🥤',
  'cerveja': '🍺',
  'vinho': '🍷',
  'vinho tinto': '🍷',
  'vinho branco': '🥂',
  'champagne': '🍾',
  'espumante': '🍾',
  'whisky': '🥃',
  'vodka': '🍸',
  'cachaça': '🥃',
  'cachaca': '🥃',
  'tônica': '🥤',
  'tonica': '🥤',
  'energético': '🥤',
  'energetico': '🥤',
  'isotônico': '🥤',
  'isotonico': '🥤',
  'chá gelado': '🧋',
  
  // Limpeza
  'detergente': '🧴',
  'sabão': '🧼',
  'sabao': '🧼',
  'água sanitária': '🧴',
  'agua sanitaria': '🧴',
  'desinfetante': '🧴',
  'amaciante': '🧴',
  'lava roupas': '🧺',
  'alvejante': '🧴',
  'limpa vidro': '🪟',
  'esponja': '🧽',
  'pano': '🧹',
  'vassoura': '🧹',
  'rodo': '🧹',
  'lustra móveis': '🧴',
  'multiuso': '🧴',
  'cloro': '🧴',
  'saco de lixo': '🗑️',
  'limpeza': '🧹',
  
  // Higiene Pessoal
  'shampoo': '🧴',
  'condicionador': '🧴',
  'sabonete': '🧼',
  'pasta de dente': '🪥',
  'creme dental': '🪥',
  'escova de dente': '🪥',
  'papel higiênico': '🧻',
  'papel higienico': '🧻',
  'desodorante': '🧴',
  'fio dental': '🪥',
  'absorvente': '🩹',
  'fralda': '👶',
  'algodão': '☁️',
  'algodao': '☁️',
  'cotonete': '🩹',
  'hidratante': '🧴',
  'protetor solar': '🧴',
  'barbeador': '🪒',
  'gilete': '🪒',
  'veja': '🧴',
  
  // Cereais e Grãos
  'arroz': '🍚',
  'feijão': '🫘',
  'feijao': '🫘',
  'aveia': '🌾',
  'granola': '🥣',
  'cereal': '🥣',
  'sucrilhos': '🥣',
  'corn flakes': '🥣',
  'trigo': '🌾',
  'quinoa': '🌾',
  'lentilha': '🫘',
  'grão de bico': '🫘',
  'grao de bico': '🫘',
  'soja': '🫘',
  'ervilha seca': '🫘',
  'farinha': '🌾',
  'fubá': '🌾',
  'fuba': '🌾',
  'polenta': '🌾',
  'canjica': '🌾',
  
  // Biscoitos e Snacks
  'bolacha': '🍪',
  'biscoito': '🍪',
  'cookie': '🍪',
  'wafer': '🍪',
  'cream cracker': '🍪',
  'rosquinha': '🍩',
  'salgadinho': '🍿',
  'chips': '🍟',
  'doritos': '🍿',
  'ruffles': '🍟',
  'torcida': '🍿',
  'cheetos': '🍿',
  'snack': '🍿',
  'chocolate': '🍫',
  'barra de cereal': '🥣',
  'amendoim': '🥜',
  'castanha': '🥜',
  'pipoca': '🍿',
  
  // Enlatados e Conservas
  'atum': '🥫',
  'sardinha': '🥫',
  'ervilha': '🫛',
  'molho de tomate': '🍅',
  'extrato': '🥫',
  'azeitona': '🫒',
  'palmito': '🥫',
  'seleta': '🥫',
  'champignon': '🍄',
  'cogumelo': '🍄',
  'catchup': '🍅',
  'ketchup': '🍅',
  'mostarda': '🟡',
  'maionese': '🥫',
  'conserva': '🥫',
  'enlatado': '🥫',
  
  // Congelados
  'pizza': '🍕',
  'sorvete': '🍦',
  'hambúrguer': '🍔',
  'hamburguer': '🍔',
  'lasanha': '🍝',
  'nuggets': '🍗',
  'empanado': '🍗',
  'batata frita': '🍟',
  'congelado': '❄️',
  'picolé': '🍦',
  'picole': '🍦',
  'açaí': '🍇',
  'acai': '🍇',
  'polpa': '🍓',
  'massa pronta': '🍝',
  
  // Café e Chás
  'café': '☕',
  'cafe': '☕',
  'chá': '🍵',
  'cha': '🍵',
  'cappuccino': '☕',
  'achocolatado': '🍫',
  'nescau': '🍫',
  'toddy': '🍫',
  'filtro de café': '☕',
  'cápsula': '☕',
  'capsula': '☕',
  
  // Ovos
  'ovo': '🥚',
  'ovos': '🥚',
  
  // Temperos e Condimentos
  'açúcar': '🍬',
  'acucar': '🍬',
  'sal': '🧂',
  'óleo': '🫒',
  'oleo': '🫒',
  'azeite': '🫒',
  'vinagre': '🍶',
  'tempero': '🧂',
  'orégano': '🌿',
  'oregano': '🌿',
  'manjericão': '🌿',
  'manjericao': '🌿',
  'canela': '🌰',
  'cravo': '🌰',
  'noz moscada': '🌰',
  'colorau': '🌶️',
  'cominho': '🌿',
  'curry': '🌿',
  'páprica': '🌶️',
  'paprica': '🌶️',
  'louro': '🌿',
  'alecrim': '🌿',
  'salsinha': '🌿',
  'cebolinha': '🌿',
  'coentro': '🌿',
  'sazon': '🧂',
  'knorr': '🧂',
  'caldo': '🧂',
  'condimento': '🧂',
  
  // Massas
  'macarrão': '🍝',
  'macarrao': '🍝',
  'espaguete': '🍝',
  'spaghetti': '🍝',
  'penne': '🍝',
  'fusilli': '🍝',
  'talharim': '🍝',
  'lasanha seca': '🍝',
  'massa': '🍝',
  'nhoque': '🍝',
  'capeletti': '🍝',
  'ravioli': '🍝',
  
  // Doces e Pastas
  'mel': '🍯',
  'geleia': '🍓',
  'doce de leite': '🥛',
  'nutella': '🍫',
  'amendocreme': '🥜',
  'leite condensado': '🥛',
  'creme de avelã': '🌰',
  
  // Pet Shop
  'ração': '🐕',
  'racao': '🐕',
  'petisco pet': '🐾',
  'sachê': '🐱',
  'sache': '🐱',
  'areia de gato': '🐱',
  'comedouro': '🐾',
  'antipulgas': '🐕',
};

// Function to get specific product icon
function getSpecificProductIcon(productName: string): string {
  const nameNormalized = normalizeString(productName);
  
  // Check for exact matches first (longer keywords first for better matching)
  const sortedKeywords = Object.keys(PRODUCT_ICONS).sort((a, b) => b.length - a.length);
  
  for (const keyword of sortedKeywords) {
    if (nameNormalized.includes(normalizeString(keyword))) {
      return PRODUCT_ICONS[keyword];
    }
  }
  
  // If no specific icon found, return from category or default
  return getProductCategory(productName).icon;
}

// Category mapping with keywords and icons
const CATEGORY_ICONS: { keywords: string[]; icon: string; name: string }[] = [
  {
    keywords: ['leite', 'queijo', 'iogurte', 'manteiga', 'creme de leite', 'requeijão', 'nata', 'cream cheese', 'ricota', 'mussarela', 'parmesão'],
    icon: '🐮',
    name: 'Laticínios'
  },
  {
    keywords: ['carne', 'bacon', 'linguiça', 'salsicha', 'presunto', 'mortadela', 'tender', 'picanha', 'alcatra', 'patinho', 'acém', 'costela', 'coxão', 'maminha', 'filé mignon', 'cupim', 'bife'],
    icon: '🥩',
    name: 'Carnes e Aves'
  },
  {
    keywords: ['frango', 'peito de frango', 'coxa', 'sobrecoxa', 'peru'],
    icon: '🐔',
    name: 'Aves'
  },
  {
    keywords: ['peixe', 'camarão', 'salmão', 'tilápia', 'bacalhau', 'atum fresco', 'sardinha fresca', 'merluza', 'pescada', 'robalo', 'anchova'],
    icon: '🐟',
    name: 'Peixes e Frutos do Mar'
  },
  {
    keywords: ['maçã', 'banana', 'laranja', 'uva', 'abacaxi', 'manga', 'mamão', 'melão', 'melancia', 'morango', 'limão', 'abacate', 'pêra', 'pêssego', 'kiwi', 'goiaba', 'maracujá', 'acerola', 'tangerina', 'mexerica', 'ameixa', 'cereja', 'coco', 'fruta'],
    icon: '🍎',
    name: 'Frutas'
  },
  {
    keywords: ['cenoura', 'batata', 'tomate', 'alface', 'cebola', 'alho', 'brócolis', 'couve', 'espinafre', 'repolho', 'pepino', 'abobrinha', 'berinjela', 'pimentão', 'beterraba', 'vagem', 'quiabo', 'jiló', 'chuchu', 'abóbora', 'mandioca', 'inhame', 'verdura', 'legume', 'salada', 'rúcula', 'agrião', 'acelga', 'brocolis'],
    icon: '🥬',
    name: 'Vegetais e Legumes'
  },
  {
    keywords: ['pão', 'bolo', 'torrada', 'croissant', 'rosca', 'sonho', 'bisnaguinha', 'pão de queijo', 'pão francês', 'pão de forma', 'brioche', 'massa folhada'],
    icon: '🍞',
    name: 'Padaria'
  },
  {
    keywords: ['água', 'suco', 'refrigerante', 'cerveja', 'vinho', 'energético', 'isotônico', 'chá gelado', 'coca', 'guaraná', 'fanta', 'sprite', 'schweppes', 'tônica', 'whisky', 'vodka', 'cachaça', 'champagne', 'espumante'],
    icon: '🥤',
    name: 'Bebidas'
  },
  {
    keywords: ['detergente', 'sabão', 'água sanitária', 'desinfetante', 'amaciante', 'lava roupas', 'alvejante', 'limpa vidro', 'esponja', 'pano', 'vassoura', 'rodo', 'lustra móveis', 'multiuso', 'cloro', 'saco de lixo', 'limpeza', 'veja'],
    icon: '🧹',
    name: 'Produtos de Limpeza'
  },
  {
    keywords: ['shampoo', 'condicionador', 'sabonete', 'pasta de dente', 'papel higiênico', 'desodorante', 'creme dental', 'escova de dente', 'fio dental', 'absorvente', 'fralda', 'algodão', 'cotonete', 'hidratante', 'protetor solar', 'barbeador', 'gilete'],
    icon: '🧴',
    name: 'Higiene Pessoal'
  },
  {
    keywords: ['arroz', 'feijão', 'milho', 'aveia', 'granola', 'cereal', 'trigo', 'quinoa', 'lentilha', 'grão de bico', 'soja', 'ervilha seca', 'sucrilhos', 'corn flakes', 'farinha', 'fubá', 'polenta', 'canjica'],
    icon: '🌾',
    name: 'Cereais e Grãos'
  },
  {
    keywords: ['bolacha', 'biscoito', 'salgadinho', 'chocolate', 'barra de cereal', 'cookie', 'wafer', 'cream cracker', 'rosquinha', 'amendoim', 'castanha', 'chips', 'doritos', 'ruffles', 'torcida', 'cheetos', 'snack'],
    icon: '🍪',
    name: 'Biscoitos e Snacks'
  },
  {
    keywords: ['atum', 'sardinha', 'ervilha', 'milho verde', 'molho de tomate', 'extrato', 'azeitona', 'palmito', 'seleta', 'champignon', 'cogumelo', 'catchup', 'ketchup', 'mostarda', 'maionese', 'conserva', 'enlatado'],
    icon: '🥫',
    name: 'Enlatados e Conservas'
  },
  {
    keywords: ['pizza', 'sorvete', 'hambúrguer', 'lasanha', 'nuggets', 'empanado', 'batata frita', 'congelado', 'picolé', 'açaí', 'polpa', 'massa pronta'],
    icon: '❄️',
    name: 'Congelados'
  },
  {
    keywords: ['café', 'chá', 'cappuccino', 'achocolatado', 'nescau', 'toddy', 'filtro de café', 'cápsula'],
    icon: '☕',
    name: 'Café e Chás'
  },
  {
    keywords: ['ovo', 'ovos'],
    icon: '🥚',
    name: 'Ovos'
  },
  {
    keywords: ['açúcar', 'sal', 'óleo', 'azeite', 'vinagre', 'tempero', 'pimenta', 'orégano', 'manjericão', 'canela', 'cravo', 'noz moscada', 'colorau', 'cominho', 'curry', 'páprica', 'louro', 'alecrim', 'salsinha', 'cebolinha', 'coentro', 'sazon', 'knorr', 'caldo', 'condimento'],
    icon: '🧂',
    name: 'Temperos e Condimentos'
  },
  {
    keywords: ['macarrão', 'espaguete', 'penne', 'fusilli', 'talharim', 'lasanha seca', 'massa', 'nhoque', 'capeletti', 'ravioli'],
    icon: '🍝',
    name: 'Massas'
  },
  {
    keywords: ['mel', 'geleia', 'doce de leite', 'nutella', 'amendocreme', 'leite condensado', 'creme de avelã'],
    icon: '🍯',
    name: 'Doces e Pastas'
  },
  {
    keywords: ['ração', 'petisco pet', 'sachê', 'areia de gato', 'comedouro', 'antipulgas'],
    icon: '🐾',
    name: 'Pet Shop'
  },
];

interface ProductCategory {
  icon: string;
  name: string;
}

function getProductCategory(productName: string): ProductCategory {
  const nameNormalized = normalizeString(productName);
  
  for (const category of CATEGORY_ICONS) {
    for (const keyword of category.keywords) {
      if (nameNormalized.includes(normalizeString(keyword))) {
        return { icon: category.icon, name: category.name };
      }
    }
  }
  
  return { icon: '📦', name: 'Outros' }; // Default for unclassified products
}

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editQuantity, setEditQuantity] = useState('1');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

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

    setProducts(prev => [newProduct, ...prev]);
    setName('');
    setPrice('');
    setQuantity('1');
    setIsAdding(false);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price !== null ? product.price.toString().replace('.', ',') : '');
    setEditQuantity(product.quantity.toString());
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditName('');
    setEditPrice('');
    setEditQuantity('1');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editName.trim()) return;

    const parsedPrice = editPrice ? parseFloat(editPrice.replace(',', '.')) : null;

    setProducts(prev =>
      prev.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: editName.trim(),
              price: parsedPrice,
              quantity: parseInt(editQuantity) || 1,
            }
          : p
      )
    );
    cancelEditing();
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

  const selectAll = () => {
    setProducts(prev => prev.map(p => ({ ...p, inCart: true })));
  };

  const deselectAll = () => {
    setProducts(prev => prev.map(p => ({ ...p, inCart: false })));
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
            <p className="text-xs text-market-500 mt-1">
              {stats.itemCount} {stats.itemCount === 1 ? 'item' : 'itens'}
            </p>
          </div>
          <div className="glass rounded-2xl p-4 shadow-lg">
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
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full glass rounded-2xl p-4 shadow-lg flex items-center justify-center gap-2 text-market-600 font-medium hover:bg-market-50 transition-all group"          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Adicionar Produto
          </button>
        )}

        {/* Product List */}
        {products.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium text-market-600">Sua Lista</h2>
              <div className="flex gap-2 items-center">
                {stats.inCartCount < stats.itemCount ? (
                  <button
                    onClick={selectAll}
                    className="flex items-center gap-1 text-xs bg-market-500 text-white px-2.5 py-1.5 rounded-lg hover:bg-market-600 transition-colors font-medium shadow-sm"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Selecionar todos
                  </button>
                ) : (
                  <button
                    onClick={deselectAll}
                    className="flex items-center gap-1 text-xs bg-market-200 text-market-700 px-2.5 py-1.5 rounded-lg hover:bg-market-300 transition-colors font-medium"
                  >
                    <X className="w-3.5 h-3.5" />
                    Desmarcar todos
                  </button>
                )}
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
                      <div
                        key={product.id}
                        className={`glass rounded-2xl p-4 shadow-lg animate-slide-in transition-all ${
                          product.inCart ? 'opacity-60' : ''
                        }`}
                        style={{ animationDelay: `${(groupIndex * 100) + (index * 50)}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={product.inCart}
                            onChange={() => toggleInCart(product.id)}
                            className="custom-checkbox flex-shrink-0"
                          />
                          
                          {/* Product Icon */}
                          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-xl">
                            {getSpecificProductIcon(product.name)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-medium text-market-800 truncate ${
                              product.inCart ? 'line-through text-market-500' : ''
                            }`}>
                              {product.name}
                            </h3>
                            <p className="text-sm text-market-500">
                              {product.price !== null ? (
                                <>{formatCurrency(product.price)} × {product.quantity}</>
                              ) : (
                                <span className="text-amber-600 italic"></span>
                              )}
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
                            {product.price !== null ? (
                              <p className="font-bold text-market-700 text-sm">
                                {formatCurrency(product.price * product.quantity)}
                              </p>
                            ) : (
                              <p className="text-xs text-amber-600 font-medium"></p>
                            )}
                          </div>

                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            <button
                              onClick={() => startEditing(product)}
                              className="w-7 h-7 rounded-lg text-market-500 flex items-center justify-center hover:bg-market-100 hover:text-market-700 transition-all"
                              title="Editar produto"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => removeProduct(product.id)}
                              className="w-7 h-7 rounded-lg text-red-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
                {stats.withoutPriceCount > 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    {stats.withoutPriceCount} {stats.withoutPriceCount === 1 ? 'item sem preço' : 'itens sem preço'}
                  </p>
                )}
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass rounded-2xl p-5 shadow-xl w-full max-w-md animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                <Pencil className="w-5 h-5 text-market-500" />
                Editar Produto
              </h2>
              <button
                onClick={cancelEditing}
                className="w-8 h-8 rounded-lg text-market-500 flex items-center justify-center hover:bg-market-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
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
                  onClick={cancelEditing}
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
      )}
    </div>
  );
}


