const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require('../../validations/company.validation');
const companyController = require('../../controllers/company.controller');

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
  .post(validate(companyValidation.createCompany), companyController.createCompany)
  .get(validate(companyValidation.getCompanies), companyController.getCompanies);

router
  .route('/:companyID')
  .get(auth('getUsers'), validate(companyValidation.getCompany), companyController.getCompany)
  .patch(cpUpload, validate(companyValidation.updateCompany), companyController.updateCompany)
  .delete(auth('manageUsers'), validate(companyValidation.deleteCompany), companyController.deleteCompany);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management and retrieval
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a company
 *     description: Only admins can create other companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - headLine
 *               - about
 *               - baseInfo
 *             properties:
 *               name:
 *                 type: string
 *               headLine:
 *                 type: string
 *               about:
 *                 type: string
 *               baseInfo:
 *                 type: object
 *                 properties:
 *                   linkWeb:
 *                      type: string
 *                   industry:
 *                     type: string
 *                   companySize:
 *                     type: number
 *                   headQuarter:
 *                     type: string
 *                   type:
 *                     type: string
 *                   founded:
 *                     type: number
 *                   specialties:
 *                     type: array
 *             example:
 *               name: Thai's Company
 *               headLine: The greatest company in the world!
 *               about: Information & Technology
 *               baseInfo: {
 *                  linkWeb: https://fb.com/quocthai.user,
 *                  industry: Services,
 *                  companySize: 101,
 *                  headQuarter: Thu Duc - HCM - Vietnam,
 *                  type: publishing,
 *                  founded: 1999,
 *                  specialties: ['financial', 'service', 'business'],
 *               }
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all companies
 *     description: Only admins can retrieve all companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Company name
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
 *                     $ref: '#/components/schemas/Company'
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

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company
 *     description: Get information of the company.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a company
 *     description: Logged in owner account for update a company.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 default: Thais's company
 *               headLine:
 *                 type: string
 *                 required: true
 *                 default: The greater then others
 *               about:
 *                 type: string
 *                 required: true
 *                 default: XL is real
 *               industry:
 *                 type: string
 *                 required: true
 *                 enum: ['Information Technology & Services', 'Services', 'Information Technology']
 *                 default: Information Technology
 *               companySize:
 *                 type: number
 *                 default: 101
 *               headQuarter:
 *                 type: string
 *                 default: Vietnam
 *               type:
 *                 type: string
 *                 enum: ['closing', 'publishing', 'personal']
 *                 default: personal
 *               founded:
 *                 type: number
 *                 default: 1900
 *               specialties:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default:
 *                   - website developer
 *                   - hacking company
 *               avatar:
 *                 type: file
 *               backgroundAvt:
 *                 type: file
 *               photos:
 *                 type: array
 *                 items:
 *                   type: file
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Company'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a company
 *     description: Logged in owner for delete a company.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
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
