# Ninho de Papel

## Catálogos de produtos

A tela **Produtos** permite alternar entre dois catálogos:

- **Papelaria local** — API deste projeto, com cadernos, papéis, tesouras, canetas e outros itens de papelaria.
- **API externa** — `https://api.testingapis.com/api/Products`, que retorna produtos genéricos e categorias como eletrônicos, roupas, livros, casa e esportes.

Os dados da API externa são mapeados para o formato usado nos cartões. Busca e categorias são filtradas na tela; produtos indisponíveis aparecem desabilitados para adição ao carrinho.

## API local de produtos

Para usar o catálogo de papelaria local, abra dois terminais na raiz do projeto:

1. Inicie a API:

   ```sh
   npm run api
   ```

2. Inicie o Expo:

   ```sh
   npx expo start
   ```

A API local oferece:

- `GET /api/health` — estado do servidor.
- `GET /api/products` — catálogo completo.
- `GET /api/products?category=Cadernos` — filtra por categoria.
- `GET /api/products?search=papel` — busca por nome, descrição e categoria.
- `GET /api/products?featured=true` — filtra produtos em destaque.

O app tenta usar automaticamente o endereço do servidor Expo na porta `3001`. Para celular físico, permita conexões locais no firewall e mantenha computador e celular na mesma rede Wi-Fi. Se necessário, defina `EXPO_PUBLIC_API_URL` no arquivo `.env` com o endereço acessível do computador, por exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3001/api
```

Substitua o IP pelo endereço local do computador. Reinicie o Expo após alterar `.env`.
