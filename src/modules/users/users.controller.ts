import { PublicAccess } from "../../common/decorators/public-access.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Body, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDTO } from "./users.dto";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @PublicAccess()
  @Post("createUser")
  public async createUser(@Body() body: UsersDTO) {
    const addedUser = await this.usersService.createUser(body);
    return addedUser;
  }

  // @UseGuards(JwtAuthGuard)

}
