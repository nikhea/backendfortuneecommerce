import Subcategory from "../models/Subcategory.models.js";
import Category from "../models/Category.models.js";
export const CreateSubCategory = async (req, res) => {
  const { name, category, description } = req.body;
  try {
    const exsitCategory = await Category.findOne({ name: category });
    if (exsitCategory) {
      const subcategory = await Subcategory.create({
        name,
        category: exsitCategory,
        description,
      });

      res.status(201).json(subcategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
