const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/requests.controller');

/** @swagger
 * /requests:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Gets all requests
 *     tags:
 *       - Requests
 *     responses:
 *       200:
 *         description: Return array of requests
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                   DeptId:
 *                     type: integer
 *                   AllDayEvent:
 *                     type: boolean
 *                   DepName:
 *                     type: string
 *                   EndDate:
 *                     type: string
 *                   EndTime:
 *                     type: string
 *                   Image:
 *                     type: string
 *                   ProfileId:
 *                     type: number
 *                   StartDate:
 *                     type: string
 *                   StartTime:
 *                     type: string
 *                   StatusId:
 *                     type: number
 *                   UserName:
 *                     type: string
 *                   UserNameEng:
 *                     type: string
 *                   VacationType:
 *                     type: string
 *                   VacationTypeId:
 *                     type: number
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

module.exports = router;
