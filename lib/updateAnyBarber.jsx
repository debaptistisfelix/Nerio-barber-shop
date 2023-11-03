import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const updateAnyBarber = async (newBarber) => {
    try {
        const barbers = await prisma.barber.findMany({
            where:{
                not:{
                    name: "Any"
                }
            }
        });

        if(!barbers) return "Error";

        const updatedAnyValue = barbers.map((barber)=>{return barber.name}).join(",");

        const updatedAnyBarber = await prisma.barber.update({
            where:{
                name: "Any"
            },
            data:{
                value: updatedAnyValue
            }
        });

        return "Success"

    } catch (error) {
        console.log(error)
        return "Error";
    }
}

export default updateAnyBarber;

