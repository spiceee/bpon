import React from 'react';
import { Link } from 'react-router-dom';

import reactLogo from '../public/react-logo.svg';
import rustLogo from '../public/rust-logo.svg';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className="copyright">
				© 2024 Importação Não Autorizada. Made with Rust and React.{' '}
				<img src={rustLogo} />
			</div>
		</footer>
	);
};

export default Footer;
