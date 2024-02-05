import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

const formStates = Object.freeze({
   SUCCESS: 'SUCCESS',
   INITIAL: 'INITIAL',
   REQUESTING: 'REQUESTING',
   ERROR: 'ERROR',
   ERROR_BAD_RECAPTCHA: 'ERROR_BAD_RECAPTCHA',
})

const DEFAULT = ''

const Form: React.FC = () => {
   const [formState, setFormState] = useState(formStates.INITIAL)
   const {
      handleSubmit,
      setValue,
      reset,
      watch,
      formState: { errors },
   } = useForm({
      defaultValues: {
         code: DEFAULT,
         reason: DEFAULT,
         country_of_origin: DEFAULT,
         date_of_postage: DEFAULT,
         value_in_real: null,
         reimbursed: null,
      },
   })

   const onSubmit = async (formData: any) => {}

   return <form onSubmit={handleSubmit(onSubmit)}></form>
}

export default Form
