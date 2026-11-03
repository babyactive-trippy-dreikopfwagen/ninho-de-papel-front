# 🐦 Ninho de Papel - E-commerce de Papelaria

Aplicativo mobile de e-commerce de papelaria desenvolvido com **React Native + Expo**.

## 📋 Requisitos

- Node.js 18+
- Expo CLI
- JSON Server (API fake)

## 🚀 Como rodar

### 1. Instalar dependências
```bash
cd NinhoDePapel
npm install
```

### 2. Iniciar a API fake (JSON Server)
```bash
npm run api
```
> Isso inicia o servidor em `http://localhost:3000` com os dados de `db.json`

### 3. Iniciar o app (em outro terminal)
```bash
npx expo start
```

## 🛠️ Tecnologias

- **React Native** + **Expo SDK 57**
- **React Navigation** (Drawer + Stack)
- **Styled Components** (estilização)
- **JSON Server** (API fake REST)
- **Context API** (estado global do carrinho)

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| Home | Banner de sugestões, produtos em destaque, categorias |
| Todos os Produtos | Listagem com busca e filtro por categoria |
| Detalhes do Produto | Imagem, descrição, preço e botão de adicionar ao carrinho |
| Carrinho | Itens adicionados, quantidades, total e finalização |

## 📂 Estrutura

```
src/
├── assets/          → Imagens e logo
├── components/      → Componentes reutilizáveis
├── context/         → Context API (Carrinho)
├── navigation/      → Navegação (Drawer + Stack)
├── screens/         → Telas do app
└── services/        → Consumo de API
```

