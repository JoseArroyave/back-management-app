import { IsNotEmpty, IsOptional, MinLength, IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UsersDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  idUser: number | null;

  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
