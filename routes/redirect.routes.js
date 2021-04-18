const {Router} = require('express')
const router = Router()
const Link = require('../models/Links')


router.get(`/:code`, async (req, res) => {
    try{
            const link = await Link.findOne({code: req.params.code})
            if (link){
                link.clicks++
                link.save()
                return res.redirect(link.from)
            }
            res.status(404).json({message: 'Link is not defined'})
    }catch (e) {
        res.status(500).json({message: 'something went wrong'})
    }
})

module.exports = router