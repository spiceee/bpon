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

    it('renders a graph', () => {
        const { getByRole } = render(<Home />);

        expect(
            getByRole('heading', { name: 'Ocorrências reportadas' })
        ).toBeTruthy();
    });

    it('renders a total', () => {
        const { getByTitle } = render(<Home moneyBadgeAmount="1000" />);

        expect(getByTitle('Total de despesas não reembolsadas')).toBeTruthy();
    });
});
