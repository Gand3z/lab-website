import type { Component } from 'vue'

export type TeamGroup = 'mentor' | 'member'
export type NewsCategory = 'dynamic' | 'lab'
export type DetailField = 'bio' | 'projects' | 'awards' | 'publications' | 'patents'

export type TeamPerson = {
  id: number
  name: string
  group: TeamGroup
  title: string
  avatar: string
  email?: string
  office?: string
  homepage?: string
  researchDirection?: string
} & Record<DetailField, string[]>

export type NewsItem = {
  id: number
  category: NewsCategory
  date: string
  title: string
  img?: string
  qrCode?: {
    src: string
    alt: string
    caption?: string
  }
  isFeatured?: boolean
  content: string[]
}

export type ResearchArea = {
  id: number
  title: string
  desc: string
  icon: Component
}

export type BreadcrumbItem = {
  label: string
  to?: string
}

export type SideMenuItem = {
  id: string
  title: string
  to?: string
}
