import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createColumn } from '../../services/apiColumn';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export function useCreateColumn() {
  const { boardname: boardSlug } = useParams();
  const queryClient = useQueryClient();
  const { authuser } = useAuthContext();
  const { _id: userId } = authuser;
  const { isPending: isCreating, mutate: createColumnMutation } = useMutation({
    mutationFn: async (column) => createColumn({ column, boardSlug, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${userId}-${boardSlug}`],
      });
      toast.success('Column has been created 🎉');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isCreating, createColumnMutation };
}
