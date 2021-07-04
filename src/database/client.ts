import { PrismaClient } from '@prisma/client'

const client = new PrismaClient({
    datasources: {
        db: {
            url: process.env.NODE_ENV === 'test' ?
                process.env.DATABASE_URL_TEST :
                process.env.DATABASE_URL
        }
    }
})

export default client
