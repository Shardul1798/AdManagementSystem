import { Request, Response } from "express";
import { ADDRESS_TYPE } from "./address.constants";
import Address from "./address.model";

class AddressController {
  async updateUserAddress(req: Request, res: Response) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({ message: "User not found" });
      }
      const payload = { ...req.body };
      const resp = await Address.update(payload, {
        where: { userId: req.body.userId },
      });
      if (!resp) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async addUserAddress(req: Request, res: Response) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({ message: "User not found" });
      }
      const payload = { ...req.body };
      if(!payload.status) payload.status = ADDRESS_TYPE.PERMANENT;
      const resp = await Address.create(payload);
      if (!resp) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({ message: "Address added Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const addressController = new AddressController();
