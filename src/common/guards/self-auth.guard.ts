import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SelfAuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (
      req.user.sub == req.params.id ||
      ["admin", "creator"].includes(req.user.role)
    )
      return true;

    throw new ForbiddenException("Ruxsat berilmagan");
  }
}
