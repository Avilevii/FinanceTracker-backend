import express from 'express';

const router = express.Router();

router.get('/getAllCategories');
router.get('getCategoryById/:id');
router.post('/createCategory');
router.put('/updateCategory');
router.delete('/deleteCategory');

export default router;