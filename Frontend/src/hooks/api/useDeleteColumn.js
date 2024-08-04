import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteColumn } from '../../services/apiColumn';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export function useDeleteColumn() {
  const { boardname: boardSlug } = useParams();
  const queryClient = useQueryClient();
  const { authuser } = useAuthContext();
  const { _id: userId } = authuser;
  const { isPending: isDeleting, mutate: deleteColumnMutation } = useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${userId}-${boardSlug}`],
      });
      toast.success('Column has been deleted successfully!!');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isDeleting, deleteColumnMutation };
}
