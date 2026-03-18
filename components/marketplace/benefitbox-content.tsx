"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	Gift,
	Dumbbell,
	Heart,
	Utensils,
	Ticket,
	ShoppingBag,
	ChevronRight,
	Star,
	MapPin,
	Clock,
	Check,
	Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Benefit {
	id: string;
	name: string;
	category: string;
	provider: string;
	description: string;
	discount: string;
	image: string;
	location?: string;
	validUntil?: string;
	featured?: boolean;
}

const benefits: Benefit[] = [
	{
		id: "1",
		name: "Gimnasio SmartFit",
		category: "Fitness",
		provider: "SmartFit",
		description:
			"Acceso ilimitado a todas las sedes con clases grupales incluidas",
		discount: "40% OFF",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=gym&backgroundColor=10b981",
		location: "Todas las sedes",
		validUntil: "31 Dic 2026",
		featured: true,
	},
	{
		id: "2",
		name: "Cobertura Dental Plus",
		category: "Salud",
		provider: "DentalCorp",
		description:
			"Plan dental completo con ortodoncia y blanqueamiento incluido",
		discount: "30% OFF",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=dental&backgroundColor=ec4899",
		validUntil: "Permanente",
	},
	{
		id: "3",
		name: "Almuerzo Corporativo",
		category: "Comidas",
		provider: "PedidosYa",
		description: "Credito diario para almuerzo en restaurantes adheridos",
		discount: "$5.000/dia",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=food&backgroundColor=f59e0b",
		location: "Delivery o retiro",
	},
	{
		id: "4",
		name: "Entradas Cine 2x1",
		category: "Entretenimiento",
		provider: "Cinemark",
		description: "Todos los miercoles y jueves, todas las funciones",
		discount: "2x1",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=cinema&backgroundColor=6366f1",
		location: "Todos los complejos",
	},
	{
		id: "5",
		name: "Descuento en Indumentaria",
		category: "Shopping",
		provider: "Zara / H&M",
		description: "Descuento exclusivo en compras presenciales y online",
		discount: "25% OFF",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=shopping&backgroundColor=be185d",
		validUntil: "30 Jun 2026",
	},
	{
		id: "6",
		name: "Sesiones de Terapia",
		category: "Bienestar",
		provider: "MindCare",
		description: "4 sesiones mensuales de terapia psicologica online",
		discount: "100% Cubierto",
		image:
			"https://api.dicebear.com/7.x/shapes/svg?seed=therapy&backgroundColor=8b5cf6",
		featured: true,
	},
];

const categories = [
	{ id: "all", label: "Todos", icon: Gift },
	{ id: "fitness", label: "Fitness", icon: Dumbbell },
	{ id: "salud", label: "Salud", icon: Heart },
	{ id: "comidas", label: "Comidas", icon: Utensils },
	{ id: "entretenimiento", label: "Entretenimiento", icon: Ticket },
	{ id: "shopping", label: "Shopping", icon: ShoppingBag },
];

export function BenefitBoxContent() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [activatedBenefits, setActivatedBenefits] = useState<string[]>([]);

	const filteredBenefits =
		selectedCategory === "all"
			? benefits
			: benefits.filter((b) => b.category.toLowerCase() === selectedCategory);

	const handleActivate = (id: string) => {
		setActivatedBenefits((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	return (
		<div className="flex h-full flex-col bg-gradient-to-b from-cyan-50/50 to-background">
			{/* Header interno de BenefitBox */}
			<div className="border-b border-border bg-card px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">
							<Gift className="h-5 w-5 text-white" />
						</div>
						<div>
							<h1 className="text-lg font-semibold text-foreground">
								BenefitBox
							</h1>
							<p className="text-sm text-muted-foreground">
								Tus beneficios corporativos
							</p>
						</div>
					</div>
					<Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
						<Sparkles className="mr-1 h-3 w-3" />
						{activatedBenefits.length} activos
					</Badge>
				</div>
			</div>

			{/* Categorias */}
			<div className="border-b border-border bg-card/50 px-6 py-3">
				<div className="flex gap-2 overflow-x-auto pb-1">
					{categories.map((cat) => {
						const Icon = cat.icon;
						const isSelected = selectedCategory === cat.id;
						return (
							<button
								key={cat.id}
								type="button"
								onClick={() => setSelectedCategory(cat.id)}
								className={cn(
									"flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
									isSelected
										? "bg-cyan-500 text-white"
										: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
								)}
							>
								<Icon className="h-4 w-4" />
								{cat.label}
							</button>
						);
					})}
				</div>
			</div>

			{/* Grid de beneficios */}
			<div className="flex-1 overflow-y-auto p-6">
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredBenefits.map((benefit) => {
						const isActivated = activatedBenefits.includes(benefit.id);
						return (
							<Card
								key={benefit.id}
								className={cn(
									"group overflow-hidden transition-all duration-200 hover:shadow-lg",
									benefit.featured && "ring-2 ring-cyan-500/20",
									isActivated && "ring-2 ring-green-500/30",
								)}
							>
								<CardHeader className="relative p-0">
									<div
										className="flex h-32 items-center justify-center"
										style={{
											backgroundColor: benefit.image.match(
												/backgroundColor=(\w+)/,
											)?.[1]
												? `#${benefit.image.match(/backgroundColor=(\w+)/)?.[1]}20`
												: "#f1f5f9",
										}}
									>
										<img
											src={benefit.image}
											alt={benefit.name}
											className="h-16 w-16 transition-transform duration-200 group-hover:scale-110"
										/>
									</div>
									{benefit.featured && (
										<Badge className="absolute left-3 top-3 bg-yellow-500 text-yellow-950">
											<Star className="mr-1 h-3 w-3" />
											Destacado
										</Badge>
									)}
									<div className="absolute right-3 top-3">
										<Badge className="bg-cyan-600 text-white font-semibold">
											{benefit.discount}
										</Badge>
									</div>
								</CardHeader>
								<CardContent className="p-4">
									<div className="mb-2 flex items-start justify-between">
										<div>
											<h3 className="font-semibold text-foreground">
												{benefit.name}
											</h3>
											<p className="text-xs text-muted-foreground">
												{benefit.provider}
											</p>
										</div>
									</div>
									<p className="mb-3 text-sm text-muted-foreground line-clamp-2">
										{benefit.description}
									</p>
									<div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
										{benefit.location && (
											<span className="flex items-center gap-1">
												<MapPin className="h-3 w-3" />
												{benefit.location}
											</span>
										)}
										{benefit.validUntil && (
											<span className="flex items-center gap-1">
												<Clock className="h-3 w-3" />
												{benefit.validUntil}
											</span>
										)}
									</div>
									<Button
										className={cn(
											"w-full",
											isActivated
												? "bg-green-600 hover:bg-green-700"
												: "bg-cyan-600 hover:bg-cyan-700",
										)}
										onClick={() => handleActivate(benefit.id)}
									>
										{isActivated ? (
											<>
												<Check className="mr-2 h-4 w-4" />
												Activado
											</>
										) : (
											<>
												Activar beneficio
												<ChevronRight className="ml-2 h-4 w-4" />
											</>
										)}
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Footer */}
			<div className="border-t border-border bg-card/50 px-6 py-3 text-center text-xs text-muted-foreground">
				Powered by <span className="font-medium text-cyan-600">BenefitBox</span>{" "}
				| Soporte: support@benefitbox.com
			</div>
		</div>
	);
}
