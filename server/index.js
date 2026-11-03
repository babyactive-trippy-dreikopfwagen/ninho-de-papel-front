const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const port = Number(process.env.API_PORT || 3001);
const productsPath = resolve(__dirname, 'products.json');

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(data));
}

async function loadProducts() {
  const json = await readFile(productsPath, 'utf8');
  const products = JSON.parse(json);
  if (!Array.isArray(products)) {
    throw new Error('server/products.json precisa conter uma lista de produtos.');
  }
  return products;
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (request.method !== 'GET' || url.pathname !== '/api/products') {
    sendJson(response, 404, { error: 'Endpoint não encontrado.' });
    return;
  }

  try {
    const products = await loadProducts();
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search')?.trim().toLocaleLowerCase('pt-BR');
    const featuredParam = url.searchParams.get('featured');

    const filteredProducts = products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesSearch =
        !search ||
        `${product.name} ${product.description} ${product.category}`
          .toLocaleLowerCase('pt-BR')
          .includes(search);
      const matchesFeatured =
        featuredParam === null || product.featured === (featuredParam === 'true');

      return matchesCategory && matchesSearch && matchesFeatured;
    });

    sendJson(response, 200, {
      products: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    console.error('Falha ao carregar o catálogo:', error);
    sendJson(response, 500, { error: 'Não foi possível carregar o catálogo de produtos.' });
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`API de papelaria disponível em http://localhost:${port}/api/products`);
});

server.on('error', (error) => {
  console.error('Não foi possível iniciar a API de produtos:', error);
  process.exitCode = 1;
});
