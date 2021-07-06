import { Post, User } from "@prisma/client";
import renderUser from "./UserView";

type PostWithUser = Post & { user: User }

export function renderCreatedPost(post: PostWithUser) {

    return {
        id: post.id,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: renderUser(post.user)
    }

}
