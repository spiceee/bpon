import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    DEFAULT,
    COUNTRIES,
    DAYS,
    MONTHS,
    YEARS,
    REASONS,
} from '../utils/constants';

const formStates = Object.freeze({
    SUCCESS: 'SUCCESS',
    INITIAL: 'INITIAL',
    REQUESTING: 'REQUESTING',
    ERROR: 'ERROR',
    ERROR_BAD_RECAPTCHA: 'ERROR_BAD_RECAPTCHA',
});

const Form: React.FC = () => {
    const [formState, setFormState] = useState(formStates.INITIAL);
    const {
        handleSubmit,
        setValue,
        reset,
        watch,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            code: '',
            reason: REASONS[0].code,
            country_of_origin: DEFAULT,
            date_of_postage: DEFAULT,
            dopMon: DEFAULT,
            dopDay: DEFAULT,
            dopYear: DEFAULT,
            value_in_real: null,
            reimbursed: null,
        },
    });

    const onSubmit = async (formData: any) => {
        console.log(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Informe sobre sua correspondência:</h2>

                <div className="requiredFields">
                    <div className="inputWrapper">
                        <label htmlFor="code">Código de rastreio*</label>
                        <input
                            {...register('code', {
                                required: true,
                                pattern: /[0-9A-Za-z]+/,
                            })}
                            id="code"
                            type="text"
                            placeholder="NC123445965BR"
                            maxLength={13}
                        />
                        <div className="error"></div>
                    </div>

                    <div className="inputWrapper">
                        <label htmlFor="reason">Razão da devolução</label>
                        <select
                            {...register('reason', {
                                required: false,
                            })}
                            id="reason"
                        >
                            {REASONS.map(reason => (
                                <option value={reason.code} key={reason.code}>
                                    {reason.reasonPtBr}
                                </option>
                            ))}
                        </select>
                        <div className="error"></div>
                    </div>
                </div>

                <div className="optionalFields">
                    <div className="inputWrapper">
                        <label htmlFor="value_in_real">
                            Valor estimado total em Reais R$
                        </label>
                        <input
                            {...register('value_in_real', {
                                required: false,
                                pattern: /[0-9,\\.]+/,
                            })}
                            id="value_in_real"
                            type="text"
                            placeholder="89,39"
                        />
                        <div className="error"></div>
                    </div>

                    <div className="inputWrapper">
                        <label htmlFor="country_of_origin">
                            País de origem
                        </label>
                        <select
                            {...register('country_of_origin', {
                                required: false,
                            })}
                            defaultValue={DEFAULT}
                            id="country_of_origin"
                        >
                            {COUNTRIES.map(country => (
                                <option value={country.code} key={country.code}>
                                    {country.namePtBr}
                                </option>
                            ))}
                        </select>
                        <div className="error"></div>
                    </div>

                    <div className="date_of_postage_wrapper">
                        <div className="inputWrapper">
                            <label htmlFor="dopDay">
                                Data aproximada da postagem
                            </label>
                            <div>
                                <select
                                    {...register('dopDay')}
                                    defaultValue={DEFAULT}
                                    id="dopDay"
                                >
                                    <option value={DEFAULT} disabled hidden>
                                        DD
                                    </option>
                                    {DAYS.map((day, idx) => (
                                        <option value={day} key={`day${idx}`}>
                                            {day}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    {...register('dopMon')}
                                    defaultValue={DEFAULT}
                                >
                                    <option value={DEFAULT} disabled hidden>
                                        MM
                                    </option>
                                    {MONTHS.map((mon, idx) => (
                                        <option value={mon} key={`mon${idx}`}>
                                            {mon}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    {...register('dopYear')}
                                    defaultValue={DEFAULT}
                                >
                                    <option value={DEFAULT} disabled hidden>
                                        AAAA
                                    </option>
                                    {YEARS.map((year, idx) => (
                                        <option value={year} key={`year${idx}`}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="reimbursed">
                            Conseguiu reembolso do valor total?
                        </label>
                        <input
                            id="reimbursed"
                            {...register('reimbursed', {
                                required: false,
                            })}
                            type="checkbox"
                            value="reimbursed"
                        />
                        <div className="error"></div>
                    </div>
                </div>

                <button className="button">Envie</button>
            </form>
        </>
    );
};

export default Form;
