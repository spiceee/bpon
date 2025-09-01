import * as React from 'react';

import { render } from '@testing-library/react';
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import '@testing-library/jest-dom';

import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';

import Home from '../../src/pages/Home';

enableFetchMocks();

describe('Home', () => {
    beforeAll(() => {
        fetchMock.mockIf(/json$/, async req => {
            if (req.url.endsWith('/nodes.json')) {
                return {
                    body: JSON.stringify([
                        {
                            month: '2024-10-01T00:00:00Z',
                            occurrences: 3,
                        },
                        {
                            month: '2024-11-01T00:00:00Z',
                            occurrences: 2,
                        },
                    ]),
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
            } else if (req.url.endsWith('/not_reimbursed_amount.json')) {
                return {
                    body: JSON.stringify([
                        { total_value_not_reimbursed: '29209.180000' },
                    ]),
                    headers: {
                        'Content-type': 'application/json',
                    },
                };
            } else {
                return {
                    status: 404,
                    body: 'Not Found',
                };
            }
        });
    });

    afterAll(() => {
        fetchMock.resetMocks();
    });

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
