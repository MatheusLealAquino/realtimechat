import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        email: 'john@email.com',
        password: 'changeme',
      },
      {
        userId: 2,
        email: 'chris@email.com',
        password: 'secret',
      },
      {
        userId: 3,
        email: 'maria@email.com',
        password: 'guess',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

}
