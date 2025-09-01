import * as React from 'react';

import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import Form from '../../src/components/Form';

describe('Form', () => {
    it('renders form', () => {
        const { getByRole } = render(<Form />);

        expect(getByRole('button', { name: 'Envie' })).toBeTruthy();
    });

    describe('With required fields', () => {
        it('renders a warning if tracking code is missing', async () => {
            const { getByTestId, getByRole, getByText } = render(<Form />);
            const codeInput = getByTestId('code');
            const button = getByRole('button', { name: 'Envie' });

            await act(async () => {
                fireEvent.focus(codeInput, {
                    target: { value: '' },
                });
                fireEvent.click(button);
            });

            await waitFor(() => {
                expect(getByText('Digite um código válido.')).toBeTruthy();
            });
        });

        it('renders a warning if data_use_consent is not checked', async () => {
            const { getByRole, getByText } = render(<Form />);
            const button = getByRole('button', { name: 'Envie' });

            await act(async () => {
                fireEvent.click(button);
            });

            await waitFor(() => {
                expect(
                    getByText('Você precisa estar de acordo com nossos termos')
                ).toBeTruthy();
            });
        });

        it('should not render a warning if data_use_consent is checked', async () => {
            const { getByRole, queryAllByText, getByTestId } = render(<Form />);
            const button = getByRole('button', { name: 'Envie' });
            const dataUseConsentInput = getByTestId('data_use_consent');

            await act(async () => {
                fireEvent.click(dataUseConsentInput);
                fireEvent.click(button);
            });

            await waitFor(() => {
                expect(
                    queryAllByText(
                        'Você precisa estar de acordo com nossos termos'
                    ).length
                ).toBe(0);
            });
        });

        it('should not render a warning if tracking code is valid', async () => {
            const { getByTestId, getByRole, queryAllByText } = render(<Form />);
            const codeInput = getByTestId('code');
            const button = getByRole('button', { name: 'Envie' });

            await act(async () => {
                fireEvent.change(codeInput, {
                    target: { value: 'EB067313532GB' },
                });
            });

            await waitFor(() => {
                expect(codeInput).toHaveValue('EB067313532GB');
            });

            await act(async () => {
                fireEvent.click(button);
            });

            await waitFor(() => {
                expect(queryAllByText('Digite um código válido.').length).toBe(
                    0
                );
            });
        });
    });

    describe('With a codigo de rastreio', () => {
        it('renders a tracking code input', () => {
            const { getByPlaceholderText } = render(<Form />);

            expect(getByPlaceholderText('NC123445965BR')).toBeTruthy();
        });

        it('accepts a tracking code input', () => {
            const { getByPlaceholderText } = render(<Form />);
            const codeInput = getByPlaceholderText('NC123445965BR');

            fireEvent.focus(codeInput, { target: { value: 'EB067313532GB' } });
            expect(codeInput).toHaveValue('EB067313532GB');
        });
    });

    describe('With a reason', () => {
        it('renders a reason dropdown', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('reason')).toBeTruthy();
        });

        it('accepts a reason', () => {
            const { getByTestId } = render(<Form />);
            const selectReason = getByTestId('reason');
            fireEvent.change(selectReason, { target: { value: 'others' } });

            expect(selectReason).toHaveValue('others');
        });
    });

    describe('With an estimated amount', () => {
        it('renders a money input', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('value_in_real')).toBeTruthy();
        });

        it('accepts an amount', () => {
            const { getByTestId } = render(<Form />);
            const amountInput = getByTestId('value_in_real');
            fireEvent.change(amountInput, { target: { value: '100,34' } });

            expect(amountInput).toHaveValue('100,34');
        });
    });

    describe('With a country of origin', () => {
        it('renders a country dropdown', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('country_of_origin')).toBeTruthy();
        });

        it('accepts a country of origin', () => {
            const { getByTestId } = render(<Form />);
            const countryInput = getByTestId('country_of_origin');
            fireEvent.change(countryInput, {
                target: { value: 'Canadá' },
            });

            waitFor(() => {
                expect(countryInput).toHaveValue('Canadá');
            });
        });
    });

    describe('With a date_of_postage field group  ', () => {
        it('renders a date_of_postage day', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('dopDay')).toBeTruthy();
        });

        it('renders a date_of_postage month', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('dopMon')).toBeTruthy();
        });

        it('renders a date_of_postage year', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('dopYear')).toBeTruthy();
        });

        it('accepts a date_of_postage day', () => {
            const { getByTestId } = render(<Form />);
            const dayInput = getByTestId('dopDay');
            fireEvent.change(dayInput, { target: { value: '15' } });

            expect(dayInput).toHaveValue('15');
        });

        it('accepts a date_of_postage month', () => {
            const { getByTestId } = render(<Form />);
            const monthInput = getByTestId('dopMon');
            fireEvent.change(monthInput, { target: { value: '07' } });

            expect(monthInput).toHaveValue('07');
        });

        it('accepts a date_of_postage year', () => {
            const { getByTestId } = render(<Form />);
            const yearInput = getByTestId('dopYear');
            fireEvent.change(yearInput, { target: { value: '2023' } });

            expect(yearInput).toHaveValue('2023');
        });
    });

    describe('With a reimbursed checkbox', () => {
        it('renders a reimbursed checkbox', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('reimbursed')).toBeTruthy();
        });

        it('accepts a reimbursed check', () => {
            const { getByTestId } = render(<Form />);
            const reimbursedInput = getByTestId('reimbursed');
            fireEvent.click(reimbursedInput);

            expect(reimbursedInput).toBeChecked();
        });
    });

    describe('With a data_use_consent checkbox', () => {
        it('renders a data_use_consent checkbox', () => {
            const { getByTestId } = render(<Form />);

            expect(getByTestId('data_use_consent')).toBeTruthy();
        });

        it('accepts a data_use_consent check', () => {
            const { getByTestId } = render(<Form />);
            const dataUseConsentInput = getByTestId('data_use_consent');
            fireEvent.click(dataUseConsentInput);

            expect(dataUseConsentInput).toBeChecked();
        });
    });
});
