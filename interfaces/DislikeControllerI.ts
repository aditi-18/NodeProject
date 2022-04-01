import {Request, Response} from "express";

/**
 * @file Declares interface for Dislike Controller.
 */

export default interface DislikeController {
    userTogglesTuitDislikes (req: Request, res: Response): void;
};