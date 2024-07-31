import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { updateTask } from '../../services/apiTasks';

const userId = '1';

export function useUpdateTask() {
  const { boardname: boardSlug } = useParams();
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateTaskMutation } = useMutation({
    mutationFn: async ({ taskId, subtasks, status }) =>
      updateTask({ taskId, subtasks, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`tasks-${userId}-${boardSlug}`],
      });
      toast.success('Task has been updated 🎉');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isUpdating, updateTaskMutation };
}
