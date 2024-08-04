import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteBoard } from '../../services/apiBoard';
import { useAuthContext } from '../../contexts/AuthContext';

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const { authuser } = useAuthContext();
  const { _id: userId } = authuser;

  const { isPending: isDeleting, mutate: deleteBoardMuation } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries({
        queryKey: [`boards-${userId}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`${userId}-${board.slug}`],
      });

      toast.success('Board has been deleted successfully!');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isDeleting, deleteBoardMuation };
}
