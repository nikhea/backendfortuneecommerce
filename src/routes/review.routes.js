import express from "express";
const router = express.Router();

router.get("/review", getAllReview);

// router.post("/subcategory", CreateSubCategory);
// // router.put("/products", updateOneProduct);

// router.get("/subcategory/:name", getOneSubCategories);
// router.delete("/subcategory/:id", removeOneSubCategories);

export default router;
