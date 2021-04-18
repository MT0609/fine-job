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
  .post(validate(messageValidation.createMessage), messageController.createMessage)
  .get(validate(messageValidation.getMessage), messageController.getMessages);

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
 *               - sender
 *               - receiver
 *               - type
 *             properties:
 *               sender:
 *                 type: string
 *                 description: Sender ID
 *               receiver:
 *                 type: string
 *                 description: Receiver ID
 *               message:
 *                 type: string
 *                 description: Message (null value for file upload)
 *
 *             example:
 *               sender: 6079d3b5bee9390730603276
 *               receiver: 6079d3b5bee9390730603276
 *               message: I lov U
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
 *         name: sender
 *         schema:
 *           type: string
 *         description: Job name
 *       - in: query
 *         name: receiver
 *         schema:
 *           type: string
 *         description: Job name
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
 *               type: object
 *               properties:
 *                 results:
 *                   type: object
 *                   properties:
 *                     $ref: '#/components/schemas/Message'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
