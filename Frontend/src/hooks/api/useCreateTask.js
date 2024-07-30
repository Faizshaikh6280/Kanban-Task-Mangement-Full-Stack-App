import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createTask } from '../../services/apiTasks';
import { useParams } from 'react-router-dom';

const userId = '1';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { boardname } = useParams();

  const { isPending: isCreating, mutate: createTaskMutation } = useMutation({
    mutationFn: async ({
      title,
      description,
      status,
      userId,
      boardSlug,
      subtasks,
    }) =>
      createTask({ title, description, status, userId, boardSlug, subtasks }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`tasks-${userId}-${boardname}`],
      });
      toast.success('Task has been created 🎉');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isCreating, createTaskMutation };
}
