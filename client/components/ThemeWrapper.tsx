import { FC, useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Button from './ui-components/Button';
import { ThemeContext, ThemeContextType } from '../utils/ThemeContext';
import { motion } from 'framer-motion';

const ThemeWrapper: FC = ({ children }) => {
   const { dark, toggleDark } = useContext(ThemeContext) as ThemeContextType;
   return (
      <div className={dark ? 'dark' : ''}>
         <div className='dark:bg-background font-mono min-h-screen bg-gray-200 overflow-hidden'>
            <motion.div initial={{ translateY: -200 }} animate={{ translateY: 0 }} className='absolute'>
               <Button.Rounded onClick={toggleDark}>{dark ? <FaSun size='22' /> : <FaMoon size='22' />}</Button.Rounded>
            </motion.div>
            {children}
         </div>
      </div>
   );
};
export default ThemeWrapper;
