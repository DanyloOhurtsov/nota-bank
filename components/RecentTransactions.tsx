import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";

const RecentTransactions = ({
    accounts,
    transactions,
    page,
    appwriteItemId,
}: RecentTransactionsProps) => {
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent Transaction
                </h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    View all
                </Link>
            </header>
            
            {/* Mapping all accounts only if more then 1 */}
            {accounts.length > 1 && (
                <Tabs defaultValue={appwriteItemId} className="w-full">
                    <TabsList className="recent-transactions-tablist">
                        {accounts.map((account: Account) => (
                            <TabsTrigger
                                key={account.appwriteItemId}
                                value={account.appwriteItemId}
                            >
                                <BankTabItem
                                    account={account}
                                    appwriteItemId={appwriteItemId}
                                />
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {accounts.map((account: Account) => (
                        <TabsContent
                            key={account.appwriteItemId}
                            value={account.appwriteItemId}
                            className="sapce-y-4"
                        >
                            <BankInfo
                                account={account}
                                appwriteItemId={appwriteItemId}
                                type="full"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </section>
    );
};

export default RecentTransactions;
