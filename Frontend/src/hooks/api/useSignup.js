import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signup } from '../../services/apiAuth';

export function useSignup() {
  const { isPending: isSigning, mutate: signupMutation } = useMutation({
    mutationFn: async ({ username, password, email }) =>
      signup({ username, password, email }),
    onSuccess: (user) => {
      toast.success(`Welcome, ${user.username.split(' ')[0]} 👋`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isSigning, signupMutation };
}
