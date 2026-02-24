import { Router } from 'express';
import { WalletController, PackageController, StoreController, AdminController } from '../controllers/coins';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Wallet routes
router.get('/wallet', WalletController.getWallet);
router.get('/wallet/transactions', WalletController.getTransactionHistory);

// Package routes
router.get('/packages', PackageController.getPackages);
router.post('/packages/order', PackageController.createOrder);
router.get('/packages/orders', PackageController.getOrders);
router.get('/packages/orders/:order_id', PackageController.getOrderById);
router.post('/packages/orders/:order_id/callback', PackageController.handlePaymentCallback);

// Store routes
router.get('/store', StoreController.getStoreItems);
router.post('/store/purchase', StoreController.purchaseItem);
router.get('/store/entitlements', StoreController.getEntitlements);
router.get('/store/entitlements/:item_type', StoreController.checkEntitlement);

// Admin routes - require admin role (to be implemented with role middleware)
router.get('/admin/platform-fees', AdminController.getPlatformFees);
router.get('/admin/platform-fees/stats', AdminController.getPlatformFeesStats);
router.get('/admin/actions', AdminController.getAdminActions);
router.get('/admin/calculate-fee', AdminController.calculateFee);

// Admin wallet management
router.post('/admin/wallet/:user_id/freeze', WalletController.freezeWallet);
router.post('/admin/wallet/:user_id/unfreeze', WalletController.unfreezeWallet);

// Admin package management
router.post('/admin/packages', PackageController.createPackage);
router.patch('/admin/packages/:package_id', PackageController.updatePackage);

// Admin store management
router.post('/admin/store', StoreController.createStoreItem);
router.patch('/admin/store/:item_id', StoreController.updateStoreItem);

export default router;