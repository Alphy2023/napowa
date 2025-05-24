import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background w-full pt-16
    md:pt-24 containerp">
      <div className="w-full containerp">

        <div className="napowa-stripes-top"></div>
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
               <Logo/>
              </div>
              <p className="text-sm text-muted-foreground">
                National Police Wives Welfare Association is committed to empowering police wives, widows and their
                families across Kenya.
              </p>
              <div className="flex space-x-3">
                <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-muted-foreground hover:text-primary">
                    Our Programs
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Get Involved</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/donate" className="text-muted-foreground hover:text-primary">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className="text-muted-foreground hover:text-primary">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/fundraise" className="text-muted-foreground hover:text-primary">
                    Fundraise
                  </Link>
                </li>
                <li>
                  <Link href="/partner" className="text-muted-foreground hover:text-primary">
                    Partner With Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+254 72 808 1194</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:info@NAPOWA.org" className="text-muted-foreground hover:text-primary">
                    info@NAPOWA.org
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} National Police Wives Welfare Association. All rights reserved.
            </p>
          </div>
        </div>
        <div className="napowa-stripes-bottom"></div>
      </div>
    </footer>
  )
}
