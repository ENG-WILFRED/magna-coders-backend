import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  createContract,
  sendContract,
  acceptContract,
  declineContract,
  getContract,
  getContracts,
  pauseContract,
  resumeContract,
  createMilestone,
  updateMilestone,
  getMilestones,
  startMilestone,
  submitMilestone,
  getSubmissions,
  fundEscrow,
  fundCallback,
  releaseMilestone,
  getEscrowStatus,
  reviewMilestone,
  getReviews,
  createChangeRequest,
  acceptChangeRequest,
  rejectChangeRequest,
  cancelChangeRequest,
  getChangeRequests,
  createDispute,
  resolveDispute,
  getDisputes,
  getDispute,
  getContractActivity,
  getRecentActivity,
  adminReleaseFunds,
  adminAcceptFunds,
  adminPauseContract,
  adminResumeContract,
  adminCancelContract,
  getAdminContracts
} from '../controllers/contracts';

const router = Router();

router.use(authenticateToken);

// Contract endpoints
router.post('/', createContract);
router.post('/:id/send', sendContract);
router.post('/:id/accept', acceptContract);
router.post('/:id/decline', declineContract);
router.get('/:id', getContract);
router.get('/', getContracts);
router.post('/:id/pause', pauseContract);
router.post('/:id/resume', resumeContract);

// Milestone endpoints
router.post('/:id/milestones', createMilestone);
router.patch('/milestones/:id', updateMilestone);
router.get('/:id/milestones', getMilestones);
router.post('/milestones/:id/start', startMilestone);
router.post('/milestones/:id/submissions', submitMilestone);
router.get('/milestones/:id/submissions', getSubmissions);

// Escrow endpoints
router.post('/:id/escrow/fund', fundEscrow);
router.post('/escrow/fund/callback/:transaction_id', fundCallback);
router.post('/milestones/:id/release', releaseMilestone);
router.get('/:id/escrow', getEscrowStatus);

// Review endpoints
router.post('/milestones/:id/review', reviewMilestone);
router.get('/milestones/:id/reviews', getReviews);

// Change request endpoints
router.post('/:id/change-requests', createChangeRequest);
router.post('/change-requests/:id/accept', acceptChangeRequest);
router.post('/change-requests/:id/reject', rejectChangeRequest);
router.post('/change-requests/:id/cancel', cancelChangeRequest);
router.get('/:id/change-requests', getChangeRequests);

// Dispute endpoints
router.post('/:id/disputes', createDispute);
router.post('/disputes/:id/resolve', resolveDispute);
router.get('/:id/disputes', getDisputes);
router.get('/disputes/:id', getDispute);

// Activity log endpoints
router.get('/:id/activity', getContractActivity);
router.get('/activity/recent', getRecentActivity);

// Admin endpoints
router.post('/admin/release-funds', adminReleaseFunds);
router.post('/admin/accept-funds', adminAcceptFunds);
router.post('/admin/:id/pause', adminPauseContract);
router.post('/admin/:id/resume', adminResumeContract);
router.post('/admin/:id/cancel', adminCancelContract);
router.get('/admin/contracts', getAdminContracts);

export default router;