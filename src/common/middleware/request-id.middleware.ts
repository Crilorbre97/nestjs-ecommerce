import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { requestContext } from "../context/request-context"

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const requestId = req.headers['x-request-id'] ?? randomUUID();

        requestContext.run({ requestId }, () => {
            req.requestId = requestId
            res.setHeader('x-request-id', requestId);
            next();
        })

    }

}