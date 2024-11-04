import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { publishEvent } from '../events/publisher';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = new User(req.body);

    await user.save();
    await publishEvent('userCreated', {
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await User.find().skip(skip).limit(limit);

    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    await publishEvent('userDeleted', {
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
