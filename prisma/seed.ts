import prisma from '../src/database/client'

export async function seed() {

}

async function main() {

    const categories = await prisma.category.createMany({
        data: [
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
    })

}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
