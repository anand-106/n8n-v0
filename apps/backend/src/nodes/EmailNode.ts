
import { ExecutionContext } from "../services/executionService";
import nodemailer from 'nodemailer'
import { CredentialSchema, ParameterSchema } from "./types";

export class EmailNode {

    getparameterSchema():Record <string,ParameterSchema>{
        return {
            to:{
                type: 'string',
                required: true
            },
            subject:{
                type: 'string',
                required: true
            },
            body: {
                type: 'string',
                required:true,
            }
        }
    }

    getCredentialSchema():Record<string,CredentialSchema>{
        return {
            user: {
                type:'username',
                required:true
            },
            pass:{
                type:'password',
                required:true
            }
        }
    }

    async execute(
        parameters: Record<string,any>,
        credentials: Record<string,any>,
        context: ExecutionContext
    ) :Promise<{success:boolean}> {
        const {to,subject,body} = parameters
        const {user, password} = credentials

        try{

            
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:user,
                    pass:password
                }
            })
            
            const mailOptions = {
                from: user,
                to: to,
                subject: subject,
                text: body,
            }

          await  transporter.sendMail(mailOptions)
          return {
            success:true
        }
            
        }catch(e){
            console.error("error sending email using node mailer",e)
           return {
                success:false
            }
        }

    }
}