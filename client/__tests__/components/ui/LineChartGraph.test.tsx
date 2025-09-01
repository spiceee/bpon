import * as React from 'react';

import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import '@testing-library/jest-dom';

import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';

import LineChartGraph from '../../../src/components/ui/LineChartGraph';

enableFetchMocks();

describe('LineChartGraph', () => {
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

    it('should render', () => {
        const { container } = render(<LineChartGraph />);
        expect(container).toBeTruthy();
    });
});
