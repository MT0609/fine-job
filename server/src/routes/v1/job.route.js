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
  .post(auth(), validate(jobValidation.createJob), jobController.createJob)
  .get(validate(jobValidation.getJobs), jobController.getJobs);

router
  .route('/:jobID')
  .get(validate(jobValidation.getJob), jobController.getJob)
  .patch(auth(), validate(jobValidation.updateJob), jobController.updateJob)
  .delete(auth(), validate(jobValidation.deleteJob), jobController.deleteJob);

router.route('/:jobID/save').post(auth(), validate(jobValidation.postSave), jobController.postSave);
router.route('/:jobID/unSave').post(auth(), validate(jobValidation.postUnSave), jobController.postUnSave);

router.route('/search').post(validate(jobValidation.postSearchJobs), jobController.postSearchJobs);

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
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ['full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', 'volunteer']
 *                   description: Job type
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
 *               id: 609c0d1be962b125704a528d
 *               title: Full stack develop javascript
 *               jobType:
 *                 - part-time
 *                 - contract
 *               skills:
 *                 - MongoDb
 *                 - ExpressJs
 *                 - ReactJs
 *                 - NodeJs
 *               description: Master in MERN, MEAN stack
 *               locations:
 *                 - 127 Hai Thuong Lan Ong, Q5, HCM
 *                 - 112 Dao Duy Tu, Q10, HCM
 *               maxSalary: 3000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Job'
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
 *     parameters:
 *       - in: query
 *         name: title
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
 *         description: Maximum number of jobs
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
 *                     $ref: '#/components/schemas/Job'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job id
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
 *         description: Job id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobType:
 *                 type: array
 *                 items:
 *                    type: string
 *                    enum: ['full-time', 'part-time', 'internship', 'contract', 'remote', 'temporary', 'volunteer']
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ['open', 'close']
 *               maxSalary:
 *                 type: number
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *             example:
 *               jobType:
 *                 - part-time
 *                 - full-time
 *               skills:
 *                 - NodeJS
 *                 - ReactJS
 *               description: Node app boilerplate
 *               title: NodeJS developer
 *               status: open
 *               maxSalary: 5000
 *               locations:
 *                  - Vietnam
 *                  - Singapore
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
 *         description: Job id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 * /jobs/{id}/save:
 *   post:
 *     summary: Post save job
 *     description: Save a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 * /jobs/{id}/unSave:
 *   post:
 *     summary: Post unSave job
 *     description: UnSave a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /jobs/search:
 *   post:
 *     summary: Search jobs
 *     description: Anyone can search on jobs.
 *     tags: [Jobs]
 *     security:
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Query string
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
 *         description: Maximum number of jobs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     requestBody:
 *     example:
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
 *                     $ref: '#/components/schemas/Job'
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
 *
 */
