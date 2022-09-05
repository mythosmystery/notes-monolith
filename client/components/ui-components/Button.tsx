import { HTMLMotionProps, motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
   return (
      <button
         className='border dark:border-active disabled:cursor-wait dark:text-foreground m-2 dark:hover:bg-active hover:bg-gray-200 p-3'
         {...props}
      >
         {props.children}
      </button>
   );
};

const Rounded: React.FC<HTMLMotionProps<'button'>> = props => {
   return (
      <motion.button
         whileTap={{ scale: 1.3, rotate: 90 }}
         whileHover={{ scale: 1.07 }}
         className='dark:bg-active disabled:cursor-wait bg-selection rounded-full m-2 p-2 shadow-md dark:hover:bg-foreground hover:bg-background dark:hover:text-accent hover:text-accent'
         {...props}
      >
         {props.children}
      </motion.button>
   );
};
export default Object.assign(Button, { Rounded });
