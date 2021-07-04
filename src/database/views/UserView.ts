import { User } from "@prisma/client";

export default function renderUser(user: User) {

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
    }

}
