interface ConsoleLogProps {
    type: "error" | "log";
    message: string;
    label: string;
}

export const consoleLog = ({ type, message, label }) => {
    if (type === "error") {
        console.error(`!!! ERROR - ${label} !!!`, message);
    }
};
