import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ href: "/about", label: "About Me" },
		{ href: "/contact", label: "Contact Me" },
	];

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled
					? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm"
					: "bg-white/80 dark:bg-black/80 backdrop-blur-sm"
			} border-b border-gray-100 dark:border-zinc-800`}
		>
			<div className="max-w-7xl mx-auto px-6 h-10 flex items-end justify-between">
				{/* Logo */}
				<motion.a
					href="/"
					className="font-bold font-clash text-lg tracking-normal uppercase text-black dark:text-white hover:opacity-70 transition-opacity"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					SARA EL AAM
				</motion.a>

				{/* Desktop Navigation */}
				<div className="hidden md:flex gap-8 text-base font-clash font-medium tracking-wide uppercase">
					{navLinks.map((link) => (
						<motion.a
							key={link.href}
							href={link.href}
							className="text-black dark:text-white hover:transition-colors relative group"
							whileHover={{ y: -2 }}
							transition={{ duration: 0.2 }}
						>
							{link.label}
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
						</motion.a>
					))}
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="md:hidden p-2 text-black dark:text-white"
					aria-label="Toggle menu"
				>
					<motion.div
						animate={isMobileMenuOpen ? "open" : "closed"}
						className="w-6 h-5 flex flex-col justify-between"
					>
						<motion.span
							variants={{
								closed: { rotate: 0, y: 0 },
								open: { rotate: 45, y: 8 },
							}}
							className="w-full h-0.5 bg-current origin-left transition-all"
						/>
						<motion.span
							variants={{
								closed: { opacity: 1 },
								open: { opacity: 0 },
							}}
							className="w-full h-0.5 bg-current transition-all"
						/>
						<motion.span
							variants={{
								closed: { rotate: 0, y: 0 },
								open: { rotate: -45, y: -8 },
							}}
							className="w-full h-0.5 bg-current origin-left transition-all"
						/>
					</motion.div>
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800"
					>
						<div className="px-6 py-4 space-y-4">
							{navLinks.map((link, index) => (
								<motion.a
									key={link.href}
									href={link.href}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="block text-sm font-medium tracking-wide uppercase text-black dark:text-white hover:text-primary transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.label}
								</motion.a>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
