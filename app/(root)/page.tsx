import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
    const loggedIn = await getLoggedInUser();

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || "Guest"}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={10}
                        totalCurrentBalance={132468}
                    />
                </header>
                RECENT TRANSACTIONS
            </div>

            {/* User and Banks information */}
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 1000 }, {}]}
            />
        </section>
    );
};

export default Home;
