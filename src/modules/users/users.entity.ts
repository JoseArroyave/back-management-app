import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity } from "typeorm";
import { Exclude } from "class-transformer";
import { IUsers } from "./users.interface";

@Entity({ name: "management_users" })
export class UsersEntity implements IUsers {
  @PrimaryGeneratedColumn({ type: "int", primaryKeyConstraintName: "PRIMARY" })
  public idUser: number;

  @Column({ type: "varchar", length: 250, nullable: false })
  @Exclude()
  public password: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  public name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  public email: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}
