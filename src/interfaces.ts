export interface User {
    id: number,
    name: string,
    email: string,
    todoCount: number,
    completedTodoCount: number,
    company: string,
    posts: Array<object>,
    haveGeo: boolean,
}

export interface Post {
    userId: number,
    id: number,
    commentCount: number,
}
