"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify } from "../utils";
import {
    Products,
    CountryCode,
    ProcessorTokenCreateRequest,
    ProcessorTokenCreateRequestProcessorEnum,
} from "plaid";
import { plaidClient } from "@/lib/plaid";
import { addFundingSource } from "./dwolla.actions";

import { consoleLog } from "@/lib/consoleLog";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(
            email,
            password
        );

        return parseStringify(response);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "signIn" });
    }
};

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("nota-bank-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "signUp" });
    }
};

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();

        const user = await account.get();

        return parseStringify(user);
    } catch (error) {
        return null;
    }
};

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete("nota-bank-session");

        await account.deleteSession("current");
    } catch (error) {
        return null;
    }
};

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: user.name,
            products: ["auth"] as Products[],
            language: "en",
            country_codes: ["US"] as CountryCode[],
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "createLinkToken" });
    }
};

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }
        );

        return parseStringify(bankAccount);
    } catch (error) {
        consoleLog({
            type: "error",
            message: error,
            label: "createBankAccount",
        });
    }
};

export const exchangePublicToken = async ({
    publicToken,
    user,
}: exchangePublicTokenProps) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
            account_id: accountData.account_id,
            access_token: accessToken,
        };

        const processorTokenResponse = await plaidClient.processorTokenCreate(
            request
        );

        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        });

        if (!fundingSourceUrl) throw Error;

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id),
        });
    } catch (error) {
        consoleLog({
            type: "error",
            message: error,
            label: "exchangePublicToken",
        });
    }
};
