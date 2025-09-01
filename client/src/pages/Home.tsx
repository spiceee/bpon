import React from 'react';
import Form from '../components/Form';
import LineChartGraph from '../components/ui/LineChartGraph';
import MoneyBadge from '../components/ui/MoneyBadge';

const Home: React.FC<{ moneyBadgeAmount?: string | null }> = ({
    moneyBadgeAmount = null,
}) => {
    return (
        <main>
            <Form />
            <LineChartGraph />
            <MoneyBadge amount={moneyBadgeAmount} />
        </main>
    );
};

export default Home;
