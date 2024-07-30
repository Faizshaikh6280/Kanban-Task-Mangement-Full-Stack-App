import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createColumn } from '../../services/apiColumn';
import { useParams } from 'react-router-dom';

const userId = '1';

export function useCreateBoard() {
  const { boardname: boardSlug } = useParams();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createColumnMutation } = useMutation({
    mutationFn: async ({ column, boardSlug }) =>
      createColumn({ column, boardSlug }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${boardSlug}`],
      });
      toast.success('Column has been created 🎉');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isCreating, createColumnMutation };
}
