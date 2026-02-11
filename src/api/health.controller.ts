import { Request, Response } from 'express';
import { getHealthStatus  }  from '../application/health.service';
import { HealthStatusDTO } from './types/health.dto';


export function healthcontroller(
    _req: Request,
    res: Response<HealthStatusDTO>

): void {
    const data = getHealthStatus();
    
    const response: HealthStatusDTO = {
        status: data.status,
        timestamp: data.timestamp,
    
    };
    res.status(200).json(response);
}