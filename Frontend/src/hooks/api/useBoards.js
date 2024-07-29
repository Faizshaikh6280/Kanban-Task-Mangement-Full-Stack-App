import { useQuery } from '@tanstack/react-query';
import { getAllBoards, getBoard } from '../../services/apiBoard';

export function useBoards(userId) {
  const {
    isLoading,
    data: boards,
    error,
  } = useQuery({
    queryKey: [`boards-${userId}`],
    queryFn: async () => getAllBoards(userId),
  });

  return { isLoading, boards, error };
}
