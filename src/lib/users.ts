
import type { User } from './types';
import { allUsers as data } from './data';

// This file now acts as an accessor to the central data store.
// In a real app, this would be where you fetch data from an API.

export const allUsers: User[] = data;
