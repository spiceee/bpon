import React from 'react';
import Link from '../components/Link';

import reactLogo from '!!raw-loader!../../public/react-logo.svg';
import rustLogo from '!!raw-loader!../../public/rust-logo.svg';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className="copyright">
				© 2024 Importação Não Autorizada. Made with{' '}
				<Link link="https://www.rust-lang.org/">Rust</Link> and{' '}
				<Link link="https://react.dev/">React</Link>.
			</div>
		</footer>
	);
};

export default Footer;
