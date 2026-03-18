"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	ExternalLink,
	Maximize2,
	Minimize2,
	RefreshCw,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppEmbedProps {
	src: string;
	appName: string;
	appColor?: string;
	fallbackContent?: React.ReactNode;
	className?: string;
}

/**
 * AppEmbed - Componente para embeber aplicaciones externas via iframe
 *
 * Para integrar un servicio externo real:
 * 1. El servicio debe permitir ser embebido (X-Frame-Options)
 * 2. Configurar CSP en next.config.js si es necesario
 * 3. Pasar la URL del servicio en `src`
 * 4. Opcionalmente pasar tokens de auth via postMessage o query params
 */
export function AppEmbed({
	src,
	appName,
	appColor = "#0ea5e9",
	fallbackContent,
	className,
}: AppEmbedProps) {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [key, setKey] = useState(0);

	const handleRefresh = () => {
		setKey((prev) => prev + 1);
		setIsLoading(true);
		setHasError(false);
	};

	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	const handleIframeError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	return (
		<div
			className={cn(
				"flex flex-col overflow-hidden rounded-xl border border-border bg-card",
				isFullscreen && "fixed inset-0 z-50 rounded-none",
				className,
			)}
		>
			{/* Toolbar */}
			<div
				className="flex items-center justify-between border-b border-border px-4 py-2"
				style={{ backgroundColor: `${appColor}10` }}
			>
				<div className="flex items-center gap-2">
					<div
						className="h-3 w-3 rounded-full"
						style={{ backgroundColor: appColor }}
					/>
					<span className="text-sm font-medium text-foreground">{appName}</span>
					{isLoading && (
						<RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />
					)}
				</div>
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={handleRefresh}
						title="Recargar"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={() => window.open(src, "_blank")}
						title="Abrir en nueva pestaña"
					>
						<ExternalLink className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={() => setIsFullscreen(!isFullscreen)}
						title={
							isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
						}
					>
						{isFullscreen ? (
							<Minimize2 className="h-4 w-4" />
						) : (
							<Maximize2 className="h-4 w-4" />
						)}
					</Button>
				</div>
			</div>

			{/* Content */}
			<div className="relative flex-1">
				{hasError ? (
					<div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4 p-8 text-center">
						<AlertCircle className="h-12 w-12 text-destructive" />
						<div>
							<p className="font-medium text-foreground">
								No se pudo cargar la aplicación
							</p>
							<p className="mt-1 text-sm text-muted-foreground">
								La aplicación externa no está disponible o no permite ser
								embebida.
							</p>
						</div>
						<Button onClick={handleRefresh} variant="outline">
							<RefreshCw className="mr-2 h-4 w-4" />
							Reintentar
						</Button>
					</div>
				) : fallbackContent ? (
					// Si hay contenido fallback (para demo/simulación), mostrarlo
					<div className="h-full min-h-[500px]">{fallbackContent}</div>
				) : (
					// iframe real para embeber servicio externo
					<iframe
						key={key}
						src={src}
						className="h-full min-h-[500px] w-full border-0"
						onLoad={handleIframeLoad}
						onError={handleIframeError}
						sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
						title={`${appName} embedded application`}
					/>
				)}
			</div>
		</div>
	);
}
