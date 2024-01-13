import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    public async validateUser(id: number, password: string): Promise<User | undefined> {
        const user = await this.usersService.getById(id);

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            return undefined;
        }
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
