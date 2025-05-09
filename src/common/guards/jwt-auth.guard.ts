import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) throw new UnauthorizedException("Token berilmagan");

    const [bearer, token] = auth.split(" ");

    try {
      const decodedData = this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });

      req.user = decodedData;

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Token invalid");
    }
  }
}
