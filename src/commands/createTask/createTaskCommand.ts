export class CreateTaskCommand {
	constructor(public title: string, public description: string, public createdBy: string, public tags: string[] = [], public dueDate?: Date) {}
}
