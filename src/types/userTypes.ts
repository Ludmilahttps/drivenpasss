import { Credential, Card, Network } from "@prisma/client";

export type DecryptDataObject = | Card | Credential | Network

export type TitlesList = { id: string; title: string; }[]

export type TokenConfig = { headers : {
    Authorization : string
}};

export type CategoryCount = {title: string, quantity: number}[]