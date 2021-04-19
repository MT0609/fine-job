const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const messageValidation = require('../../validations/message.validation');
const messageController = require('../../controllers/message.controller');

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
  .post(auth(), validate(messageValidation.createMessage), messageController.createMessage)
  .get(auth(), validate(messageValidation.getMessages), messageController.getMessages)
  .delete(auth(), validate(messageValidation.deleteMessage), messageController.deleteMessage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management and retrieval
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a message
 *     description: User can create other messages.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID_1
 *               - userID_2
 *               - message
 *             properties:
 *               userID_1:
 *                 type: string
 *                 description: User ID 1
 *               userID_2:
 *                 type: string
 *                 description: User ID 2
 *               message:
 *                 type: string
 *                 default: I love U
 *                 description: Message (null value for file upload)
 *
 *             example:
 *               userID_1: 607c03860737d93f141c575c
 *               userID_2: 607c03350737d93f141c5758
 *               message: I love U
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all message
 *     description: Get personal messages.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID_1
 *         schema:
 *           type: string
 *         description: User ID 1
 *       - in: query
 *         name: userID_2
 *         schema:
 *           type: string
 *         description: User ID 2
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of messages
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   delete:
 *     summary: Delete a message
 *     description: Users can delete own messages.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID_1
 *         schema:
 *           type: string
 *         description: User ID 1
 *       - in: query
 *         name: userID_2
 *         schema:
 *           type: string
 *         description: User ID 2
 *       - in: query
 *         name: msgID
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
