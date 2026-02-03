import { Address } from "../models/address.model.js";

/* CREATE address */
export const addAddress = async (req, res) => {
  try {
    const data = req.body;

    // If setting default, unset previous default
    if (data.is_default) {
      await Address.update(
        { is_default: false },
        { where: { user_id: req.user.id } }
      );
    }

    const address = await Address.create({
      ...data,
      user_id: req.user.id,
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET all addresses of user */
export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { user_id: req.user.id },
      order: [["is_default", "DESC"]],
    });

    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE address */
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOne({
      where: {
        id: addressId,
        user_id: req.user.id, // 🔐 ownership check
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.is_default) {
      await Address.update(
        { is_default: false },
        { where: { user_id: req.user.id } }
      );
    }

    await address.update(req.body);

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE address */
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOne({
      where: {
        id: addressId,
        user_id: req.user.id, // 🔐 ownership check
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.destroy();

    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
