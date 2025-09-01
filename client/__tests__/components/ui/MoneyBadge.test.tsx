import * as React from 'react';

import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import '@testing-library/jest-dom';

import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';

import MoneyBadge from '../../../src/components/ui/MoneyBadge';

enableFetchMocks();

describe('MoneyBadge', () => {
    beforeAll(() => {
        fetchMock.mockIf(/json$/, async req => {
            if (req.url.endsWith('/not_reimbursed_amount.json')) {
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

    it('renders the correct amount', () => {
        const { getByTitle } = render(<MoneyBadge amount="100,51" />);
        const wrapper = getByTitle('Total de despesas não reembolsadas');
        expect(wrapper).toBeTruthy();

        expect(wrapper.textContent).toContain('100,51 perdidos');
    });

    it('renders empty node if amount is empty', () => {
        const { queryAllByTitle } = render(<MoneyBadge amount="" />);
        const nodes = queryAllByTitle('Total de despesas não reembolsadas');
        expect(nodes.length).toBe(0);
    });

    it('renders empty node if amount is null', () => {
        const { queryAllByTitle } = render(<MoneyBadge amount={null} />);
        const nodes = queryAllByTitle('Total de despesas não reembolsadas');
        expect(nodes.length).toBe(0);
    });

    it('renders empty node if amount is undefined', () => {
        const { queryAllByTitle } = render(<MoneyBadge amount={undefined} />);
        const nodes = queryAllByTitle('Total de despesas não reembolsadas');
        expect(nodes.length).toBe(0);
    });
});
