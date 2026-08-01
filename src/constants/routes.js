import { ROLES } from './roles';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PORTAL: '/portal',
  ADMIN: '/admin',
  NOT_FOUND: '/404',
};

export const ROLE_DEFAULT_ROUTE = {
  [ROLES.STUDENT]: ROUTES.DASHBOARD,
  [ROLES.INSTRUCTOR]: ROUTES.PORTAL,
  [ROLES.ADMIN]: ROUTES.ADMIN,
};
