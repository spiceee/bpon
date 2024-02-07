import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './styles/index.scss';
import favicon from '../public/favicon.png';
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
                <title>Importação Não Autorizada</title>
                <link rel="icon" type="image/png" href={favicon} />
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
