const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config();
}

const envConfig = `import { IEnvironment } from "./environment.model";

export const Environment: IEnvironment = {
    BACKEND_URL: '${process.env.API_URL || ''}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfig);
console.log('✅ environment.prod.ts generado con variables de entorno.');
console.log(`BACKEND_URL: ${process.env.API_URL || ''}`);

