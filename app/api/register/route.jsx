import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();
    const {username, password} = body;

    if(!username || !password){
        return new Response(JSON.stringify({error: 'Please fill in all fields'}), {status: 422});
    }

    try{

        const userExists = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if(userExists){
            return new Response(JSON.stringify({error: 'User already exists'}), {status: 422});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                hashedPassword
            }
        });
        return new Response(JSON.stringify(user), {status: 200});
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify({error: 'Error while registering User'}), {status: 500});
    }
};
