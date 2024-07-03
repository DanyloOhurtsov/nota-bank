import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
    const loggedIn = {
        firstName: "Danylo",
        lastName: "Ohurtsov",
        email: "ogurtsov.danylo@gmail.com",
    };

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || "Guest"}
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
