const router = require('express').Router();

// PAGINA DE BIENVENIDA

router.get('/', (req, res, next) => {
    res.send('Hello World!');
});

module.exports = router;