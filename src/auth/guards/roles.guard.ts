import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    // Reflector: It allows you to read metadata set by decorators.
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY, [
                // Controller method
                context.getHandler(),
                // Controller class
                context.getClass()
            ]
        )

        if (!requiredRoles){
            return true
        }

        const { user } = context.switchToHttp().getRequest()

        if (!user) {
            throw new ForbiddenException("User not authenticated")
        }

        const hasRequiredRole = requiredRoles.some(role => user.role === role)

        if (!hasRequiredRole) {
            throw new ForbiddenException("Insufficient permission")
        }

        return true
    }
}