import { FC, InputHTMLAttributes } from 'react';

const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = props => {
   return (
      <input
         className="my-1 bg-transparent border-transparent dark:text-foreground focus:border-transparent focus:ring-transparent active:bg-transparent"
         {...props}
      />
   );
};
export default TextInput;
