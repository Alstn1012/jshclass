import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class UserDto {
  name: string;
  age: number;
  email: string;
  password: string;
  location: string;
  phone: string;
  sex: Gender;
  permission: Permission;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/v1/user') //
  getUserById(@Body() dto: UserDto) {
    if (dto.name.length > 23) {
      return 'error: name length';
    }

    const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!email.test(dto.email)) {
      return 'error: email';
    }
    if (dto.age < 14) {
      return 'minkyum';
    }

    const phone = new RegExp(
      /^(\+82[-]?)?0?1([0|1|6|7|8|9]?)[-]?([0-9]{3,4})[-]?([0-9]{4})$/,
    );
    if (!phone.test(dto.phone)) {
      return 'suwonsexking';
    }

    console.log(dto);
  }
}

enum Gender {
  MALE,
  FEMALE,
}

enum Permission {
  ROLE_USER,
  ROLE_ADMIN,
}
