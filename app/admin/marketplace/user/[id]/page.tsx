"use client"

import { useUserApp } from "@/app/admin/user-app-context"
import { AppEmbed } from "@/components/marketplace/app-embed"
import { BenefitBoxContent } from "@/components/marketplace/benefitbox-content"
import { SportClubContent } from "@/components/marketplace/sportclub-content"

const appConfigs: Record<
  string,
  { embedUrl: string; color: string; useLocalContent?: boolean }
> = {
  benefitbox: {
    embedUrl: "https://benefitbox.example.com/embed",
    color: "#0ea5e9",
    useLocalContent: true,
  },
  sportclub: {
    embedUrl: "https://sportclub.example.com/embed",
    color: "#f97316",
    useLocalContent: true,
  },
}

const localContentMap: Record<string, React.ReactNode> = {
  benefitbox: <BenefitBoxContent />,
  sportclub: <SportClubContent />,
}

const appLabels: Record<string, string> = {
  benefitbox: "BenefitBox",
  sportclub: "SportClub",
}

interface PageProps {
  params: { id: string }
}

export default function UserAppPage({ params }: PageProps) {
  const userApp = useUserApp()
  const activeApp = userApp?.activeApp ?? "benefitbox"
  const userId = params.id

  const currentAppConfig = appConfigs[activeApp]
  const currentAppLabel = appLabels[activeApp] ?? "App"

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {currentAppLabel}
        </h1>
        <p className="text-sm text-muted-foreground">
          Aplicación integrada para tu comunidad (usuario #{userId})
        </p>
      </div>
      <AppEmbed
        src={currentAppConfig.embedUrl}
        appName={currentAppLabel}
        appColor={currentAppConfig.color}
        fallbackContent={
          currentAppConfig.useLocalContent
            ? localContentMap[activeApp]
            : undefined
        }
        className="h-[calc(100vh-160px)]"
      />
    </div>
  )
}
