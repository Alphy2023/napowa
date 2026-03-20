# Dynamic About Us Page Implementation

## Overview
The About Us page has been converted to a fully dynamic system where all content (welcome note, story, missions, values, achievements, and team members) is stored in the database and managed through an admin interface.

## Database Models Added

All models are stored in PostgreSQL and managed through Prisma ORM.

### 1. **AboutUsWelcomeNote**
- Stores the welcome/introduction section
- Fields: `id`, `title`, `description`, `image` (Cloudinary JSON), `content`, `isActive`, `order`, `createdAt`, `updatedAt`

### 2. **AboutUsStory**
- Stores organization story/history sections
- Fields: `id`, `title`, `description`, `content`, `image` (Cloudinary JSON), `isActive`, `order`, `createdAt`, `updatedAt`

### 3. **AboutUsMission**
- Stores mission statements
- Fields: `id`, `title`, `description`, `icon` (icon name), `isActive`, `order`, `createdAt`, `updatedAt`

### 4. **AboutUsValue**
- Stores core values
- Fields: `id`, `title`, `description`, `icon` (icon name), `isActive`, `order`, `createdAt`, `updatedAt`

### 5. **AboutUsAchievement**
- Stores achievements and milestones
- Fields: `id`, `title`, `description`, `icon`, `metric` (e.g., "300+"), `isActive`, `order`, `createdAt`, `updatedAt`

### 6. **AboutUsTeamMember**
- Stores team/leadership information
- Fields: `id`, `name`, `role`, `bio`, `image` (Cloudinary JSON), `email`, `phone`, `socialLinks` (JSON), `isActive`, `order`, `createdAt`, `updatedAt`

## API Routes Created

### Welcome Note
- **GET** `/api/about-us/welcome-note` - Fetch active welcome note
- **POST** `/api/about-us/welcome-note` - Create new welcome note
- **PUT** `/api/about-us/welcome-note` - Update welcome note
- **DELETE** `/api/about-us/welcome-note?id=<id>` - Delete welcome note

### Story
- **GET** `/api/about-us/story` - Fetch all active stories
- **POST** `/api/about-us/story` - Create/update stories
- **PUT** `/api/about-us/story` - Update individual story
- **DELETE** `/api/about-us/story?id=<id>` - Delete story

### Missions
- **GET** `/api/about-us/missions` - Fetch all active missions
- **POST** `/api/about-us/missions` - Create/update missions
- **PUT** `/api/about-us/missions` - Update individual mission
- **DELETE** `/api/about-us/missions?id=<id>` - Delete mission

### Values
- **GET** `/api/about-us/values` - Fetch all active values
- **POST** `/api/about-us/values` - Create/update values
- **PUT** `/api/about-us/values` - Update individual value
- **DELETE** `/api/about-us/values?id=<id>` - Delete value

### Achievements
- **GET** `/api/about-us/achievements` - Fetch all active achievements
- **POST** `/api/about-us/achievements` - Create/update achievements
- **PUT** `/api/about-us/achievements` - Update individual achievement
- **DELETE** `/api/about-us/achievements?id=<id>` - Delete achievement

### Team Members
- **GET** `/api/about-us/team-members` - Fetch all active team members
- **POST** `/api/about-us/team-members` - Create/update team members
- **PUT** `/api/about-us/team-members` - Update individual team member
- **DELETE** `/api/about-us/team-members?id=<id>` - Delete team member

## Modified Files

### 1. **prisma/schema.prisma**
- Added 6 new models for About Us sections
- Each model includes `isActive` toggle and `order` field for sorting

### 2. **app/dashboard/settings/page.tsx**
- Added About Us tab to settings
- Imported `AboutUsSettings` component

### 3. **app/(root)/about/page.tsx**
- Removed all static HTML content
- Now uses dynamic `DynamicAboutContent` component
- Maintains metadata for SEO

## Created Components

### Settings Management
- **`components/dashboard/settings/about-us-settings.tsx`** - Main tab container with sub-tabs for each section
- **`components/dashboard/settings/about-us/welcome-note-form.tsx`** - Welcome note editor with image upload
- **`components/dashboard/settings/about-us/story-form.tsx`** - Story editor with drag-to-reorder
- **`components/dashboard/settings/about-us/missions-values-form.tsx`** - Combined missions & values editor
- **`components/dashboard/settings/about-us/achievements-form.tsx`** - Achievements editor
- **`components/dashboard/settings/about-us/team-members-form.tsx`** - Team member editor with image upload

### Frontend Display
- **`components/about/dynamic-about-content.tsx`** - Fetches and displays all about us sections dynamically
- **`lib/icon-mapper.tsx`** - Maps icon names to Lucide React components

## Features

### Admin Features (Dashboard Settings)
- ✅ Create, read, update, delete all sections
- ✅ Image upload to Cloudinary for welcome note, stories, and team member photos
- ✅ Drag-to-reorder sections within each category
- ✅ Toggle sections on/off with `isActive` switch
- ✅ Rich text support (multi-paragraph content)
- ✅ Icon selection for missions, values, and achievements
- ✅ Team member contact info (email, phone)
- ✅ Form validation with error toasts
- ✅ Loading states and visual feedback
- ✅ Responsive design for mobile/tablet/desktop

### Frontend Features (Public About Page)
- ✅ Dynamically loads all data from database
- ✅ Displays sections in correct order
- ✅ Respects `isActive` status (hides inactive sections)
- ✅ Alternating image layouts for stories (left/right)
- ✅ Icon rendering for missions, values, achievements
- ✅ Responsive grid layouts
- ✅ Fallback UI for missing images
- ✅ Loading state with spinner

## Usage

### For Admins
1. Navigate to **Dashboard > Settings**
2. Click the **"About Us"** tab
3. Choose sub-tab (Welcome, Story, Mission, Achievement, Team)
4. Add/edit/delete/reorder items
5. Upload images where applicable
6. Toggle `isActive` to show/hide sections
7. Click **"Save"** button to persist changes

### For Public
1. Visit `/about` page
2. View all dynamically loaded sections
3. Sections appear in admin-defined order
4. Only active sections are displayed

## File Structure

```
/vercel/share/v0-project/
├── prisma/
│   └── schema.prisma (6 new models added)
├── app/
│   ├── api/about-us/
│   │   ├── welcome-note/route.ts
│   │   ├── story/route.ts
│   │   ├── missions/route.ts
│   │   ├── values/route.ts
│   │   ├── achievements/route.ts
│   │   └── team-members/route.ts
│   ├── dashboard/settings/
│   │   └── page.tsx (MODIFIED)
│   └── (root)/about/
│       └── page.tsx (MODIFIED)
├── components/
│   ├── dashboard/settings/
│   │   ├── about-us-settings.tsx (NEW)
│   │   └── about-us/
│   │       ├── welcome-note-form.tsx (NEW)
│   │       ├── story-form.tsx (NEW)
│   │       ├── missions-values-form.tsx (NEW)
│   │       ├── achievements-form.tsx (NEW)
│   │       └── team-members-form.tsx (NEW)
│   └── about/
│       └── dynamic-about-content.tsx (NEW)
└── lib/
    └── icon-mapper.tsx (NEW)
```

## Environment Variables

Ensure these are set for image uploads:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Database Migration

Run Prisma migration to create new tables:
```bash
npx prisma migrate dev --name add_about_us_models
npx prisma db push
```

## Styling

- Uses existing shadcn/ui components (Card, Button, Input, Textarea, etc.)
- Tailwind CSS for responsive design
- Lucide React icons
- Consistent with existing design system

## Notes

- All content is stored in PostgreSQL database
- Images are stored on Cloudinary (JSON reference only in DB)
- Sections are displayed in order defined by `order` field
- Drag-to-reorder auto-updates order numbers
- Form validation prevents empty submissions
- Toast notifications provide user feedback
- Responsive design works on all screen sizes
