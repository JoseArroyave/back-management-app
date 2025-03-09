import { PublicAccess } from "../../common/decorators/public-access.decorator";
import { Controller, Body, Post, Get, UseGuards, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
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

  @Get("searchUsers")
  @UseGuards(AuthGuard("jwt"))
  public async searchUsers(@Query("query") query: string) {
    return this.usersService.searchUsers(query);
  }
}
