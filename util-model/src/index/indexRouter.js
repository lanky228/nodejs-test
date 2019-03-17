import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("success!");
});

router.get('/health', (req, res) => {
    res.send("success!");
});

module.exports = router;