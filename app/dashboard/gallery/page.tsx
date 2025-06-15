import GalleryManager from "@/components/dashboard/gallery/gallery-manager"

export default function GalleryPage() {
  return <GalleryManager  showHeader={true}
  cardHref={"/dashboard/gallery"}
  canManage={true}/>
}
