import { User } from '@/components/features/users-table/users-table';

export const userData: User[] = new Array(100).fill(0).map((_, i) => {
  const id = i + 1;
  return {
    id: String(id),
    email: `userasdfsadf${id}@gmail.com`,
    username: `user${id}`,
    createdAt: 'Wed Oct 16 2024',
  };
});
