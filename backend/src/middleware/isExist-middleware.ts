import { Request, Response, NextFunction } from 'express';
import { Document, FilterQuery, Model } from 'mongoose';
import ApiError from '../exceptions/api-error';

export const isExist = <T>(Model: Model<T>, field: keyof T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fieldValue = field === '_id' ? req.params.id : req.body[field];
      const filter: FilterQuery<T> = { [field]: fieldValue } as FilterQuery<T>;

      const item = await Model.findOne(filter);

      if (!item) {
        throw ApiError.NotFound(Model.modelName);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
