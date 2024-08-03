import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { login } from '../../services/apiAuth';

export function useLogin() {
  const { isPending: isLoging, mutate: loginMutation } = useMutation({
    mutationFn: async ({ username, password }) => login({ username, password }),
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.username.split(' ')[0]} 👋`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isLoging, loginMutation };
}
