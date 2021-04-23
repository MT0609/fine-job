const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const notificationValidation = require('../../validations/notification.validation');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router();

// Multer upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const upload = require('../../config/multer');
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'backgroundAvt', maxCount: 1 },
  { name: 'photos', maxCount: 8 },
]);

router
  .route('/')
  .post(auth(), validate(notificationValidation.createNotification), notificationController.createNotification);

router
  .route('/:notificationID')
  .get(validate(notificationValidation.getNotification), notificationController.getNotification);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management create and retrieve
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a notification
 *     description: Users can create other notifications.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ['sendConnReq', 'acceptConnReq', 'postJob', 'closeJob', 'applyJob', 'followCompany']
 *                 description: Notification type
 *               url:
 *                 type: string
 *                 format: url
 *                 description: Job name
 *               params:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Job type
 *             example:
 *               type: applyJob
 *               url: https://fb.com/quocthai.user
 *               params:
 *                 senderID: 607daf4a4543f12398c118a5
 *                 recvID: 607db0ca4543f12398c118ad
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Notification'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a notification
 *     description: Get information of the notification.
 *     tags: [Notifications]
 *     security:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Notification'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
