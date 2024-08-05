"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname();

    return (
        <section className="sidebar">
            <div className="flex flex-col gap-4">
                <Link
                    href={"/"}
                    className="mb-12 cursor-pointer flex items-center gap-2"
                >
                    <Image
                        src={"/icons/logo.svg"}
                        alt="Logo"
                        width={34}
                        height={34}
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">NotA</h1>
                </Link>

                {/* <SearchBox/> */}
                <nav className="flex flex-col gap-y-4">
                    {sidebarLinks.map((link) => {
                        const isActive =
                            pathname === link.route ||
                            pathname.startsWith(`${link.route}/`);

                        return (
                            <Link
                                href={link.route}
                                key={link.route}
                                className={cn("sidebar-link", {
                                    "bg-bank-gradient": isActive,
                                })}
                            >
                                <div className="relative size-6">
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        fill
                                        className={cn({
                                            "brightness-[3] invert-0": isActive,
                                        })}
                                    />
                                </div>
                                <p
                                    className={cn("sidebar-label", {
                                        "!text-white": isActive,
                                    })}
                                >
                                    {link.label}
                                </p>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <Footer user={user} type="desktop" />
        </section>
    );
};

export default Sidebar;
