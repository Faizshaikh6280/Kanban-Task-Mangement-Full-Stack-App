import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createBoard } from '../../services/apiBoard';
import { useAuthContext } from '../../contexts/AuthContext';

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const { authuser } = useAuthContext();
  const { _id: userId } = authuser;

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
      toast.error(error.response.data.error);
    },
  });

  return { isCreating, createBoardMutation };
}
