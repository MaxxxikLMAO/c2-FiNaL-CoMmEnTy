import {User} from './user.interface';

export interface UsersList {
  page: number;
  page_count: number;
  users: User[];
}
