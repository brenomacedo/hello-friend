import { User } from "@prisma/client";

export function RenderCreatedUser(user: User) {

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
    }

}

export function RenderUser(user: User) {

    return {
        id: user.id,
        type: user.type,
        name: user.name,
        email: user.email,
        title: user.title,
        avatar: user.avatar,
        about: user.about,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        githubId: user.githubId
    }

}
