import { formatAmount } from "@/lib/utils";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";

const BankCard = ({
    account,
    userName,
    showBalance = true,
}: CreditCardProps) => {
    return (
        <div className="flex flex-col">
            <Link href={"/"} className="bank-card">
                <div className="bank-card_content">
                    <div>
                        <p className="text-16 font-semibold text-white">
                            {account.name || userName}
                        </p>
                        <p className="font-ibm-plex-serif font-black text-white">
                            <AnimatedCounter amount={account.currentBalance} />
                        </p>
                    </div>

                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <p className="text-12 font-semibold text-white">
                                {userName}
                            </p>
                            <p className="text-12 font-semibold text-white">
                                ** / **
                            </p>
                        </div>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            **** **** **** ****{" "}
                            <span className="text-16">${account.mask}</span>
                        </p>
                    </article>
                </div>
                <div className="bank-card_icon">
                    <Image src={'/icons/Paypass.svg'} width={20} height={24} alt="paypass"/>
                </div>
            </Link>
        </div>
    );
};

export default BankCard;
