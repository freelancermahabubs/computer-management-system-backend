import { Router } from 'express';

import { CategoryRoutes } from '../modules/Category/category.route';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { BrandRoutes } from '../modules/Brand/brand.route';
import { ComputerItemRoutes } from '../modules/ComputerItem/computerItem.route';
import { SalesRoutes } from '../modules/Sales/sales.route';
import { PurchaseRoutes } from '../modules/Purchase/purchase.route';


const router = Router();
const moduleRoutes = [
  { path: '/categories', route: CategoryRoutes },
  { path: '/brands', route: BrandRoutes },
  { path: '/items', route: ComputerItemRoutes },
  { path: '/sales', route: SalesRoutes },
  { path: '/purchase', route: PurchaseRoutes },
  { path: '/auth', route: AuthRoutes },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
