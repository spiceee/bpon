import React from 'react';
import Form from '../components/Form';
import Link from '../components/Link';

import { PUBLIC_CAPTCHA_SITE_KEY } from '../utils/constants';

const Home: React.FC = () => {
    return (
        <>
            <div className="wrapper envelope">
                <h1>Importação Não Autorizada</h1>
                <Form />
                <div
                    className="cf-turnstile"
                    data-sitekey={PUBLIC_CAPTCHA_SITE_KEY}
                    data-callback="javascriptCallback"
                ></div>
            </div>
        </>
    );
};

export default Home;
