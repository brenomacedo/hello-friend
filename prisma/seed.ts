import prisma from '../src/database/client'
import { seedCategories } from '../src/database/functions/categoryFunctions'

export async function seed(){}

async function main() {

    await seedCategories({
        categories: [
            {
                name: 'Films'
            },
            {
                name: 'Games'
            },
            {
                name: 'media'
            },
            {
                name: 'relationship'
            },
            {
                name: 'routine'
            },
            {
                name: 'school'
            },
            {
                name: 'series'
            },
            {
                name: 'sports'
            },
            {
                name: 'technology'
            },
            {
                name: 'university'
            }
        ]
    }, prisma)

}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
