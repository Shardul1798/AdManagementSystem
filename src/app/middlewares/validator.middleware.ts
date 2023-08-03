import * as Joi from "joi";
import dotenv from "dotenv";

dotenv.config();
class BodyValidator {
  async validateRegisterBody(req: any, res: any, next: () => void) {
    try {
      const schema = Joi.object().keys({
        username: Joi.string()
          .required()
          .pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-="']+$/),
        password: Joi.string().required(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required(),
        gender: Joi.string().required(),
        phone: Joi.string().required(),
        dob: Joi.date(),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateLoginBody(req: any, res: any, next) {
    try {
      const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        deviceType: Joi.string().required(),
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateViewandDeleteProfileParams(req: any, res: any, next) {
    try {
      const schema = Joi.object({
        id: Joi.number().required(),
      });
      const result: any = schema.validate(req.params);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateBidParamAndBody(req: any, res: any, next) {
    try {
      const schema = Joi.object({
          id: Joi.number().required(),
          productId: Joi.number().required,
          bidAmount: Joi.number().required()
      })
      const result:any = schema.validate(req.params);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateAddressBody(req: any, res: any, next) {
    try {
      const schema = Joi.object({
        hosueNo: Joi.number().required().max(5).min(1),
        streetNumber: Joi.number().required(),
        area: Joi.string().required(),
        landmark: Joi.string().max(50),
        city: Joi.string().required(),
        zipcode: Joi.number().required().max(6),
        state: Joi.string().required(),
        addressType: Joi.string().required(),
        status: Joi.string()
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateForgotBody(req: any, res: any, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().required()
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Validation Error!" });
    }
  }

  async validateResetBody(req: any, res: any, next) {
    try {
      const schema = Joi.object({
        password: Joi.string().required(),
        token: Joi.string().required()
      });
      const result: any = schema.validate(req.body);
      if (result && result.error) {
        return res.status(400).json({
          error: result.error.details.map(function (el: any) {
            return el.message;
          }),
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Validation Error!" });
    }
  }
}

export const bodyValidator = new BodyValidator();
