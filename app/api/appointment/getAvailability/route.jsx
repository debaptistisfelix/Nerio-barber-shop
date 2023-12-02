export const dynamic = 'force-dynamic';
import {PrismaClient} from '@prisma/client';
import dayjs from "dayjs";
import moment from 'moment';

const prisma = new PrismaClient();

//Convert minutes to milliseconds
const minutesToMilliseconds = (minutes) => minutes * 60 * 1000;


export async function POST(req){
    try {
        const body = await req.json();
        const {barberId, date, duration} = body;
        const slotDuration = parseInt(duration, 10);
        const dateObj = new Date(date);

        const today = new Date();


        // Calculate the current time of the day in UTC
        const currentTimeUTC = moment().utc().valueOf();

        console.log("currentTimeUTC", currentTimeUTC)

        //Check if selected date is in the past
        if (dateObj < today && (dateObj.toDateString() !== today.toDateString())) {
            return new Response(JSON.stringify("La data selezionata è già passata"), { status: 200 });
        }
 

        //Check if selected date is a Sunday or Monday
        const dayOfBooking = dateObj.getDay();
        if (dayOfBooking === 0 || dayOfBooking === 1) {
            //If it is, tell user, shop is closed
            return new Response(JSON.stringify( "Il Negozio è chiuso"), {status: 200})
        }


        const openingTime1 = new Date(dateObj);
        openingTime1.setUTCHours(8, 30, 0, 0);

        const closingTime1 = new Date(dateObj);
        closingTime1.setUTCHours(12, 30, 0, 0);

        const openingTime2 = new Date(dateObj);
        openingTime2.setUTCHours(15, 0, 0, 0);

        const closingTime2 = new Date(dateObj);
        closingTime2.setUTCHours(19, 0, 0, 0);



        let bookedAppointments;
        let barbers;
        let timeSlotsByBarber = {};
        let availableSlotsByBarber = {};
        let availableSlotsDetailed = [];

        const getAllTimeSlots = (openingTime1, closingTime1, openingTime2, closingTime2, slotDuration, barber, timeSlotsByBarber) =>{
            const timeSlots = [];

            let currentTime = openingTime1.getTime();
            while (currentTime + minutesToMilliseconds(slotDuration) <= closingTime1.getTime()) {
                timeSlots.push(currentTime);
                currentTime += minutesToMilliseconds(slotDuration);
            }

            currentTime = openingTime2.getTime();
            while (currentTime + minutesToMilliseconds(slotDuration) <= closingTime2.getTime()) {
                timeSlots.push(currentTime);
                currentTime += minutesToMilliseconds(slotDuration);
            }

            if(dateObj.toDateString() === today.toDateString()){
                const filteredSlots = timeSlots.filter((slot) => slot > currentTimeUTC);
                timeSlotsByBarber[barber.id] = filteredSlots
            } else {
                timeSlotsByBarber[barber.id] = timeSlots
            }

            
         }


         

    
        //Check if the customer choose a barber or just Any barber
        const chosenBarber = await prisma.barber.findUnique({
            where: {
                id: barberId
            }
        });

        if(!chosenBarber) return new Response(JSON.stringify({error: 'barber not found'}), {status: 404});

        console.log("ChosenBarber",chosenBarber)
        console.log("Date:", dateObj)

        //If the customer choose Any barber, get all the appointments for that date
        if(chosenBarber.name === "Any Barber"){
            bookedAppointments = await prisma.appointment.findMany({
                where: {
                    date: dateObj
                },
                include:{
                    barber: true,
                    services: {
                        select: {
                          id: true,
                          name: true,
                          price: true,
                          duration: true,
                          category: true,
                        },
                      },
                }
            })
            barbers = await prisma.barber.findMany({
                where: {
                    name: {
                        not: "Any Barber"
                    }
                }
            });
            for(let barber of barbers){
                getAllTimeSlots(openingTime1, closingTime1, openingTime2, closingTime2, slotDuration, barber, timeSlotsByBarber)
                const bookedAppointmentsForBarber = bookedAppointments.filter((appointment) => appointment.barberId === barber.id);
                getAvailableTimeSlots(timeSlotsByBarber[barber.id], barber, bookedAppointmentsForBarber, slotDuration)
                const availableSlots = availableSlotsByBarber[barber.id];
                const detailedArray = availableSlots.map((slot) => {
                    const timestamp = slot;
                    const date = new Date(timestamp);
                    console.log("normal date:", date);

                    return { slot: date, barber: barber };
                })

                availableSlotsDetailed.push(...detailedArray);
            }


            
        // If the customer choose a specific barber, get all the appointments for that date and barber
        } else {
            bookedAppointments = await prisma.appointment.findMany({
                where: {
                    barberId: barberId,
                    date: dateObj
                },
                include:{
                    barber: true,
                    services: {
                        select: {
                          id: true,
                          name: true,
                          price: true,
                          duration: true,
                          category: true,
                        },
                      },
                }
            })
            getAllTimeSlots(openingTime1, closingTime1, openingTime2, closingTime2, slotDuration, chosenBarber, timeSlotsByBarber)
            getAvailableTimeSlots(timeSlotsByBarber[chosenBarber.id], chosenBarber, bookedAppointments, slotDuration)
            const availableSlots = availableSlotsByBarber[chosenBarber.id];
                const detailedArray = availableSlots.map((slot) => {
                    const timestamp = slot;
                    const date = new Date(timestamp);
                    console.log("normal date:", date);

                    return { slot: date, barber: chosenBarber };
                })

                availableSlotsDetailed.push(...detailedArray);
           
        }

        console.log("timeslotsby barber", timeSlotsByBarber)

        console.log("BookedAppointments",bookedAppointments)

        

        function getAvailableTimeSlots(timeSlots, barber, bookedAppointments, slotDuration) {
            const availableSlots = timeSlots.filter((slot) => {
                const slotStartTime = slot;
                const slotEndTime = slot + minutesToMilliseconds(slotDuration);
                

                return !bookedAppointments.some((appointment) => {
                    const appointmentTimeUTC = Date.parse(appointment.time) 



                    // Calculate total duration of the appointment
                    const totalServiceDuration = appointment.services.reduce(
                        (total, service) => total + service.duration,
                        0
                    );

                   /*  const appointmentEndTime = appointmentTime + minutesToMilliseconds(totalServiceDuration); */
                    const appointmentEndTime = appointmentTimeUTC + minutesToMilliseconds(totalServiceDuration);


                    return (
                        (slotStartTime >= appointmentTimeUTC && slotStartTime < appointmentEndTime) ||
                        (slotEndTime > appointmentTimeUTC && slotEndTime <= appointmentEndTime)
                    );
                });
            });

          

            availableSlotsByBarber[barber.id] = availableSlots;
        }


        console.log("AvailableSlotsByBarber",availableSlotsByBarber)
        console.log("AvailableSlotsDetailed",availableSlotsDetailed)

   
        return new Response(JSON.stringify(availableSlotsDetailed), {status:200})

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}

