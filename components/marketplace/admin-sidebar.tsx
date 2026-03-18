"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/app/admin/sidebar-context";
import { useUserApp } from "@/app/admin/user-app-context";
import {
	LayoutDashboard,
	Store,
	ChevronDown,
	ChevronRight,
	Building2,
	Blocks,
} from "lucide-react";

const marketplaceSubItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: <LayoutDashboard className="h-4 w-4" />,
		href: "/admin/marketplace" as const,
	},
	{
		id: "communities",
		label: "Comunidades",
		icon: <Building2 className="h-4 w-4" />,
	},
] as const;

const userAppItems = [
	{
		id: "benefitbox",
		label: "BenefitBox",
		icon: "https://api.dicebear.com/7.x/shapes/svg?seed=benefitbox&backgroundColor=0ea5e9",
	},
	{
		id: "sportclub",
		label: "SportClub",
		icon: "https://api.dicebear.com/7.x/shapes/svg?seed=sportclub&backgroundColor=f97316",
	},
] as const;

const userName = "Juan Perez";
const userEmail = "jperez@empresa.com";

function MarketplaceSidebarContent() {
	const pathname = usePathname();
	const sidebar = useSidebar();
	const collapsed = sidebar?.collapsed ?? false;
	const [marketplaceOpen, setMarketplaceOpen] = useState(true);

	const activeItem =
		pathname === "/admin/communities"
			? "communities"
			: pathname === "/admin/marketplace"
				? "dashboard"
				: pathname === "/admin"
					? "dashboard"
					: "marketplace";

	return (
		<ul className="space-y-1">
			<li>
				<button
					type="button"
					onClick={() => !collapsed && setMarketplaceOpen((o) => !o)}
					className={cn(
						"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
						["marketplace", "dashboard", "communities"].includes(activeItem)
							? "bg-primary/10 text-primary"
							: "text-muted-foreground hover:bg-muted hover:text-foreground",
						collapsed && "justify-center px-2",
					)}
					title={collapsed ? "Marketplace" : undefined}
				>
					<span>
						<Store className="h-5 w-5" />
					</span>
					{!collapsed && (
						<>
							<span className="flex-1 text-left">Marketplace</span>
							{marketplaceOpen ? (
								<ChevronDown className="h-4 w-4 shrink-0" />
							) : (
								<ChevronRight className="h-4 w-4 shrink-0" />
							)}
						</>
					)}
				</button>
				{!collapsed && marketplaceOpen && (
					<ul className="mt-1 space-y-0.5 border-l border-border/60 pl-4 ml-3">
						{marketplaceSubItems.map((sub) => {
							const isActive = activeItem === sub.id;
							const baseClass = cn(
								"flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-200",
								isActive
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-muted hover:text-foreground",
							);
							return (
								<li key={sub.id}>
									{"href" in sub && sub.href ? (
										<Link href={sub.href} className={baseClass}>
											<span className={cn(isActive && "text-primary")}>
												{sub.icon}
											</span>
											<span>{sub.label}</span>
										</Link>
									) : (
										<button
											type="button"
											className={baseClass}
											disabled
											title="Próximamente"
										>
											<span>{sub.icon}</span>
											<span>{sub.label}</span>
										</button>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</li>
		</ul>
	);
}

function UserSidebarContent() {
	const sidebar = useSidebar();
	const userApp = useUserApp();
	const collapsed = sidebar?.collapsed ?? false;
	const [appsOpen, setAppsOpen] = useState(true);
	const activeApp = userApp?.activeApp ?? "benefitbox";
	const setActiveApp = userApp?.setActiveApp ?? (() => {});

	return (
		<nav className="flex-1 overflow-y-auto px-3 pt-4 pb-4">
			<ul className="space-y-1">
				<li>
					<button
						type="button"
						onClick={() => !collapsed && setAppsOpen((o) => !o)}
						className={cn(
							"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
							"bg-primary/10 text-primary",
							collapsed && "justify-center px-2",
						)}
						title={collapsed ? "Aplicaciones Externas" : undefined}
					>
						<span>
							<Blocks className="h-5 w-5" />
						</span>
						{!collapsed && (
							<>
								<span className="flex-1 text-left">Aplicaciones Externas</span>
								{appsOpen ? (
									<ChevronDown className="h-4 w-4 shrink-0" />
								) : (
									<ChevronRight className="h-4 w-4 shrink-0" />
								)}
							</>
						)}
					</button>
					{!collapsed && appsOpen && (
						<ul className="mt-1 space-y-0.5 border-l border-border/60 pl-4 ml-3">
							{userAppItems.map((app) => {
								const isActive = activeApp === app.id;
								return (
									<li key={app.id}>
										<button
											type="button"
											onClick={() => setActiveApp(app.id)}
											className={cn(
												"flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-200",
												isActive
													? "bg-primary/10 text-primary"
													: "text-muted-foreground hover:bg-muted hover:text-foreground",
											)}
										>
											<span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
												<Image
													src={app.icon}
													alt=""
													width={32}
													height={32}
													className="object-cover"
													unoptimized
												/>
											</span>
											<span>{app.label}</span>
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</li>
			</ul>
		</nav>
	);
}

export function AdminSidebar() {
	const pathname = usePathname();
	const sidebar = useSidebar();
	const collapsed = sidebar?.collapsed ?? false;
	const isUserPage = pathname?.match(/^\/admin\/marketplace\/user\/[^/]+$/);

	return (
		<aside
			className={cn(
				"fixed left-0 z-40 flex flex-col border-r border-border/60 bg-card transition-all duration-300",
				"top-14 h-[calc(100vh-3.5rem)]",
				collapsed ? "w-[72px]" : "w-64",
			)}
		>
			{isUserPage ? (
				<UserSidebarContent />
			) : (
				<nav className="flex-1 overflow-y-auto px-3 pt-4 pb-4">
					<MarketplaceSidebarContent />
				</nav>
			)}
		</aside>
	);
}
