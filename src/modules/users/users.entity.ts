import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  Column,
  Entity,
} from "typeorm";
import { Exclude } from "class-transformer";
import { IUsers } from "./users.interface";
import { TasksEntity } from "../tasks/tasks.entity";

@Entity({ name: "management_users" })
export class UsersEntity implements IUsers {
  @PrimaryGeneratedColumn("uuid")
  public idUser: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  @Exclude()
  public password: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  public name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  public email: string;

  @CreateDateColumn({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  public deletedAt: Date;

  @ManyToMany(() => TasksEntity, (task) => task.owners)
  public tasks: TasksEntity[];
}
