# personal website
This repository contains the source code for my personal website. It serves as a basic online portfolio showcasing my projects, skills, and experiences. Built with modern web technologies like HTML, CSS, and JavaScript (and Vue), this website provides an interactive and responsive platform to display my work and connect with others.

Feel free to explore the code, contribute, or use it as inspiration for your own personal projects!


## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

