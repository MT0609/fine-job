const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

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
  .post(validate(jobValidation.createJob), jobController.createJob)
  .get(validate(jobValidation.getJobs), jobController.getJobs);

router
  .route('/:companyID')
  .get(auth('getUsers'), validate(jobValidation.getJob), jobController.getJob)
  .patch(cpUpload, validate(jobValidation.updateJob), jobController.updateJob)
  .delete(auth('manageUsers'), validate(jobValidation.deleteJob), jobController.deleteJob);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management and retrieval
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job
 *     description: Only admins can create other jobs.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - jobType
 *               - description
 *             properties:
 *               id:
 *                 type: string
 *                 description: Company ID (If has)
 *               title:
 *                 type: string
 *                 description: Job name
 *               jobType:
 *                 type: string
 *                 enum: ['full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', 'volunteer']
 *                 description: Job type
 *               skill:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *               description:
 *                 type: string
 *                 description: Job description
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Job description
 *               maxSalary:
 *                 type: number
 *                 description: Maximum salary for this position
 *             example:
 *               id: 6079d3b5bee9390730603276
 *               title: Full-stack develop javascript
 *               jobType: part-time
 *               skills:
 *                 - mongoDb
 *                 - expressJs
 *                 - reactJs
 *                 - nodeJs
 *               description: Master in MERN, MEAN stack
 *               locations:
 *                 - 127 Hai Thuong Lan Ong - Q5 - HCM
 *                 - 112 Dao Duy Tu - Q10 - HCM
 *               maxSalary: 3000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Job'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all job
 *     description: Only admins can retrieve all jobs.
 *     tags: [Jobs]
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
 * /jobs/{id}:
 *   get:
 *     summary: Get a job
 *     description: Get information of the job.
 *     tags: [Jobs]
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
 *                $ref: '#/components/schemas/Job'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a job
 *     description: Logged in owner account for update a job.
 *     tags: [Jobs]
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
 *                $ref: '#/components/schemas/Job'
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
 *     summary: Delete a job
 *     description: Logged in owner for delete a job.
 *     tags: [Jobs]
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
