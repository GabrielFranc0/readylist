# 🛒 ReadyList

**Sua lista de compras inteligente!**

Um aplicativo moderno e bonito para gerenciar suas compras de supermercado. Cadastre produtos, adicione valores e acompanhe o total em tempo real.

![ReadyList Preview](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss&logoColor=white)

## ✨ Funcionalidades

- ➕ **Adicionar produtos** com nome, preço e quantidade
- 🛒 **Marcar itens** como "no carrinho" enquanto faz compras
- 📊 **Visualizar totais** em tempo real (estimado vs. no carrinho)
- 🔢 **Ajustar quantidades** facilmente com + e -
- 🗑️ **Remover itens** individualmente ou limpar lista
- 💾 **Dados salvos** automaticamente no navegador (localStorage)
- 📱 **100% responsivo** - funciona em celular e desktop
- 🎨 **Design moderno** com animações suaves

## 🚀 Como Usar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone ou entre na pasta do projeto
cd readylist

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em **http://localhost:5173**

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Testar build localmente
npm run preview
```

## 🎯 Como Funciona

1. **Adicionar Produto**: Clique em "Adicionar Produto" e preencha nome, preço e quantidade
2. **Marcar no Carrinho**: Clique no checkbox ao lado do produto quando colocá-lo no carrinho
3. **Ajustar Quantidade**: Use os botões + e - para alterar a quantidade
4. **Ver Total**: O total é calculado automaticamente e exibido na parte inferior
5. **Remover**: Clique no ícone de lixeira para remover um produto

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápida
- **Tailwind CSS** - Estilização utility-first
- **Lucide React** - Ícones bonitos
- **localStorage** - Persistência de dados

## 📁 Estrutura do Projeto

```
readylist/
├── public/
│   └── cart.svg          # Ícone do app
├── src/
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   ├── index.css         # Estilos globais + Tailwind
│   └── types.ts          # Tipos TypeScript
├── index.html            # HTML base
├── package.json          # Dependências
├── tailwind.config.js    # Configuração Tailwind
├── tsconfig.json         # Configuração TypeScript
└── vite.config.ts        # Configuração Vite
```

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Feito com 💚 para facilitar suas compras!
