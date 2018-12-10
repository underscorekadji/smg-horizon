const router = require('express').Router();

const controller = require('../controllers/user.controller');

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Sign in using ICX Domain credentials.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: password
 *           example: {
 *             "username": "someUser",
 *             "password": "somePassword"
 *           }
 *     responses:
 *       200:
 *         description: Return jwt token
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *         examples:
 *           application/json: {
 *             "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *           }
 *       401:
 *         description: When the username or password incorrect
 */
router.post('/login', controller.login);

module.exports = router;
