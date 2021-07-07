import { User } from "@prisma/client";

export function RenderUser(user: User) {

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
    }

}
