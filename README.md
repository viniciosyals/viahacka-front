# Boilerplate Televendas (ou outros projetos aí)
Boilerplate em ReactJS utilizando TypeScript, Redux e TailwindCSS.
### Links de referência para configuração
- [ReactJS Template](https://www.npmjs.com/package/cra-template-redux-typescript) 
- [Tailwind](https://tailwindcss.com/docs/guides/create-react-app)

### Crie o projeto React com o template redux+typescript e instale a lib do TailwindCSS
```sh
yarn create react-app myapp --template redux-typescript
cd myapp
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
yarn add @craco/craco
```
Crie um arquivo chamado `craco.config.js` na raiz do projeto e cole o código a seguir.
```js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```
Altere os scripts de inicialização no `package.json` para iniciar via `craco`.
```diff
"scripts": {
- "start": "react-scripts start",
- "build": "react-scripts build",
- "test": "react-scripts test",
+ "start": "craco start",
+ "build": "craco build",
+ "test": "craco test",
...
}
```
Crie o arquivo de configuração padrão do tailwind e instale os plugins de sua escolha.
```sh
npx tailwindcss init
yarn add @tailwindcss/typography
yarn add @tailwindcss/forms
```
Altere o arquivo `tailwind.config.js` adicionando as configurações base e os plugins instalados, deve ficar neste formato. 
```diff
module.exports = {
- purge: [],
+ purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
+   require('@tailwindcss/typography'),
+   require('@tailwindcss/forms'),
  ],
}
```
Importe a lib do TailwindCSS para seu arquivo `index.css`.
```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
...
```
### Opcional
Configurando o eslint
```sh
yarn add eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript eslint-config-react-app -D
```
Crie o arquivo `.eslintrc.js` na raíz do projeto e cole o condigo a seguir.
```js
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["react-app", "airbnb", "plugin:@typescript-eslint/recommended", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "jsx-a11y", "prettier"],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"],
      },
    ],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "react/react-in-jsx-scope": "off",
    "react/prefer-stateless-function": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
```
### Utils
- [KimiaUI](https://kimia-ui.vercel.app/) Biblioteca de componentes do ReactJS utilizando TailwindCSS
- Em caso de problema de typos executar o comando `yarn add @types/react@latest`

## Comandos de inicialização disponíveis
### `yarn start`
Inicia a aplicação em modo de desenvolvimento.<br />
Abre [http://localhost:3000](http://localhost:3000) no seu navegador.
### `yarn test`
### `yarn build`
### `yarn eject`