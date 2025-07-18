import React from 'react';
import Form from '../components/Form';
import LineChartGraph from '../components/ui/LineChartGraph';

const Home: React.FC = () => {
    return (
        <>
            <div className="wrapper envelope">
                <Form />
                <LineChartGraph />
            </div>
        </>
    );
};

export default Home;
