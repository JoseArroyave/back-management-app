import { IsNotEmpty, IsOptional, MinLength, IsString, IsEmail, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UsersDTO {
  @ApiProperty({ description: "Identificador único del usuario (UUID)" })
  @IsUUID()
  @IsOptional()
  idUser: string | null;

  @ApiProperty({ description: "Contraseña del usuario (mínimo 8 caracteres)" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ description: "Nombres del usuario" })
  @IsNotEmpty({ message: "Los nombres son obligatorios" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Correo electrónico del usuario" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  @IsEmail({}, { message: "Debe ser un email válido" })
  email: string;
}
