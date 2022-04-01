import {Request, Response} from "express";

/**
 * @file Interface for Dislike Controller.
 */

export default interface DislikeController {
    userTogglesTuitDislikes (req: Request, res: Response): void;
};