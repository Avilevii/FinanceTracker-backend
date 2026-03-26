import express from 'express';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getCategoryByUserIdCtrl, updateCategoryCtrl } from '../ctrl/categoriesCtrl.js';

const router = express.Router();

router.get('/getAllCategories', getAllCategoriesCtrl);
router.get('/getCategoriesByUserId/:userId', getCategoryByUserIdCtrl);
router.post('/createCategory', createCategoryCtrl);
router.put('/updateCategory/:id', updateCategoryCtrl);
router.delete('/deleteCategory/:id', deleteCategoryCtrl);

export default router;