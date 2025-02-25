"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/icons/hamburger.svg"}
                        width={30}
                        height={30}
                        alt="menu"
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side={"right"} className="border-none bg-white">
                    <div className="flex flex-col gap-4">
                        <Link
                            href={"/"}
                            className="cursor-pointer flex items-center gap-1 px-4"
                        >
                            <Image
                                src={"/icons/logo.svg"}
                                alt="Logo"
                                width={34}
                                height={34}
                            />
                            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                                NotA
                            </h1>
                        </Link>
                        <div className="mobilenav-sheet">
                            <SheetClose asChild>
                                <nav className="flex flex-col gap-y-4">
                                    {sidebarLinks.map((link) => {
                                        const isActive =
                                            pathname === link.route ||
                                            pathname.startsWith(
                                                `${link.route}/`
                                            );

                                        return (
                                            <SheetClose
                                                asChild
                                                key={link.route}
                                            >
                                                <Link
                                                    href={link.route}
                                                    className={cn(
                                                        "mobilenav-sheet_close w-full",
                                                        {
                                                            "bg-bank-gradient":
                                                                isActive,
                                                        }
                                                    )}
                                                >
                                                    <Image
                                                        src={link.imgURL}
                                                        alt={link.label}
                                                        width={20}
                                                        height={20}
                                                        className={cn({
                                                            "brightness-[3] invert-0":
                                                                isActive,
                                                        })}
                                                    />
                                                    <p
                                                        className={cn(
                                                            "text-16 font-semibold text-black-2",
                                                            {
                                                                "!text-white":
                                                                    isActive,
                                                            }
                                                        )}
                                                    >
                                                        {link.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                    <PlaidLink user={user} />
                                </nav>
                            </SheetClose>
                            {/* Footer */}
                                <Footer user={user} type="mobile" />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
