const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Proporciona la ruta al archivo next.config.js de Next.js para cargar next.config.js y .env archivos en el entorno de prueba
  dir: './',
});

// Cualquier configuración personalizada de Jest que desees
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Maneja los alias de módulos (si los hay en tu proyecto)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// createJestConfig se exporta de esta manera para asegurar que next/jest pueda cargar la configuración Next.js que es async
module.exports = createJestConfig(customJestConfig); 