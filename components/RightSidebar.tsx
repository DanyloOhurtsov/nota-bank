import Image from "next/image";
import Link from "next/link";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] =
        countTransactionCategories(transactions);

    return (
        <aside className="right-sidebar overflow-hidden">
            {/* User information */}
            <section className="flex flex-col">
                <div className="profile-banner" />
            </section>

            {/* Banks information */}
            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2">My banks</h2>
                    <Link href={"/"} className="flex gap-2">
                        <Image
                            src={"/icons/plus.svg"}
                            width={20}
                            height={20}
                            alt="plus"
                        />
                        <p className="text-14 font-semibold text-gray-600">
                            Add Bank
                        </p>
                    </Link>
                </div>
                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className="relative z-10">
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-10 flex flex-1 flex-col gap-6">
                    <h2 className="header-2">Top Categories</h2>
                    <div className="space-y-5">
                        {categories.map((category, index) => (
                            <Category />
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default RightSidebar;
