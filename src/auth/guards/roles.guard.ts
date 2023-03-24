import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()); //obtenemos la metadata desde el controller, segun definamos los roles que tienen acceso en el controller; ej [seller, admin]
    // ['admin', 'seller']
    if (!roles) {
      return true;
    } // esta validacion es para que nos siga funcionando el @Publi()
    const request = context.switchToHttp().getRequest(); // Obtenemos el request
    const user = request.user as PayloadToken; //del request sacamos el user y lo tipamos como PayloadToken
    // { role: 'admin', sub: 126f54i84fb1132 }
    const isCorrectRole = roles.some((role) => role === user.role); //devuelve true o false, si encuenta el rol que concide con el rol que tiene acceso
    if (!isCorrectRole) {
      throw new ForbiddenException('your role is wrong'); //Aqui lanzamos un error si el role no esta en el model Role
    }
    return isCorrectRole;
  }
}
