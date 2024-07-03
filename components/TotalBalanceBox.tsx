"use client";
import CountUp from "react-countup";
import AnimatedCounter from "./AnimatedCounter";
import DonutChart from "./DonutChart";

const TotalBalanceBox = ({
    accounts = [],
    totalBanks,
    totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                <DonutChart accounts={accounts} />
            </div>
            <div className="flex flex-col">
                <h2 className="header-2">
                    Bank Accounts:&nbsp;
                    <CountUp end={totalBanks} />
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">Total Current Balance</p>
                    <div className="total-balance-amount flex-center gap-2">
                        <div className="w-full">
                            <AnimatedCounter amount={totalCurrentBalance} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TotalBalanceBox;
