export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';
import updateAnyBarber from '@/lib/updateAnyBarber';

const prisma = new PrismaClient();

export async  function GET(req, res){
    try {
        const barbers = await prisma.barber.findMany();

        if(!barbers) return new Response(JSON.stringify({error: 'barbers not found'}), {status: 404});


        return new Response(JSON.stringify(barbers), {status: 200});


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
};



export async  function POST(req, res){
    const body = await req.json();
    const {name} = body;

    try {
        if(!name) return new Response(JSON.stringify({error: 'missing data'}), {status: 400});

        const barber = await prisma.barber.create({
            data: {
                name
            }
        });

        if(!barber) return new Response(JSON.stringify({error: 'error creating barber'}), {status: 500});

      

        return new Response(JSON.stringify(barber), {status: 200});


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
};