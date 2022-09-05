import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';

const variants = {
   hidden: { x: -500 },
   enter: { x: 0, y: 0 },
   exit: { x: 500 }
};

const Home: React.FC = () => {
   return (
      <motion.div
         initial='hidden'
         animate='enter'
         exit='exit'
         variants={variants}
         className='h-screen scrollbar-hide overflow-y-auto'
      >
         <Head>
            <title>Login or Sign Up</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <div className='text-center dark:text-foreground pt-16'>
            <h1 className='text-4xl'>Welcome to TypeNotes</h1>
            <h2 className='text-lg my-4'>Register or Login to begin!</h2>
         </div>
         <AnimatePresence>
            <div className='flex flex-col md:flex-row mx-4 md:mx-0 justify-center gap-12 py-8'>
               <LoginForm />
               <RegisterForm />
            </div>
         </AnimatePresence>
      </motion.div>
   );
};
export default Home;
