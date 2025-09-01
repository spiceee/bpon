import * as React from 'react';

import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import Home from '../../src/pages/Home';

describe('Home', () => {
    it('renders the Home component', () => {
        const { getByRole } = render(<Home />);

        expect(
            getByRole('heading', { name: 'Importação Não Autorizada' })
        ).toBeTruthy();
    });

    it('renders a form', () => {
        const { getByRole } = render(<Home />);

        expect(getByRole('button', { name: 'Envie' })).toBeTruthy();
    });
});
