const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile', {
        title: 'Profile',
    });
});

module.exports = router;