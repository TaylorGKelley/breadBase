import { Request, Response } from 'express';
import { ProtectedUser } from '../types/User';
import Bakery from '../models/bakeryModel';
import { UserRole } from '../types/User';
import { addUserToBakery } from '../utils/associateUserWithBakery';

// Todo: Add searching functionality
export const getAllBakeries = async (req: Request, res: Response) => {
  try {
    const bakeries = await Bakery.find().populate('bakers.user');

    res.status(200).json({
      status: 'success',
      data: {
        bakery: bakeries,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const getBakery = async (req: Request, res: Response) => {
  try {
    const bakery = await Bakery.findById(req.params.id);

    if (!bakery) {
      return res.status(404).json({
        status: 'fail',
        error: 'Cannot find a bakery with that Id',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        bakery,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const createBakery = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user as ProtectedUser;

    const newBakery = await Bakery.create({
      ...req.body,
      owner: userId,
    });

    await addUserToBakery(UserRole.bakeryOwner, newBakery._id, req, userId);

    res.status(200).json({
      status: 'success',
      data: {
        bakery: newBakery,
        user: (req.user as ProtectedUser).associatedBakery,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const updateBakery = async (req: Request, res: Response) => {
  try {
    const bakeryId = req.params.id;
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const deleteBakery = async (req: Request, res: Response) => {
  try {
    const bakeryId = req.params.id;

    const updatedBakery = await Bakery.findByIdAndUpdate(
      bakeryId,
      {
        closed: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBakery) {
      return res.status(404).json({
        status: 'fail',
        error: 'Could not find a bakery with that Id',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Your bakery has been successfully closed',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};

export const reopenBakery = async (req: Request, res: Response) => {
  try {
    const bakeryId = req.params.id;

    const updatedBakery = await Bakery.findByIdAndUpdate(
      bakeryId,
      {
        closed: false,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBakery) {
      return res.status(404).json({
        status: 'fail',
        error: 'Could not find a bakery with that Id',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Your bakery has successfully been re-opened',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: (error as Error).message,
    });
  }
};
