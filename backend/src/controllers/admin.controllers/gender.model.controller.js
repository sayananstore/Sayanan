import { Gender } from "../../models/gender.model.js";

export const createGender = async (req, res) => {
  const { name } = req.body;
  const gender = await Gender.create({ name });
  res.json(gender);
};

export const getGender = async (req, res) => {
  const gender = await Gender.findAll();
  res.json(gender);
};
