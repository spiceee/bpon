import React from 'react';

const MoneyBadge: React.FC<{ amount?: string | null }> = ({
    amount = null,
}) => {
    const [total, setTotal] = React.useState<string | null>(amount);

    React.useEffect(() => {
        if (amount?.length) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch('./not_reimbursed_amount.json');
                const data = await response.json();
                if (data) {
                    const total = data.pop();
                    total?.total_value_not_reimbursed &&
                        setTotal(
                            Number(
                                total.total_value_not_reimbursed
                            ).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })
                        );
                }
            } catch (error) {
                console.error('Error fetching nodes:', error);
            }
        };
        fetchData();
    }, [amount]);

    return total && total?.length > 0 ? (
        <div className="price-badge" title="Total de despesas não reembolsadas">
            {total} perdidos 💸
        </div>
    ) : null;
};

export default MoneyBadge;
