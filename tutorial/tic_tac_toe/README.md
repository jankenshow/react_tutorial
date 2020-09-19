# ra-men_app

### environment
node : v12.18.3  
npm : 6.14.8  
yarn : 1.22.5  

ES6+  
TypeScript  
React (Redux or Flux)  
Sass  
Babel  
Webpack  
Eslint  
Prettier  

### Directory structure

```
ra-menn_app
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── dist
│   └── bundle.js
├── package.json
├── postcss.config.js
├── src
│   ├── html
│   │   └── index.html
│   ├── index.tsx
│   └── scss
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

JS files are transpiled to the directory as below.

entry : `src/index.tsx`  
output : `dist/bundle.js`  

And also HTML and CSS/SCSS under `src` directory are transpiled separately
into the `dist` directory.
