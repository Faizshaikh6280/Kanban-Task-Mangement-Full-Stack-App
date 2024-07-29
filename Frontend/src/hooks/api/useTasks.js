import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '../../services/apiTasks';
import { useParams } from 'react-router-dom';

export function useTasks(userId) {
  const { boardname: boardSlug } = useParams();
  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: [`tasks-${userId}-${boardSlug}`],
    queryFn: async () => getAllTasks(userId, boardSlug),
  });

  return { isLoading, tasks, error };
}
