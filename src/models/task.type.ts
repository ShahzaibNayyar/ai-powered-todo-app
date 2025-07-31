export type Task = {
    id?: number,
    name: string,
    dateCreated: string,
    dateCompleted?: string,
    subTasks?: Task[]
}