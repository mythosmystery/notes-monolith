import { HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FaPlus, FaSave } from 'react-icons/fa';
import Button from './Button';

const Note: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
   return (
      <div
         className='flex flex-col h-screen flex-grow bg-white dark:bg-background min-w-0 mb-10 mx-4 lg:mx-12 border-l border-t dark:border-background-secondary shadow-lg'
         {...props}
      >
         {props.children}
      </div>
   );
};

const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = props => {
   return (
      <textarea
         className='flex bg-transparent border-transparent dark:text-foreground focus:border-transparent focus:ring-transparent w-full h-full resize-none px-6 py-4'
         placeholder='Start writing your note...'
         {...props}
      ></textarea>
   );
};

const Title: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
   return (
      <input
         type='text'
         className='flex flex-grow bg-transparent overflow-ellipsis text-center text-3xl border-none focus:ring-transparent dark:text-purple'
         placeholder='Title'
         {...props}
      ></input>
   );
};

const Save: React.FC<HTMLMotionProps<'button'>> = props => {
   return (
      <Button.Rounded {...props}>
         <FaSave size='24' />
      </Button.Rounded>
   );
};

const New: React.FC<HTMLMotionProps<'button'>> = props => {
   return (
      <Button.Rounded {...props}>
         <FaPlus size='24' />
      </Button.Rounded>
   );
};

const ListItem: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
   return (
      <div
         className='flex flex-grow text-center dark:text-foreground bg-transparent hover:bg-selection cursor-pointer py-3 px-1 border-t dark:border-active w-full active:scale-110 active:shadow-md'
         {...props}
      >
         {props.children}
      </div>
   );
};
const SidePanel: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
   return (
      <div
         className='flex flex-col sm:w-1/4 bg-white dark:bg-background items-center border-t dark:border-foreground/20 shadow-md p-3'
         {...props}
      >
         <h2 className='dark:text-foreground my-2 text-xl py-0.5'>Saved Notes</h2>
         {props.children}
      </div>
   );
};

export default Object.assign(Note, { Textarea, Title, Save, ListItem, SidePanel, New });
