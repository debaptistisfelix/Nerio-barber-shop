export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, {params}){
    const {id} = params;

    try {
        const barber = await prisma.barber.findUnique({
            where:{
                id: id
            }
        });

        if(!barber) return new Response(JSON.stringify({error: 'barber not found'}), {status: 404});

        return new Response(JSON.stringify(barber), {status: 200});
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function PATCH(req,  {params}){
    const {id} = params;
    const body = await req.json();

    try {
        const updatedBarber = await prisma.barber.update({
            where:{
                id: id
            },
            data: body
        })

        if(!updatedBarber) return new Response(JSON.stringify({error: 'error updating barber'}), {status: 500});

        return new Response(JSON.stringify(updatedBarber), {status: 200});

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function DELETE(req,  {params}){
    const {id} = params;

    try {
      
          const deletedBarber = await prisma.barber.delete({
            where: {
              id: id
            }
          });

          if(!deletedBarber) return new Response(JSON.stringify({error: 'error deleting barber'}), {status: 500});


          return new Response(JSON.stringify(deletedBarber), { status: 200 });
      
         
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}