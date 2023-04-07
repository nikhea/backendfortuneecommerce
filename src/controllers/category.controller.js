import Category from "../models/Category.models.js";

export const CreateCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
