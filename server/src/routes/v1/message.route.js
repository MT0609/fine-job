const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { senderInTwoUser } = require('../../middlewares/message');
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
  .get(auth(), validate(messageValidation.getListUserMessages), messageController.getListUserMessages)
  .post(auth(), validate(messageValidation.createMessage), messageController.createMessage);

router
  .route('/:partnerID')
  .get(auth(), validate(messageValidation.getMessages), messageController.getMessages)
  .delete(auth(), validate(messageValidation.deleteConversation), messageController.deleteConversation);

router
  .route('/:partnerID/:msgID')
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
 *   get:
 *     summary: Get list user messages
 *     description: Get list user personal messages.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *               - partnerID
 *               - message
 *             properties:
 *               partnerID:
 *                 type: string
 *                 description: Partner ID
 *               message:
 *                 type: string
 *                 default: I love U
 *                 description: Message (null value for file upload)
 *
 *             example:
 *               partnerID: 607c03860737d93f141c575c
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
 */

/**
 * @swagger
 * /messages/{partnerID}:
 *   get:
 *     summary: Get a conversation
 *     description: Users can get own conversations.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: partnerID
 *         schema:
 *           type: string
 *         description: Partner ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Messages'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a conversation
 *     description: Users can delete own conversations.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: partnerID
 *         schema:
 *           type: string
 *         description: Partner ID
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

/**
 * @swagger
 * /messages/{partnerID}/{msgID}:
 *   delete:
 *     summary: Delete a message
 *     description: Users can delete own conversations.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: partnerID
 *         schema:
 *           type: string
 *         description: Partner ID
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
