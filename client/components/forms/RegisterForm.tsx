import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { useAuth } from '../../utils/auth';
import ErrorCard from '../ErrorCard';
import TextInput from '../ui-components/TextInput';

interface FormValues {
   email: string;
   firstName: string;
   lastName: string;
   password: string;
   confirmPassword: string;
}

const RegisterForm: FC = () => {
   const { signIn } = useAuth();
   const [register] = useRegisterMutation();
   const router = useRouter();

   const validate = (values: FormValues): FormikErrors<FormValues> => {
      const errors = {} as FormikErrors<FormValues>;
      if (values.confirmPassword != values.password) {
         errors.confirmPassword = 'Passwords must match';
      }
      if (!values.email) {
         errors.email = 'Please enter your email';
      }
      if (!values.password) {
         errors.password = 'Please enter your password';
      }
      if (!values.confirmPassword) {
         errors.confirmPassword = 'Please reenter your password';
      }
      return errors;
   };

   const onSubmit = async (
      values: FormValues,
      { setSubmitting, setErrors, validateForm }: FormikHelpers<FormValues>
   ) => {
      validateForm();
      try {
         const { data } = await register({
            variables: {
               email: values.email,
               firstName: values.firstName,
               lastName: values.firstName,
               password: values.password
            }
         });
         if (data?.register) {
            signIn(data.register.token);
            router.push('/notes');
            setSubmitting(false);
         }
      } catch (err) {
         console.error(err);
         setErrors({ email: 'Account already exists, please log in' });
      }
   };

   return (
      <Formik
         initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' } as FormValues}
         onSubmit={onSubmit}
         validate={validate}
         validateOnChange={true}
      >
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
                  <Field as={TextInput} type='text' name='firstName' placeholder='first name...' />
                  <Field as={TextInput} type='text' name='lastName' placeholder='last name...' />
                  <Field as={TextInput} type='password' name='password' placeholder='password...' />
                  <ErrorMessage name='password' component={ErrorCard} />
                  <Field as={TextInput} type='password' name='confirmPassword' placeholder='confirm password...' />
                  <ErrorMessage name='confirmPassword' component={ErrorCard} />
                  <motion.button
                     whileTap={{ y: 7 }}
                     type='submit'
                     disabled={isSubmitting || !isValid}
                     className='p-1 disabled:cursor-wait dark:disabled:hover:text-disabled disabled:hover:text-disabled dark:hover:text-accent hover:text-background dark:text-foreground text-lg '
                  >
                     Register
                  </motion.button>
               </motion.div>
            </Form>
         )}
      </Formik>
   );
};
export default RegisterForm;
