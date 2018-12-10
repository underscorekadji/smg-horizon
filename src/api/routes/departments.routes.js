const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/departments.controller');

/** @swagger
 * /departments:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets all departments
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Return array of employees
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                   DeptCode:
 *                     type: string
 *                   Id:
 *                     type: number
 *                   Name:
 *                     type: string
 *                   NumUsers:
 *                     type: number
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

module.exports = router;
