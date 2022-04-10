import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) public UserModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async authUser({username, password}: any): Promise<{token: string}> {
    const user = {
      _id: "1243423jk",
      username: "123",
      email: "user@example.com",
    }
    // TODO validation by bcrypt
    const payloadToken = { _id: user._id, username: user.username, email: user.email };
    return { token: this.jwtService.sign(payloadToken)};
  }
}
