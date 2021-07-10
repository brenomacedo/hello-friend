import { CategoriesOnUser, Category, User } from "@prisma/client"

type UserWithCategory = User & {
    categories: (CategoriesOnUser & {
        category: Category
    })[]
}

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

export function RenderLoggedUser(user: UserWithCategory) {

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
        githubId: user.githubId,
        categories: user.categories.map(category => {
            return {
                id: category.categoryId,
                name: category.category.name
            }
        })
    }

}
