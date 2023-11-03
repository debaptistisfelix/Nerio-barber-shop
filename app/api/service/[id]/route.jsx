export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(req, {params}){
    const {id} = params;

    try {
        const service = await prisma.service.findUnique({
            where: {
                id: id
            }
        });

        if(!service) return new Response(JSON.stringify({error: 'service not found'}), {status: 404});

        return new Response(JSON.stringify(service), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function PATCH(req, {params}){
    const {id} = params;
    const body = await req.json();

    try {
        const updatedService = await prisma.service.update({
            where:{
                id: id
            },
            data: body
        })

        if(!updatedService) return new Response(JSON.stringify({error: 'error updating service'}), {status: 500});

        return new Response(JSON.stringify(updatedService), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function DELETE(req, {params}){
    const {id} = params;

    try {
        const serviceToDelet = await prisma.service.delete({
            where:{
                id: id
            }
        })

        if(!serviceToDelet) return new Response(JSON.stringify({error: 'error deleting service'}), {status: 500});

        return new Response(JSON.stringify(serviceToDelet), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}