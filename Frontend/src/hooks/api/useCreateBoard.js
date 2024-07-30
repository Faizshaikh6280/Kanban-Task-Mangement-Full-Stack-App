import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { createBoard } from '../../services/apiBoard';

const userId = '1';

export function useCreateBoard() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBoardMutation } = useMutation({
    mutationFn: async ({ name, columnsData, userId }) =>
      createBoard({ name, columnsData, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`boards-${userId}`],
      });
      toast.success('Board has been created 🎉');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isCreating, createBoardMutation };
}
