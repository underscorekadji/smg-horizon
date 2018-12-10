const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/employees.controller');

/** @swagger
 * /employees:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets all employees
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: position
 *         description: Position of employee in company
 *         required: false
 *         type: string
 *       - in: query
 *         name: location
 *         description: Location of employees
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Return array of employees
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                   DeptId:
 *                     type: integer
 *                   FirstName:
 *                     type: string
 *                   FirstNameEng:
 *                     type: string
 *                   Image:
 *                     type: string
 *                   IsEnabled:
 *                     type: boolean
 *                   LastName:
 *                     type: string
 *                   LastNameEng:
 *                     type: string
 *                   Position:
 *                     type: string
 *                   ProfileId:
 *                     type: number
 *                   Room:
 *                     type: string
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

/** @swagger
 * /employees/brief:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets all employees with brief model
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: initialRequest
 *         description: Define if only active employees should be returned
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Return array of employees
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                   FirstName:
 *                     type: string
 *                   FirstNameEng:
 *                     type: string
 *                   IsEnabled:
 *                     type: boolean
 *                   LastName:
 *                     type: string
 *                   LastNameEng:
 *                     type: string
 *                   ProfileId:
 *                     type: number
 */
router.get(
  '/brief',
  passport.authenticate('jwt', { session: false }),
  controller.getAllWithShortModel
);

/** @swagger
 * /employees/{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets detailed employee model by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Employee ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return model of employee by ID
 *         schema:
 *             type: object
 *             properties:
 *                   Birthday:
 *                     type: string
 *                   DeptId:
 *                     type: number
 *                   DomenName:
 *                     type: string
 *                   Email:
 *                     type: string
 *                   EmploymentDate:
 *                     type: string
 *                   FirstName:
 *                     type: string
 *                   FirstNameEng:
 *                     type: string
 *                   Group:
 *                     type: string
 *                   Image:
 *                     type: string
 *                   LastName:
 *                     type: string
 *                   LastNameEng:
 *                     type: string
 *                   MiddleName:
 *                     type: string
 *                   Phone:
 *                     type: string
 *                   ProfileId:
 *                     type: number
 *                   Rank:
 *                     type: string
 *                   Room:
 *                     type: string
 *                   Skype:
 *                     type: string
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getEmployeeByProfileId
);

/** @swagger
 * /employees/dept/{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets employees by department ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Department ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return array of employees
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                   DeptId:
 *                     type: integer
 *                   FirstName:
 *                     type: string
 *                   FirstNameEng:
 *                     type: string
 *                   Image:
 *                     type: string
 *                   IsEnabled:
 *                     type: boolean
 *                   LastName:
 *                     type: string
 *                   LastNameEng:
 *                     type: string
 *                   Position:
 *                     type: string
 *                   ProfileId:
 *                     type: number
 *                   Room:
 *                     type: string
 */
router.get(
  '/dept/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getAllEmployeesByDeptId
);

module.exports = router;
