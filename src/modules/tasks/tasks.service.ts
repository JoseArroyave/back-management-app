import { IResponse } from "../../common/interfaces/response.interface";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TasksEntity, TaskStatus } from "./tasks.entity";
import { UsersService } from "../users/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { NewTaskDTO } from "./task.dto";
import { Repository } from "typeorm";
import { Request } from "express";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    @Inject("REQUEST") private readonly request: Request,
    private readonly usersService: UsersService
  ) {}

  public async getTasks(page: number, limit: number, status?: string) {
    const skip = (page - 1) * limit;

    const query = this.tasksRepository
      .createQueryBuilder("task")
      .innerJoin("task.owners", "filterOwner", "filterOwner.idUser = :userId", {
        userId: this.request.session.user.idUser,
      })
      .leftJoinAndSelect("task.owners", "owner")
      .where("task.deletedAt IS NULL");

    if (status) query.andWhere("task.status = :status", { status });

    const total = await query.getCount();
    const tasks = await query.orderBy("task.createdAt", "DESC").skip(skip).take(limit).getMany();

    return {
      totalPages: Math.ceil(total / limit),
      data: tasks,
      total,
      limit,
      page,
    };
  }

  public async updateTask(taskId: string, taskData: Partial<NewTaskDTO>): Promise<IResponse<TasksEntity>> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ["owners"],
    });

    const owners = (await this.usersService.findByIds(taskData.owners || [])).message;

    Object.assign(task, taskData);
    task.updatedAt = new Date();
    task.owners = owners;

    const updated = await this.tasksRepository.save(task);
    return { status: 1, message: updated };
  }

  public async changeTaskStatus(taskId: string, status: NewTaskDTO): Promise<IResponse<TasksEntity>> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });

    task.updatedAt = new Date();
    task.status = status.status;

    const updated = await this.tasksRepository.save(task);
    return { status: 1, message: updated };
  }

  public async createTask(newTaskDTO: NewTaskDTO): Promise<IResponse<TasksEntity>> {
    const { title, description, status, owners } = newTaskDTO;

    const users = (await this.usersService.findByIds(owners)).message;

    if (users.length === 0) {
      throw new Error("Los usuarios especificados no existen.");
    }

    const newTask = this.tasksRepository.create({
      status: (status ?? "pending") as TaskStatus,
      owners: users,
      description,
      title,
    });

    const added = await this.tasksRepository.save(newTask);
    return { status: 1, message: added };
  }

  public async deleteTask(taskId: string): Promise<IResponse<string>> {
    await this.tasksRepository.softDelete(taskId);
    return { status: 1, message: "Tarea eliminada correctamente" };
  }
}
