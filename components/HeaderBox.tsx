
const HeaderBox = ({
    type = "title",
    title,
    user,
    subtext,
}: HeaderBoxProps) => {
    return (
        <div className="header-box">
            <h1 className="header-box-title flex">
                {title}
                {type === "greeting" && (
                    <p>
                        ,&nbsp;<span className="text-bankGradient">{user}</span>
                    </p>
                )}
            </h1>
            <p className="header-box-sutext">{subtext}</p>
        </div>
    );
};

export default HeaderBox;
