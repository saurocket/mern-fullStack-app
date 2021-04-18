const {Router} = require('express');
const User = require('../models/User')
const config = require('config')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router();

//api/auth/
router.post(
    '/register',
    [
        check('email', 'invalid email').isEmail(),
        check('password', 'invalid password').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'invalid data in registration'
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'This user already been here'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: 'User was created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    })
router.post('/login',
    [
        check('email', 'Enter email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'invalid data in logIn to system'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json ({message: 'user is not defined'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message: 'Invalid password, try again'})
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    })


module.exports = router