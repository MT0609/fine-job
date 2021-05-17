const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subscriptionValidation = require('../../validations/subscription.validation');
const subscriptionController = require('../../controllers/subscription.controller.js');

const router = express.Router();

router.route('/').post(validate(subscriptionValidation.createSubscription), subscriptionController.createSubscription);
//.get(validate(subscriptionValidation.getSubscriptions), subscriptionController.getSubscriptions);

router.route('/:subscriptionID');
//.get(validate(subscriptionValidation.getSubscription), subscriptionController.getSubscription)
//.delete(auth(), validate(subscriptionValidation.deleteSubscription), subscriptionController.deleteSubscription);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management and retrieval
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a subscription
 *     description: Users can create other subscriptions.
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *     deprecated: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subscription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
