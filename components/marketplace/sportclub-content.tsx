"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Dumbbell, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Users,
  Trophy,
  Heart
} from "lucide-react"

interface GymClass {
  id: string
  name: string
  instructor: string
  time: string
  duration: string
  spots: number
  maxSpots: number
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
}

interface Gym {
  id: string
  name: string
  address: string
  rating: number
  distance: string
  image: string
  amenities: string[]
}

const todayClasses: GymClass[] = [
  {
    id: "1",
    name: "Yoga Flow",
    instructor: "Maria Garcia",
    time: "08:00",
    duration: "60 min",
    spots: 3,
    maxSpots: 15,
    difficulty: "Principiante"
  },
  {
    id: "2",
    name: "CrossFit WOD",
    instructor: "Carlos Martinez",
    time: "10:00",
    duration: "45 min",
    spots: 8,
    maxSpots: 20,
    difficulty: "Avanzado"
  },
  {
    id: "3",
    name: "Spinning",
    instructor: "Ana Lopez",
    time: "12:00",
    duration: "50 min",
    spots: 5,
    maxSpots: 25,
    difficulty: "Intermedio"
  },
  {
    id: "4",
    name: "Pilates Mat",
    instructor: "Laura Fernandez",
    time: "18:00",
    duration: "55 min",
    spots: 10,
    maxSpots: 12,
    difficulty: "Principiante"
  }
]

const nearbyGyms: Gym[] = [
  {
    id: "1",
    name: "SportClub Central",
    address: "Av. Corrientes 1234",
    rating: 4.8,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop",
    amenities: ["Piscina", "Sauna", "Spinning"]
  },
  {
    id: "2",
    name: "SportClub Norte",
    address: "Av. Cabildo 2456",
    rating: 4.6,
    distance: "2.3 km",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=200&fit=crop",
    amenities: ["CrossFit", "Yoga", "Musculacion"]
  },
  {
    id: "3",
    name: "SportClub Palermo",
    address: "Honduras 4567",
    rating: 4.9,
    distance: "3.1 km",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=200&fit=crop",
    amenities: ["Piscina", "Canchas", "Spa"]
  }
]

export function SportClubContent() {
  const [reservedClasses, setReservedClasses] = useState<string[]>([])
  const [favoriteGyms, setFavoriteGyms] = useState<string[]>([])

  const handleReserve = (classId: string) => {
    if (reservedClasses.includes(classId)) {
      setReservedClasses(prev => prev.filter(id => id !== classId))
    } else {
      setReservedClasses(prev => [...prev, classId])
    }
  }

  const toggleFavorite = (gymId: string) => {
    if (favoriteGyms.includes(gymId)) {
      setFavoriteGyms(prev => prev.filter(id => id !== gymId))
    } else {
      setFavoriteGyms(prev => [...prev, gymId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Intermedio":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20"
      case "Avanzado":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
              <Calendar className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Clases este mes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Dumbbell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Horas entrenadas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Trophy className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Logros obtenidos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Sedes visitadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Classes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Clases de hoy</h2>
          <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600">
            Ver todas
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {todayClasses.map((cls) => {
            const isReserved = reservedClasses.includes(cls.id)
            const spotsLeft = cls.maxSpots - cls.spots
            
            return (
              <Card 
                key={cls.id} 
                className={`transition-all duration-200 ${
                  isReserved ? "border-orange-500/40 bg-orange-500/5" : "hover:border-border"
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">{cls.instructor}</p>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(cls.difficulty)}>
                      {cls.difficulty}
                    </Badge>
                  </div>

                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{cls.time} - {cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{spotsLeft} lugares disponibles</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      isReserved 
                        ? "bg-orange-500 hover:bg-orange-600" 
                        : "bg-foreground hover:bg-foreground/90"
                    }`}
                    size="sm"
                    onClick={() => handleReserve(cls.id)}
                  >
                    {isReserved ? "Reservado" : "Reservar"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Nearby Gyms */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Sedes cercanas</h2>
          <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600">
            Ver mapa
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {nearbyGyms.map((gym) => {
            const isFavorite = favoriteGyms.includes(gym.id)
            
            return (
              <Card key={gym.id} className="overflow-hidden transition-all duration-200 hover:border-border">
                <div className="relative h-32">
                  <img 
                    src={gym.image} 
                    alt={gym.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(gym.id)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`} 
                    />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{gym.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{gym.rating}</span>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{gym.address}</span>
                    <span className="text-orange-500">({gym.distance})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {gym.amenities.map((amenity) => (
                      <Badge 
                        key={amenity} 
                        variant="secondary" 
                        className="bg-muted/50 text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
