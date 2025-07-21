import React from 'react';
import Form from '../components/Form';
import LineChartGraph from '../components/ui/LineChartGraph';
import MoneyBadge from '../components/ui/MoneyBadge';

const Home: React.FC = () => {
    return (
        <main>
            <Form />
            <LineChartGraph />
            <MoneyBadge />
        </main>
    );
};

export default Home;
