export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(req, {params}){
    const {id} = params;

    try {
        const appointment = await prisma.appointment.findUnique({
            where:{
                id: id
            }
        });

        if(!appointment) return new Response(JSON.stringify({error: 'appointment not found'}), {status: 404});

        return new Response(JSON.stringify(appointment), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

export async function PATCH(req, {params}){
    const {id} = params;
    const body = await req.json();

    try {
        const updatedApointment = await prisma.appointment.update({
            where:{
                id: id
            },
            data: body
        })

        if(!updatedApointment) return new Response(JSON.stringify({error: 'error updating appointment'}), {status: 500});

        return new Response(JSON.stringify(updatedApointment), {status: 200});
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}


export async function DELETE(req, {params}){
    const {id} = params;

    try {
        const appointmentToDelete = await prisma.appointment.delete({
            where: {
                id:id
            }
        })

        if(!appointmentToDelete) return new Response(JSON.stringify({error: 'appointment not found'}), {status: 404});

        return new Response(JSON.stringify(appointmentToDelete), {status: 200});
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}
