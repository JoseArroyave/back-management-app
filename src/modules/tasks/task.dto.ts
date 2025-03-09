import {
  ArrayNotEmpty,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
  IsArray,
  IsEnum,
  IsUUID,
} from "class-validator";
import { TaskStatus } from "./tasks.entity";

export class NewTaskDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: "El título es obligatorio" })
  @IsString({ message: "El título debe ser un texto" })
  @MinLength(3, { message: "El título debe tener al menos 3 caracteres" })
  title: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  description?: string;

  @IsEnum(TaskStatus, { message: "El estado debe ser 'pending' o 'completed'" })
  status: TaskStatus = TaskStatus.PENDING;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @IsArray({ message: "Los dueños deben ser un array" })
  @ArrayNotEmpty({ message: "Debe haber al menos un dueño" })
  @IsUUID("4", { each: true, message: "Cada ID de dueño debe ser un UUID válido" })
  owners: string[];
}
