import { Card } from "@prisma/client";
import client from "../config/prisma";
import { IInsertCard } from "../interfaces/card-interface";
import { TitlesList } from "../types/userTypes";

export async function cardTitles (userId: string){
    const response : TitlesList | null = await client.card.findMany({
        where:{
            userId: userId
        },
        select:{
            id: true,
            title: true
        }
    });
    return response;
};

export async function searchById(id: string){
    const response : Card | null = await client.card.findFirst({
        where:{
            id: id
        }
    });
    return response;
};

export async function insertData (data: IInsertCard){
    await client.card.create({
        data: data
    });
};

export async function deleteById(id: string){
    await client.card.delete({
        where:{
            id: id
        }
    });
};

export async function validateTitle(title:string, userId:string){
    const response : Card | null = await client.card.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    });
    return response
};