import { Request, Response } from 'express';
import { getHealthStatus  }  from '../application/health.service';

export function healthcontroller(
    _req: Request,
    res: Response

): void {
    const data = getHealthStatus();
    res.status(200).json(data);
}