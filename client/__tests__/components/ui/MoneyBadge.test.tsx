import * as React from 'react';

import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import MoneyBadge from '../../../src/components/ui/MoneyBadge';

describe('MoneyBadge', () => {
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
