import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import Note from '../components/ui-components/Note';
import { GetMeDocument, useGetMeQuery, useUpdateNoteMutation, useWriteNoteMutation } from '../generated/graphql';
import LogoutButton from '../components/LogoutButton';
import ErrorCard from '../components/ErrorCard';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ConfirmModal } from '../components/ui-components/modal/ConfirmModal';
import { useRouter } from 'next/router';

interface NoteFormValues {
   id?: string;
   title: string;
   body: string;
}

const variants = {
   hidden: { x: 500 },
   enter: { x: 0, y: 0 },
   exit: { x: -500 }
};

export default function Notes() {
   const { data, error, refetch } = useGetMeQuery();

   const [writeNote] = useWriteNoteMutation();
   const [updateNote] = useUpdateNoteMutation();

   const [showModal, setShowModal] = useState(false);

   const router = useRouter();

   const initialValues: NoteFormValues = { title: '', body: '', id: '' };

   const onSubmit = async (
      values: NoteFormValues,
      { setSubmitting, setValues, validateForm }: FormikHelpers<NoteFormValues>
   ) => {
      validateForm();
      if (!values.id) {
         const { data } = await writeNote({ variables: { ...values }, refetchQueries: [GetMeDocument, 'getMe'] });
         if (data) {
            setValues({
               id: data.writeNote.id,
               title: data.writeNote.title,
               body: data.writeNote.body
            });
         }
      } else {
         await updateNote({
            variables: {
               data: {
                  body: values.body,
                  title: values.title
               },
               id: values.id
            }
         });
      }
      setSubmitting(false);
   };

   const validate = (values: NoteFormValues): FormikErrors<NoteFormValues> => {
      const errors = {} as FormikErrors<NoteFormValues>;
      if (!values.title) {
         errors.title = 'Please enter a title for your note';
      } else if (!values.body) {
         errors.body = 'Enter some text in the note';
      }
      return errors;
   };

   const resetLogic = (resetForm: () => void, values: NoteFormValues) => {
      console.log('reset clicked');
      if ((values.title || values.body) && !values.id) {
         setShowModal(true);
      } else {
         resetForm();
      }
   };
   if (error || (!data?.me && data)) {
      console.log(error);
      router.push('/');
   }

   return (
      <motion.main variants={variants} initial='hidden' animate='enter' exit='exit'>
         <Head>
            <title>My Notes</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <h1 className='dark:text-accent text-blue-400 text-center py-8 text-4xl'>{data?.me?.firstName}'s Notes</h1>
         <LogoutButton />

         <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            {({ isSubmitting, setValues, resetForm, isValid, values }) => (
               <>
                  <ConfirmModal
                     text='Are you sure you want to lose this note?'
                     show={showModal}
                     handleClose={() => setShowModal(false)}
                     callback={() => {
                        resetForm();
                        setShowModal(false);
                     }}
                  />

                  <div className='flex flex-col-reverse sm:flex-row h-full'>
                     <Note.SidePanel>
                        {data?.me?.notes.map((note, i) => {
                           return (
                              <div className='flex w-full' key={i}>
                                 <Note.ListItem
                                    key={note.id}
                                    onClick={() => {
                                       setValues({ id: note.id, title: note.title, body: note.body });
                                    }}
                                 >
                                    {note.title}
                                 </Note.ListItem>
                                 <DeleteButton key={i} noteId={note.id} refetch={refetch} reset={resetForm} />
                              </div>
                           );
                        })}
                     </Note.SidePanel>
                     <Note>
                        <Form className='flex flex-col h-full'>
                           <div className='flex flex-row justify-center'>
                              <Note.New type='button' onClick={() => resetLogic(resetForm, values)} />
                              <div className='flex flex-grow justify-end'>
                                 <Note.Save type='submit' disabled={isSubmitting || !isValid} />
                              </div>
                           </div>
                           <div className='flex flex-col justify-center h-full'>
                              <ErrorMessage name='title' component={ErrorCard} />
                              <ErrorMessage name='body' component={ErrorCard} />
                              <Field as={Note.Title} name='title' />
                              <Field as={Note.Textarea} name='body' />
                           </div>
                        </Form>
                     </Note>
                  </div>
               </>
            )}
         </Formik>
         <div className='h-8 mt-2.5 text-center dark:text-foreground'>Hunter Barton, 2021</div>
      </motion.main>
   );
}
