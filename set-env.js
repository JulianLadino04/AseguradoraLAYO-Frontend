const fs = require('fs');

const envConfig = `import { IEnvironment } from "./environment.model";

export const Environment: IEnvironment = {
    BACKEND_URL: '${process.env.API_URL || ''}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfig);
console.log('✅ environment.prod.ts generado con variables de entorno.');
