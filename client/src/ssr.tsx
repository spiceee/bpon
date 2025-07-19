import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { Helmet } from 'react-helmet';

export const Index = (params: string | undefined): string => {
    const props = params ? JSON.parse(params) : {};
    const helmetData = Helmet.renderStatic();

    return `<!doctype html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie-edge">
   <title>Importação Não Autorizada</title>
   ${helmetData.title.toString()}
   ${helmetData.meta.toString()}
   <meta
       name="description"
       content="O que está acontecendo com as encomendas que tentam entrar no Brasil? Por que nossas importações estão sendo não autorizadas? Queremos descobrir com a sua ajuda!"
   />
   <meta property="og:image:width" content="703" />
   <meta property="og:image:height" content="369" />
   <meta property="og:title" content="Importação Não Autorizada" />
   <meta
       property="og:url"
       content="https://importacaonaoautorizada.com"
   />
   <meta
       property="og:site_name"
       content="Importação Não Autorizada"
   />
   <meta property="og:type" content="Website" />
   <link rel="stylesheet" href="./styles/ssr.css">
</head>
<body>
   <noscript>Your browser does not support JavaScript!</noscript>
   ${renderToStaticMarkup(
       <script
           dangerouslySetInnerHTML={{
               __html: `window.__INITIAL_PROPS__ =${JSON.stringify(
                   params
               ).replace(/</g, '\\u003c')}`,
           }}
       />
   )}
   <div id="root">
         ${renderToString(
             <StaticRouter {...props}>
                 <App />
             </StaticRouter>
         )}
   </div>
   <script src="./scripts/bundle.js"></script>
</body>
</html>
    `;
};
