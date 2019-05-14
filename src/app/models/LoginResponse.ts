import { User } from './User';

export class LoginResponse {
    token?: String;
    message: String;
    user: User;
}