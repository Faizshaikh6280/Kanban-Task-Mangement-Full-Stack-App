import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../../services/apiBoard';

export function useBoard(slug) {
  const {
    isLoading,
    data: board,
    error,
  } = useQuery({
    queryKey: [`${slug}`],
    queryFn: async () => getBoard(slug),
  });

  return { isLoading, board, error };
}
