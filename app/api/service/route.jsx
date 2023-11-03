export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(req){
    try {
        const services = await prisma.service.findMany();

        if(!services) return new Response(JSON.stringify({error: 'services not found'}), {status: 404});

        return new Response(JSON.stringify(services), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function POST(req){
    const body = await req.json();

    try {
        const newService = await prisma.service.create({
            data: body
        });

        if(!newService) return new Response(JSON.stringify({error: 'error creating service'}), {status: 500});

        return new Response(JSON.stringify(newService), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function DELETE(req){
   

    try {
        const deleteAll = await prisma.service.deleteMany();

        if(!deleteAll) return new Response(JSON.stringify({error: 'error deleting services'}), {status: 500});

        return new Response(JSON.stringify(deleteAll), {status: 200});
      
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

