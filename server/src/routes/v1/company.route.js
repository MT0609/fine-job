const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require('../../validations/company.validation');
const companyController = require('../../controllers/company.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(companyValidation.createCompany), companyController.createCompany)
  .get(validate(companyValidation.getCompanies), companyController.getCompanies);

router
  .route('/:companyID')
  .get(auth('getUsers'), validate(companyValidation.getCompany), companyController.getCompany)
  .patch(auth('manageUsers'), validate(companyValidation.updateCompany), companyController.updateCompany)
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               headLine:
 *                 type: string
 *               about:
 *                 type: string
 *               industry:
 *                 type: string
 *               companySize:
 *                 type: number
 *               headQuarter:
 *                 type: string
 *               type:
 *                 type: string
 *               founded:
 *                 type: number
 *               specialties:
 *                 type: array
 *             example:
 *               name: Thais's company
 *               headLine: The greater then others
 *               about: XL is real
 *               industry: Information Technology
 *               companySize: 1001
 *               headQuarter: Singapore
 *               type: personal
 *               founded: 2025
 *               specialties: ['website developer', 'hacking company']
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
