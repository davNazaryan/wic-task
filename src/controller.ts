import { Response, Request, NextFunction } from "express";
import getData from "./getData";

/** Get predefined data
 * @route GET /get_data/:searchStr?
 */
export default (req: Request, res: Response, next: NextFunction) => {
    const searchStr: string = req.params.searchStr;

    getData(searchStr).then((data) => {
        res.json(data).end();
    }).catch((e) => {
        next(e);
    });
};
