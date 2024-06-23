import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ServicesService } from 'src/users/services/services.service';

@Injectable()
export class AuthGuardCustom implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: ServicesService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,{secret: process.env.JWT_SECRET}
      );

      const user = await this.userService.getUserById(payload.id);
      if(!user) throw new UnauthorizedException('User not found');

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
