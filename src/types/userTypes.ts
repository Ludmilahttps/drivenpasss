import { Credential, Card, Network } from "@prisma/client";
import { IInsertCard } from "../interfaces/card-interface";
import { IInsertCredential } from "../interfaces/credential-interface";
import { IInsertNetwork } from "../interfaces/network-interface";

export type DecryptDataObject = | Card | Credential | Network
export type EncryptDataObject = | IInsertCredential | IInsertCard | IInsertNetwork

export type TitlesList = { id: string; title: string; }[]

export type TokenConfig = { headers : {
    Authorization : string
}};

export type CategoryCount = {title: string, quantity: number}[]