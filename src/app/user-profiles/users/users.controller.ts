import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/app/auth/authorization/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/app/auth/authorization/guard/jwt.auth.guard';
import { UserRole } from './enum/user-role.enum';
import { RolesGuard } from 'src/app/auth/authorization/guard/role.guard';

@Controller('user')
export class UsersController {
    @Get()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserRole.Guide)
    hello(){
        return "hello user"
    }
}
