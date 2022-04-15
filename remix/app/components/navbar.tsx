import { Link, NavLink } from "@remix-run/react";
import { FC, useState } from "react";
import { rootQuery_mainMenu_data_attributes_Link } from "~/utils/queries/rootQuery/__generated__/rootQuery";
import ResponsiveImage, { Image } from "./image";
import { motion } from "framer-motion";

const Navbar: FC<{
    navItems: (rootQuery_mainMenu_data_attributes_Link | null)[];
    onMenuToggle: (isOpen: boolean) => void;
    logo?: Image;
}> = ({ navItems, onMenuToggle, logo }) => {
    const [open, setOpen] = useState(false);

    const handleMenuToggle = () => {
        onMenuToggle(!open);
        setOpen(!open);
    };

    const handleLinkClicked = () => {
        setOpen(false);
        onMenuToggle(false);
    };
    return (
        <motion.nav
            className={`px-4 mb-0 flex flex-col transition-[height] fixed top-0 z-50 w-full will-change-auto bg-primary-500 h-16 md:h-24`}
            animate={open ? "open" : "closed"}
        >
            <div className="container mx-auto flex items-center h-16 md:h-24 justify-between z-30">
                {logo && (
                    <Link to={"/"}>
                        <ResponsiveImage image={logo} className={`h-10 w-auto`} sizes="198px" preload />
                    </Link>
                )}
                <div className="flex z-40">
                    <ul className="hidden md:flex ">
                        {navItems.map((n) => {
                            return n ? <NavItem item={n} key={n.Title} /> : null;
                        })}
                    </ul>
                </div>
                <div className="block md:hidden">
                    <div className="space-y-1 hover:cursor-pointer" onClick={handleMenuToggle}>
                        <span className={"block w-6 h-0.5 bg-white transition-transform" + (open ? " rotate-[225deg] translate-y-1.5" : "")}></span>
                        <span className={"block w-6 h-0.5 bg-white transition-all" + (open ? " opacity-0" : "")}></span>
                        <span className={"block w-6 h-0.5 bg-white transition-transform" + (open ? " -rotate-[225deg] -translate-y-1.5" : "")}></span>
                    </div>
                </div>
                <motion.div
                    className={`absolute top-0 right-0 overflow-hidden w-16 h-16 md:hidden bg-primary-500 -z-10 rounded-full pointer-events-none`}
                    variants={{
                        open: { scale: 40 },
                        closed: { scale: 1 },
                    }}
                    transition={{
                        bounce: false,
                    }}
                ></motion.div>
                <motion.div
                    className={`fixed w-screen h-screen md:hidden pointer-events-none z-20 rounded-full`}
                    variants={{
                        open: { transition: { when: "beforeChildren", staggerChildren: 0.1, delayChildren: 0.1 } },
                        closed: { transition: { when: "afterChildren" } },
                    }}
                >
                    <div className="fixed top-0 left-0 w-screen h-screen">
                        <ul className="flex flex-1 flex-col items-center content-center justify-center h-full z-20">
                            {navItems.map((n) => {
                                return n ? <NavItem item={n} onClick={handleLinkClicked} key={n.Title} animated /> : null;
                            })}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

const NavItem = ({ item, onClick, animated }: { item: rootQuery_mainMenu_data_attributes_Link; onClick?: () => void; animated?: boolean }) => {
    return animated ? (
        <motion.li className="mx-2 my-2 pointer-events-auto" variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}>
            <NavItemInners item={item} onClick={onClick} />
        </motion.li>
    ) : (
        <li className="mx-2 my-2 pointer-events-auto">
            <NavItemInners item={item} onClick={onClick} />
        </li>
    );
};

const NavItemInners = ({ item, onClick }: { item: rootQuery_mainMenu_data_attributes_Link; onClick?: () => void }) => {
    return item?.Url?.startsWith("http") || item?.Url?.startsWith("//") ? (
        <a
            className="font-sans text-md text-gray-50 hover:text-gray-200"
            href={item?.Url}
            target={item?.NewWindow ? "_blank" : ""}
            onClick={onClick && (() => onClick())}
        >
            {item?.Title}
        </a>
    ) : (
        <NavLink
            className={({ isActive }) => {
                return `font-sans text-md text-gray-50 hover:text-gray-200 ${isActive ? "font-bold underline" : ""}`;
            }}
            to={item?.Url || ""}
            prefetch="render"
            target={item?.NewWindow ? "_blank" : ""}
            onClick={onClick && (() => onClick())}
        >
            {item?.Title}
        </NavLink>
    );
};

export default Navbar;
