import express from 'express';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getCategoryByIdCtrl, updateCategoryCtrl } from '../ctrl/categoriesCtrl.js';

const router = express.Router();

router.get('/getAllCategories', getAllCategoriesCtrl);
router.get('/getCategoryById/:id', getCategoryByIdCtrl);
router.post('/createCategory', createCategoryCtrl);
router.put('/updateCategory/:id', updateCategoryCtrl);
router.delete('/deleteCategory/:id', deleteCategoryCtrl);

export default router;