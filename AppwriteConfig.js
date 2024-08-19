import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('66c17f130031fa10b9e1') // Replace with your project ID
    //.setPlatform("com.loan.app");

export const account = new Account(client);
export const databases = new Databases(client);
