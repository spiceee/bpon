import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    DEFAULT,
    COUNTRIES,
    DAYS,
    MONTHS,
    YEARS,
    REASONS,
    PUBLIC_CAPTCHA_SITE_KEY,
} from '../utils/constants';

import Money from './ui/Money';

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
        getValues,
        reset,
        watch,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            code: '',
            cf_challenge: '',
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

    const submitPayload = useCallback(async formData => {
        const result = await fetch('./codes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cf_challenge: formData.cf_challenge,
                tracking_code: {
                    code: formData.code,
                    reason: formData.reason,
                    country_of_origin: formData.reason,
                    date_of_postage: formData.date_of_postage ?? null,
                    value_in_real:
                        formData?.value_in_real &&
                        parseInt(
                            formData.value_in_real.replace(/^R\$(\s?)/, '')
                        ),
                    reimbursed: formData.reimbursed ?? false,
                },
            }),
        });

        const body = await result.json();
        return body;
    }, []);

    register('cf_challenge');
    // watch('cf_challenge');
    watch('value_in_real');

    const setCFToken = () => {
        const token =
            document
                .getElementsByClassName('cf-turnstile')?.[0]
                ?.getAttribute('data-sitekey') || '';

        console.log('token', token);
        setValue('cf_challenge', token);
    };

    const onSubmit = async (formData: any) => {
        setCFToken();
        const values = getValues(['dopDay', 'dopMon', 'dopYear']);

        values.every(values => values !== DEFAULT) &&
            setValue(
                'date_of_postage',
                new Date(
                    `${formData.dopYear}-${formData.dopMon}-${formData.dopDay}`
                ).toISOString()
            );

        const amount =
            formData?.value_in_real?.replace(/\./g, '')?.replace(/,/g, '.') ||
            '';
        amount && setValue('value_in_real', amount);

        await submitPayload(getValues());
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="requiredFields">
                    <h1>Contribua com informação sobre sua encomenda:</h1>

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
                        <div className="notes">O código tem 13 caracteres.</div>
                        <div className="error"></div>
                    </div>

                    <div className="inputWrapper">
                        <label htmlFor="reason">Razão da devolução*</label>
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
                        <div className="notes">
                            Selecione OUTRAS casa tenha dúvida
                        </div>
                        <div className="error"></div>
                    </div>
                </div>

                <div className="optionalFields">
                    <div className="inputWrapper">
                        <label htmlFor="value_in_real">
                            Valor estimado total em Reais R$
                        </label>
                        <Money
                            register={register}
                            setValue={setValue}
                            fieldName="value_in_real"
                        />
                        <div className="notes">
                            Usaremos essa informação para calcular o prejuízo
                            total
                        </div>
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
                        <div className="notes">
                            Usaremos essa informação para calcular a quantidade
                            de poluição que a devolução causou ao planeta
                        </div>
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
                            value="true"
                        />
                        <div className="error"></div>
                        <div className="notes">
                            Clique caso tenha conseguido reaver seu dinheiro
                        </div>
                    </div>
                </div>

                <button className="button">Envie</button>
            </form>
        </>
    );
};

export default Form;
