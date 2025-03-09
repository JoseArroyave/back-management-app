import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { AuthGuard } from "@nestjs/passport";
import { NewTaskDTO } from "./task.dto";

@ApiBearerAuth()
@ApiTags("Tasks")
@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get("getTasks")
  public async getTasks(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("status") status?: string
  ) {
    return this.tasksService.getTasks(Number(page), Number(limit), status);
  }

  @Post("createTask")
  public async createTask(@Body() body: NewTaskDTO) {
    return this.tasksService.createTask(body);
  }

  @Put("updateTask/:id")
  async updateTask(@Param("id") taskId: string, @Body() taskData: Partial<NewTaskDTO>) {
    return this.tasksService.updateTask(taskId, taskData);
  }

  @Put("changeTaskStatus/:id")
  async changeTaskStatus(@Param("id") taskId: string, @Body() status: NewTaskDTO) {
    return this.tasksService.changeTaskStatus(taskId, status);
  }

  @Delete("deleteTask/:id")
  async deleteTask(@Param("id") taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
