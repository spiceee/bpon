import React from 'react';
import Link from '../components/Link';

import rustCrab from '../../public/cuddlyferris.png';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="copyright">
                © 2025 INA. Made with{' '}
                <img
                    src={rustCrab}
                    alt="Rust Crab"
                    className="rust-crab"
                    width="32"
                />{' '}
                <Link link="https://www.rust-lang.org/">Rust</Link>. Contato:{' '}
                <Link link="mailto:ouvidoria@importacaonaoautorizada.com">
                    ouvidoria at importacaonaoautorizada.com
                </Link>
                . Twitter:{' '}
                <Link link="https://twitter.com/ImpNaoAutoriza">
                    @ImpNaoAutoriza
                </Link>{' '}
                . Bluesky:{' '}
                <Link link="https://bsky.app/profile/importacaonaoautorizada.com">
                    @importacaonaoautorizada.com
                </Link>{' '}
                <span>
                    Este site não é filiado aos Correios ou Receita Federal.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
