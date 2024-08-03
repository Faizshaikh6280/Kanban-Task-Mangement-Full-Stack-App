import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../services/apiAuth';

export function useLogout() {
  const { isLoading: isLogingout, mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logout successfully 🙌');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.error);
    },
  });

  return { isLogingout, logoutMutation };
}
