const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('Main');
});



module.exports = router;