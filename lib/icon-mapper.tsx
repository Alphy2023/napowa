import React from 'react'
import {
  Heart,
  Brain,
  HandMetal,
  Trophy,
  Star,
  Zap,
  Target,
  Users,
  Lightbulb,
  Award,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Gem,
  Rocket,
  Shield,
  Smile,
  BookOpen,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Heart,
  Brain,
  HandMetal,
  Trophy,
  Star,
  Zap,
  Target,
  Users,
  Lightbulb,
  Award,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Gem,
  Rocket,
  Shield,
  Smile,
  BookOpen,
}

export const getIconComponent = (iconName: string, className: string = '') => {
  const IconComponent = ICON_MAP[iconName] || Trophy

  return <IconComponent className={className} />
}
