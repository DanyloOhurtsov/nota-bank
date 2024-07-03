"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({ amount = 0 }) => {
    return <CountUp end={amount} decimal="," prefix="$" decimals={2} />;
};

export default AnimatedCounter;
