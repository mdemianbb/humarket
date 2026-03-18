"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function AdminNavbar() {
	const sidebar = useSidebar();

	return (
		<header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-purple-700 px-4 text-white">
			<button
				type="button"
				onClick={sidebar?.toggleCollapsed}
				className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white"
				title={sidebar?.collapsed ? "Abrir sidebar" : "Colapsar sidebar"}
			>
				{sidebar?.collapsed ? (
					<PanelLeftOpen className="h-5 w-5" />
				) : (
					<PanelLeftClose className="h-5 w-5" />
				)}
			</button>
			<div className="flex items-center gap-3">
				<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
					<span className="text-sm font-semibold text-white">AD</span>
				</div>
				<div className="hidden text-right sm:block">
					<p className="text-sm font-medium text-white">Admin User</p>
					<p className="max-w-[140px] truncate text-xs text-purple-200">
						admin@humarket.com
					</p>
				</div>
			</div>
		</header>
	);
}
