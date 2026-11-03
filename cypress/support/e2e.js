import './commands';

// Ignora erros não capturados que possam ocorrer de bibliotecas de terceiros no React Native Web
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornando false previne que o Cypress falhe o teste por exceções não tratadas do framework
  return false;
});

