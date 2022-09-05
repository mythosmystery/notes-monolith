import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteNoteMutation } from '../generated/graphql';

interface Props {
   noteId: string;
   refetch: () => void;
   reset: () => void;
}

const DeleteButton: FC<Props> = ({ noteId, refetch, reset }) => {
   const [deleteNote] = useDeleteNoteMutation();

   const handleDelete = async () => {
      await deleteNote({ variables: { id: noteId } });
      refetch();
      reset();
   };
   return (
      <button
         onClick={handleDelete}
         type='reset'
         className='p-3 hover:text-orange text-foreground hover:bg-selection active:scale-125 active:shadow-lg'
      >
         <FaTrash />
      </button>
   );
};
export default DeleteButton;
