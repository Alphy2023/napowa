import { TabItem } from "@/types";
import { RESOURCE_CATEGORIES } from "@/types/roles";


 export const settingsPageTabs: TabItem[] = [
   
    {
      title:"Landing page",
      id:"landing-page"
    },
    {
      title:"Contact us page",
      id:"contact-us-page"
    },
];

 export const profilePageTabs: TabItem[] = [
   
    {
      title:"Profile",
      id:"profile"
    },
    {
      title:"Account",
      id:"account"
    },
    {
      title:"Notification",
      id:"notification"
    },
    {
      title:"Security",
      id:"security"
    },
    {
      title:"Privacy",
      id:"privacy"
    },
];
 export const analyticsPageTabs: TabItem[] = [
   
    {
      title:"Overview",
      id:"overview"
    },
    {
      title:"Members",
      id:"members"
    },
    {
      title:"Donations",
      id:"donations"
    },
    {
      title:"Events",
      id:"events"
    },
    {
      title:"Programs",
      id:"programs"
    },
];


  const permissionsResources = Object.keys(RESOURCE_CATEGORIES)
  .map((category) => {
    return {
      id:category,
      title:category
    }
  })
 export const rolePermissionResourcesTabs: TabItem[] = [
    {
      title:"All resources",
      id:"all"
    },
    ...permissionsResources
];
