import { FC, HTMLAttributes } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorCard: FC<HTMLAttributes<HTMLDivElement>> = props => {
   return (
      <div className="flex text-orange text-center justify-center" {...props}>
         <BiErrorCircle size="20" className="mr-1" />
         {props.children}
      </div>
   );
};
export default ErrorCard;
