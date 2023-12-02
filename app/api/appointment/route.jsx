export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';
import sendBookingConfirmationEmail from '@/lib/EmailSending/SendBookingConfirmation';
import dayjs from "dayjs";
import ConvertDBTimeToOnlyTime from '@/lib/TimeDateConverters/ConvertDBTimeToOnlyTime';
import ConvertDBTimeToItalianTime from '@/lib/TimeDateConverters/ConvertTimeToItalianTimeZOne';

const prisma = new PrismaClient();

export async function GET(req){
    const url = new URL(req.url);
    const search = url.search;
    const queryObj = Object.fromEntries(new URLSearchParams(search));
    console.log(queryObj) 
    try {
        const appointments = await prisma.appointment.findMany(
            {
                where: queryObj,
                include:{
                    barber: true,
                    services: true,
                }
            }
        );

        if(!appointments) return new Response(JSON.stringify({error: 'appointments not found'}), {status: 404});

        return new Response(JSON.stringify(appointments), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

async function checkIfSlotIsStillAvailable(date, time, barberId) {
    const appointment = await prisma.appointment.findFirst({
        where:{
            date: date,
            time: time,
            barberId: barberId,
        }
    });


    
    if (appointment) {
        return false;
    } else {
        return true;
    }
};

export async function POST(req){
    const body = await req.json();
    const { barberId, date, time, serviceIds, name, email } = body;
    const consentTimeStamp = new Date();

    try {
         const slotIsAvailable = await checkIfSlotIsStillAvailable(date, time, barberId);

        if(!slotIsAvailable) return new Response(JSON.stringify({error: 'slot is not available'}), {status: 400});
 

        const newAppointment = await prisma.appointment.create({
            data: {
                barber: {
                    connect: {
                      id: barberId,
                    },
                  },
                date:date,
                time:time,
                services: {
                    connect: serviceIds.map((serviceId) => ({
                      id: serviceId,
                    })),
                  },
                name:name,
                email:email,
                consentTimeStamp: consentTimeStamp
            }, include:{
                barber: true,
                services: true,
            }
        })

        if(!newAppointment) return new Response(JSON.stringify({error: 'error creating appointment'}), {status: 500});

        
      
        // Format the time as "HH:mm"
        const timePart = ConvertDBTimeToItalianTime(newAppointment?.time);


        const localDate = dayjs(date).format("DD/MM/YYYY");
        const localTime = timePart

        const {barber, services} = newAppointment;
    
        const newBookingId = newAppointment.id;
        const serviceListArray = services.map((service) => service.name);
        const serviceList = serviceListArray.join(", ");
        let cancelURL;
        if(process.env.NODE_ENV === "development"){
            cancelURL = `http://localhost:3000/cancelBooking/${newBookingId}`;
        } else {
            cancelURL = `https://nerio-barber-shop.vercel.app/cancelBooking/${newBookingId}`;
        }

    if(email){
        await sendBookingConfirmationEmail(
            email,
            name,
            localDate,
            localTime,
            barber.name,
            serviceList,
            cancelURL,
            newBookingId
          );
       } else {
             console.log("No email provided for the booking")
       }
    

    return new Response(JSON.stringify(newAppointment), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
    
}

export async function DELETE(req){
    try {
        const deleteAllAppointments = await prisma.appointment.deleteMany({
            where: {
               name:{
                not: "Any Barber"
               }
            }
        });

        if(!deleteAllAppointments) return new Response(JSON.stringify({error: 'error deleting appointments'}), {status: 500});

        return new Response(JSON.stringify(deleteAllAppointments), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}