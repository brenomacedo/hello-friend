import { Category } from "@prisma/client";

export function RenderCategories(categories: Category[]) {
    return categories.map(category => {
        return {
            id: category.id,
            name: category.name
        }
    })
}
