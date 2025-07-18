import React from 'react';
import { IMaskInput } from 'react-imask';

import type { UseFormReturn } from 'react-hook-form';

const MASK_OPTIONS = {
    mask: 'R$ num',
    blocks: {
        num: {
            unmask: true,
            mask: Number,
            thousandsSeparator: '.',
            radix: ',',
            mapToRadix: [','],
            scale: 2,
            min: 0,
            max: 999999.99,
            placeholderChar: '0',
        },
    },
};

type MoneyProps = {
    fieldName: string;
    register: UseFormReturn['register'];
    setValue: UseFormReturn['setValue'];
};

const Time: React.FC<MoneyProps> = ({
    fieldName,
    register,
    setValue,
}: MoneyProps) => {
    const { ref, ...rest } = register(fieldName);

    return (
        <div>
            <IMaskInput
                {...rest}
                {...MASK_OPTIONS}
                inputRef={ref}
                onAccept={value => {
                    setValue(fieldName, value);
                }}
            />
        </div>
    );
};

export default Time;
