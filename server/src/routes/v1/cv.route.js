const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const CVValidation = require('../../validations/cv.validation');
const CVController = require('../../controllers/cv.controller');

const router = express.Router();

router.route('/').post(auth('getUser'), validate(CVValidation.createCV), CVController.createCV);

router
  .route('/')
  .get(auth('getAllCV'), validate(CVValidation.getAllUserCV), CVController.getUserCV)
  .patch(auth('getaCV'), validate(CVValidation.updateACV), CVController.updateCV);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: cvs
 *   description: CV for candidates are likely to apply jobs.
 */

/**
 * @swagger
 * /cvs/:
 *   post:
 *     summary: Create a CV
 *     description: candidates, employer can create a CV.
 *     tags: [cvs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: title of CV
 *               baseInfo:
 *                 type: object
 *                 description: BaseInfor of a user, including the information of a user. Detail at file model.
 *               contact:
 *                  type: object
 *                  description: contact information of a user, such as phone, email, facebook,..
 *               about:
 *                  type: string
 *                  description: information about yourself
 *               featured:
 *                 type: array
 *                 description: Your highlights
 *               experiences:
 *                 type: array
 *                 description: the experience of a user
 *               education:
 *                  type: array
 *                  items:
 *                     type: string
 *                  description: the education of a user
 *               licenseAndCert:
 *                  type: array
 *                  description: the licenseAndCert of a user
 *               volunteer:
 *                  type: array
 *                  items:
 *                     type: string
 *                  description: the volunteer of a user
 *               skills:
 *                  type: string
 *                  description: the volunteer of a user
 *             example:
 *               title: Backend Developer
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CV'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /cvs/?cvId={cvid}:
 *   get:
 *     summary: get all CV of a user or get a cv of user by cvId
 *     description: Candidates, employer and admin can get all CV of user.
 *     tags: [cvs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cvid
 *         allowEmptyValue: true
 *         schema:
 *           type: string
 *         description: cv id
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
 *                     $ref: '#/components/schemas/User'
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
 *   patch:
 *     summary: Update a CV
 *     description: Logged in users can only update their own CV information. Only admins can update other users.
 *     tags: [cvs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cvid
 *         required: true
 *         schema:
 *           type: string
 *         description: CV Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               sex:
 *                  type: string
 *               headLine:
 *                  type: string
 *               education:
 *                  type: array
 *                  items:
 *                     type: string
 *               location:
 *                  type: string
 *                  description: location of you
 *               industry:
 *                  type: string
 *               dob:
 *                  type: date
 *               contact:
 *                  type: object
 *                  description: contact information of a user, such as phone, email, facebook,..
 *               about:
 *                  type: string
 *                  description: information about yourself
 *               featured:
 *                  type: array
 *                  description: Cai nay t k biet no la gi
 *               experiences:
 *                  type: array
 *                  description: the experience of a user
 *               licenseAndCert:
 *                  type: array
 *                  description: the licenseAndCert of a user
 *               volunteer:
 *                  type: array
 *                  items:
 *                     type: object
 *                  description: the volunteer of a user
 *               skills:
 *                  type: array
 *                  items:
 *                     type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                    accomplishment:
 *                      type: string
 *                  description: the volunteer of a user
 *             example:
 *               firstName: Anh Thai dinh cao nghe thuat
 *               about: Anh thai khung qua anh oi
 *               skills:
 *                 - title: football sport
 *                   accomplishment: a quan world cup 2020 giai ao lang
 *               headLine: Nguyen Quoc Thai voi trinh do vuot xa loai nguoi, ngang bang loai cho.
 *
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a CV
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [cvs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
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
