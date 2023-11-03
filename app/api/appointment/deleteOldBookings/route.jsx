export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req){
    const today = new Date();
    const todayAtDayStartUTC = new Date(today);
    todayAtDayStartUTC.setUTCHours(0,0,0,0);
    const todayStartInMilliseconds = Date.parse(todayAtDayStartUTC);
    console.log("todayAtDayStartUTC", todayAtDayStartUTC)
    console.log("todayStartInMilliseconds", todayStartInMilliseconds)

    try{
        const oldAppointments = await prisma.appointment.findMany({
            where: {
                date: {
                    lt: todayAtDayStartUTC
                }
            }
        })

        if(oldAppointments.length === 0){
            return new Response(JSON.stringify(`no old bookings`), {status: 200})
        }

        const oldAppointmentsIds = oldAppointments.map(appointment => appointment.id)

        await prisma.appointment.deleteMany({
            where: {
                id: {
                    in: oldAppointmentsIds
                }
            }
        })

        
        return new Response(JSON.stringify(`deleted old booking`), {status: 200})


    }catch(error){
        console.log(error)
        return new Response(JSON.stringify("error"), {status: 500})
    }

    return new Response(JSON.stringify("ok"), {status: 200})
}