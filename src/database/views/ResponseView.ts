import { Response, User } from "@prisma/client"
import { RenderUser } from "./UserView"

type ResponseWithUser = Response & {
    author: User
}

export function RenderCreatedResponse(response: Response) {
    return {
        id: response.id,
        content: response.content,
        commentId: response.commentId,
        authorId: response.authorId
    }
}

export function RenderResponse(response: ResponseWithUser) {
    return {
        id: response.id,
        content: response.content,
        commentId: response.commentId,
        authorId: response.authorId,
        author: RenderUser(response.author)
    }
}

export function RenderResponses(responses: ResponseWithUser[]) {
    return responses.map(response => RenderResponse(response))
}
