const express = require('express');
const validate = require('../../middlewares/validate');
const universityValidation = require('../../validations/university.validation');
const universityController = require('../../controllers/university.controller');

const router = express.Router();

router.route('/search').get(validate(universityValidation.getUniversities), universityController.getUniversities);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Universities
 *   description: University management and retrieval
 */

/**
 * @swagger
 * /universities/search:
 *   get:
 *     summary: Get all Universities
 *     description: Only admins can retrieve all Universities.
 *     tags: [Universities]
 *     security:
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Key word
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
 *         description: Maximum number of companies
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/University'
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
