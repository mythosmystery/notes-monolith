import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useLoginMutation } from '../../generated/graphql';
import TextInput from '../ui-components/TextInput';
import ErrorCard from '../ErrorCard';
import { motion } from 'framer-motion';
import { useAuth } from '../../utils/auth';

interface FormValues {
   email: string;
   password: string;
}

const LoginForm: FC = () => {
   const { signIn } = useAuth();
   const router = useRouter();
   const [login] = useLoginMutation();

   const onSubmit = async (
      values: FormValues,
      { setSubmitting, setErrors, validateForm }: FormikHelpers<FormValues>
   ) => {
      validateForm();
      try {
         const { data } = await login({ variables: { ...values } });
         if (data?.login) {
            signIn(data.login.token);
            setSubmitting(false);
            router.push('/notes');
         }
      } catch (err) {
         console.error(err);
         setErrors({ password: 'Incorrect email or password' });
      }
   };

   const validate = ({ email, password }: FormValues) => {
      const errors = {} as FormValues;
      if (!email) {
         errors.email = 'Please enter your email';
      } else if (!password) {
         errors.password = 'Please enter your password';
      }
      return errors;
   };

   return (
      <Formik initialValues={{ email: '', password: '' } as FormValues} onSubmit={onSubmit} validate={validate}>
         {({ isSubmitting, isValid }) => (
            <Form>
               <motion.div
                  initial={{ x: -500 }}
                  animate={{ x: 0 }}
                  exit={{ x: 500 }}
                  className='flex flex-col dark:bg-background-secondary bg-white shadow-md p-2'
               >
                  <Field as={TextInput} type='email' name='email' placeholder='email...' />
                  <ErrorMessage component={ErrorCard} name='email' />
                  <Field as={TextInput} type='password' name='password' placeholder='password...' />
                  <ErrorMessage component={ErrorCard} name='password' />
                  <motion.button
                     whileTap={{ y: 7 }}
                     type='submit'
                     disabled={isSubmitting || !isValid}
                     className='p-1 disabled:cursor-wait dark:disabled:hover:text-disabled dark:hover:text-accent hover:text-background dark:text-foreground text-lg '
                  >
                     Login
                  </motion.button>
               </motion.div>
            </Form>
         )}
      </Formik>
   );
};
export default LoginForm;
