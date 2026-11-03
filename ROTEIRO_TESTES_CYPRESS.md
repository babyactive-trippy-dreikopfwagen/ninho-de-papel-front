# 🧪 Roteiro de Testes End-to-End (E2E) com Cypress
## E-commerce de Papelaria — Ninho de Papel 🐦

Este documento especifica o roteiro completo de testes automatizados desenvolvido em **Cypress** com o padrão **Page Object Model (POM)** e mocks controlados via `cy.intercept()`.

---

## 📐 Configuração e Ambiente

- **Viewport Padrão:** Mobile (iPhone 12 / X: `375px × 812px`)
- **Base URL:** `http://localhost:8081` (Expo Web)
- **Estratégia de Mocking:** `cy.intercept()` para testes 100% determinísticos e simulação de cenários de borda (Loading, Erro 500 e Vazio)

---

## 🗂️ Arquitetura dos Testes (Page Object Model)

```
cypress/
├── fixtures/
│   ├── banners.json          # Mock das sugestões/banners
│   ├── categories.json       # Mock dos tipos de papéis
│   └── products.json         # Mock do catálogo de produtos
├── support/
│   ├── e2e.js                # Setup global do Cypress
│   ├── commands.js           # Comandos customizados (cy.mockApiSuccess, mockApiError, etc.)
│   └── pages/                # Page Objects
│       ├── HomePage.js
│       ├── DrawerMenuPage.js
│       ├── CatalogPage.js
│       ├── ProductDetailPage.js
│       └── CartPage.js
└── e2e/                      # Especificações de Teste (Specs)
    ├── 01_home.cy.js
    ├── 02_drawer_navigation.cy.js
    ├── 03_catalog_and_search.cy.js
    ├── 04_product_detail.cy.js
    ├── 05_cart_and_checkout.cy.js
    └── 06_api_states.cy.js
```

---

## 📋 Matriz de Casos de Teste (Test Suites)

### 1. Suíte: Tela Inicial (Home - Wireframe 2)
**Arquivo:** `cypress/e2e/01_home.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-01** | Carregamento da Home & Consumo de API | Acessar a rota `/` com `cy.mockApiSuccess()` | Requisições HTTP para banners, categorias e produtos retornam 200 OK. |
| **CT-02** | Seção "Sugestões" | Verificar título em badge e carrossel de banners | Banners promocionais visíveis com títulos e subtítulos. |
| **CT-03** | Seção "Em destaque" | Localizar título em badge, botão circular `→` e cards | Produtos marcados com `featured: true` exibidos em scroll horizontal. |
| **CT-04** | Seção "Tipos de Papéis" | Verificar cards de categorias | Papel Kraft, Cartão, Vegetal, Sulfite, Seda e Couché renderizados com ícones e cores temáticas. |
| **CT-05** | Navegação por Categoria | Clicar em "Papel Kraft" | Redirecionamento para a tela de catálogo filtrada. |
| **CT-06** | Abertura de Detalhes do Produto | Clicar no primeiro card de produto | Navegação para a tela de Detalhes com as informações completas. |

---

### 2. Suíte: Menu Lateral / Drawer (Wireframe 1)
**Arquivo:** `cypress/e2e/02_drawer_navigation.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-07** | Abertura e Visualização do Drawer | Clicar no ícone de hambúrguer no cabeçalho | Menu lateral é aberto com botão `✕`, divisor e itens em pílulas cinzas conforme Wireframe 1. |
| **CT-08** | Navegação para "Todos os Produtos" | Clicar em "Todos os Produtos" | Drawer se fecha e a tela de catálogo completo é exibida. |
| **CT-09** | Navegação para "Em destaque" | Clicar em "Em destaque" | Abertura da listagem filtrando apenas itens com selo de destaque. |
| **CT-10** | Navegação para o "Carrinho" | Clicar em "Carrinho" | Abertura da tela de carrinho de compras. |
| **CT-11** | Fechamento do Menu | Clicar no botão `✕` no topo do menu | O menu lateral fecha e o usuário permanece na tela inicial. |

---

### 3. Suíte: Catálogo, Busca e Filtros
**Arquivo:** `cypress/e2e/03_catalog_and_search.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-12** | Filtragem por Categoria | Clicar no chip "Papel Cartão" | Lista atualiza exibindo apenas papéis cartão correspondentes. |
| **CT-13** | Busca em Tempo Real | Digitar "Sulfite" no campo de pesquisa | O catálogo filtra instantaneamente exibindo apenas resmas e folhas sulfite. |
| **CT-14** | Ausência de Resultados (EmptyState) | Digitar termo inexistente (ex: `produto_inexistente_xyz`) | Componente `EmptyState` é renderizado informando que nenhum papel foi localizado. |

---

### 4. Suíte: Detalhes do Produto (Wireframe 3)
**Arquivo:** `cypress/e2e/04_product_detail.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-15** | Layout de 2 Colunas e Logo Superior | Abrir a tela de detalhes de um produto | Topo exibe a logo e linha horizontal; coluna esquerda exibe imagem e direita exibe especificações. |
| **CT-16** | Seletor de Quantidade | Clicar no botão `+` e depois no botão `-` | Quantidade incrementa para 2 e decrementa de volta para 1 (sem permitir valores menores que 1). |
| **CT-17** | Adicionar ao Carrinho | Clicar no botão "Adicionar ao Carrinho" | Produto e quantidade selecionada são salvos no contexto do carrinho e alerta de confirmação é disparado. |
| **CT-18** | Botão "Ir para Home" | Clicar no botão cinza "Ir para Home" na base da tela | Usuário é redirecionado de volta para a tela inicial `HomeScreen`. |

---

### 5. Suíte: Carrinho e Finalização de Compra
**Arquivo:** `cypress/e2e/05_cart_and_checkout.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-19** | Estado de Carrinho Vazio | Acessar o carrinho sem ter adicionado itens | Exibe ilustração, texto "Seu carrinho está vazio" e botão "Explorar Papéis". |
| **CT-20** | Cálculo de Subtotal e Frete | Adicionar 2 itens ao carrinho | Subtotal calculado corretamente (`quantidade × preço`) e frete exibido como grátis se total ≥ R$ 99. |
| **CT-21** | Finalizar Pedido | Clicar no botão "Finalizar Pedido" | Confirmação exibida com total do pedido e carrinho é limpo. |

---

### 6. Suíte: Tratamento dos Estados da API
**Arquivo:** `cypress/e2e/06_api_states.cy.js`

| ID | Cenário de Teste | Ações Realizadas | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **CT-22** | Estado de Carregamento (Loading) | `cy.mockApiDelay(1500)` antes de carregar a tela | Componente `Loading` ("Carregando novidades da papelaria...") é exibido enquanto a API processa. |
| **CT-23** | Estado de Erro HTTP 500 e Retry | `cy.mockApiError(500)` ao carregar a página | Componente `ErrorMessage` com "Ops!" e botão "Tentar novamente". Ao clicar e restaurar a API, carrega os dados com sucesso. |
| **CT-24** | Estado de Ausência de Dados | `cy.mockApiEmpty()` simulando resposta `[]` | Componente `EmptyState` exibido informando ausência de itens. |

---

## ⚡ Como Executar os Testes

1. **Subir a aplicação em modo Web:**
   ```bash
   cd "c:\Users\PC01\Music\apresentação\NinhoDePapel"
   npx expo start --web
   ```

2. **Abrir a interface interativa do Cypress:**
   ```bash
   npm run cypress:open
   ```

3. **Ou executar todos os testes em modo headless (Terminal/CI):**
   ```bash
   npm run test:e2e
   ```

