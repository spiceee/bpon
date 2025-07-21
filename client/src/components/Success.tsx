import React, { MouseEventHandler } from 'react';

type Props = {
    onClick: MouseEventHandler;
};

const Success: React.FunctionComponent<Props> = ({
    onClick,
}: {
    onClick: MouseEventHandler;
}) => {
    return (
        <div className="success">
            <h1>Informação gravada com sucesso!</h1>

            <button className="button" onClick={onClick}>
                Insira outro código
            </button>
        </div>
    );
};

export default Success;
