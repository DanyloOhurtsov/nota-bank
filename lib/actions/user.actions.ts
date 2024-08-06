"use server";

import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { plaidClient } from "@/lib/plaid";
import { consoleLog } from "@/lib/consoleLog";
import { createAdminClient, createSessionClient } from "../appwrite";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
    Products,
    CountryCode,
    ProcessorTokenCreateRequest,
    ProcessorTokenCreateRequestProcessorEnum,
} from "plaid";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );

        return parseStringify(user.documents[0]);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "getUserInfo" });
    }
};
export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

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

        const user = await getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "signIn" });
    }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        if (!newUserAccount) throw new Error("Error creating user account");

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...userData,
            type: "personal",
        });

        if (!dwollaCustomerUrl)
            throw new Error("Error creating Dwolla customer");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,
            }
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

        return parseStringify(newUser);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "signUp" });
    }
};

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id });

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
            client_name: `${user.firstName} ${user.lastName}`,
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

export const getBanks = async ({ userId }: getBanksProps) => {
    try {
        const { database } = await createAdminClient();

        const test = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );

        return parseStringify(test.documents);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "Get Banks" });
    }
};

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal("$id", [documentId])]
        );

        return parseStringify(bank.documents[0]);
    } catch (error) {
        consoleLog({ type: "error", message: error, label: "Get Bank" });
    }
};
