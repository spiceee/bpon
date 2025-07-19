import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './styles/index.scss';
import og from '../public/og.png';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/404';

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="O que está acontecendo com as encomendas que tentam entrar no Brasil? Por que nossas importações estão sendo não autorizadas? Queremos descobrir com a sua ajuda!"
                />
                <meta property="og:image" content={og} />
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
                <title>Importação Não Autorizada</title>
                <link rel="icon" type="image/png" href="./favicon.png" />
                <link rel="icon" type="image/ico" href="./favicon.ico" />
            </Helmet>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
        </>
    );
};

export default App;
