# JSDC 2024 Vite, React, Vitest Demo

This is a demo project for the [JSDC.TW 2024 conference](https://2024.jsdc.tw/) with the topic about [《Exploring VoidZero's Swiss Army Knife for the JS Ecosystem》](https://blog.jsdc.tw/2024/12/14/Codefarmer-vite).

## Tech Stack

- [Vite](https://vitejs.dev/)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [React](https://reactjs.org/)
- [Vitest](https://vitest.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)

## Usage

```shell
$ pnpm install
$ pnpm run dev
```

## Test

```shell
$ pnpm run test # run all tests
$ pnpm run test:watch # run all tests and watch for changes
$ pnpm run test:ui # run all tests and open the debug UI
```

## Lint

```shell
$ pnpm run lint # run lint
$ pnpm run oxlint # run lint with oxlint
```

## Template setup notes

```shell
$ pnpm create vite jsdc-vitest-demo --template react-swc-ts
```
