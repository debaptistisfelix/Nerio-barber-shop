import { PrismaClient } from "@prisma/client";
import sendBugDetectorMail from "@app/libs/email/sendBugDetectorMail";
const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export async function POST(request){
    const body = await request.json();
    const {name, description, path} = body;
    const email = process.env.DEV_EMAIL

    console.log("path: ", path)

 try{
        sendBugDetectorMail(email, name, description, path)
        return new Response(JSON.stringify({message: "success"}), {status: 200})
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500})
    } 
    return new Response(JSON.stringify({message: "success"}), {status: 200})
  
    
}