import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { Exclude } from "class-transformer";
import { ITasks } from "./tasks.interface";

export enum TaskStatus {
  COMPLETED = "completed",
  PENDING = "pending",
}

@Entity({ name: "management_tasks" })
export class TasksEntity implements ITasks {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "text", nullable: true })
  public description: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.PENDING })
  public status: TaskStatus;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  @Exclude()
  public deletedAt: Date;

  @ManyToMany(() => UsersEntity, (user) => user.tasks, { cascade: true })
  @JoinTable({
    name: "management_tasks_users",
    joinColumn: { name: "task_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "idUser" },
  })
  public owners: UsersEntity[];
}
