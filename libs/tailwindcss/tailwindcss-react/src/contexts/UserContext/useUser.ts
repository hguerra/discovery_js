import { useContext } from 'react';
import { UserContext } from '.';

export default function useUser() {
  return useContext(UserContext);
}
