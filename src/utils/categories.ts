import { normalizeString } from './helpers';

export interface ProductCategory {
  icon: string;
  name: string;
}

// Category mapping with keywords and icons
export const CATEGORY_ICONS: { keywords: string[]; icon: string; name: string }[] = [
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

export function getProductCategory(productName: string): ProductCategory {
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

