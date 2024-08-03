import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../../services/apiBoard';
import { useAuthContext } from '../../contexts/AuthContext';

export function useBoard(slug) {
  const { authuser } = useAuthContext();
  const { _id: userId } = authuser;
  const {
    isLoading,
    data: board,
    error,
  } = useQuery({
    queryKey: [`${userId}-${slug}`],
    queryFn: async () => getBoard(slug, userId),
  });

  return { isLoading, board, error };
}
