import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
    accounts,
    transactions,
    page,
    appwriteItemId,
}: RecentTransactionsProps) => {
    const rowsPerPage = 4;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

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
                    <TransactionsTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={page} />
                        </div>
                    )}
                </Tabs>
            )}
        </section>
    );
};

export default RecentTransactions;
