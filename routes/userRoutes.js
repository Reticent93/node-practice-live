const { Router } = require("express")

const router = Router();

router.get('/', (req, res) => {
    res.send("using api route for users")
})

module.exports = router;