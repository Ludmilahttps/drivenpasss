import {Request, Response} from "express";
import { ICredentialRequest } from "../interfaces/credential-interface";
import * as credentialService from "../services/credential-service";
import { DecryptDataObject, TitlesList } from "../types/userTypes";


export async function allTitles (req: Request, res: Response){
    const {userId} = res.locals.userId
    const response : TitlesList | null = await credentialService.getAllCredentials(userId);
    return res.status(200).send(response);
};
export async function infoById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    const response : DecryptDataObject = await credentialService.getCredentialById(userId, id)
    return res.status(200).send(response);
};
export async function newCredential (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const request : ICredentialRequest = req.body;
    await credentialService.validateTitle(request.title, userId);
    await credentialService.createCredential(request, userId);
    return res.status(201).send("Sucessfull")
};
export async function deleteById (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const {id} = req.params;
    await credentialService.deleteCredentialById(userId, id);
    return res.status(204).send("Sucessfull");
};