"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Eye, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react"

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "Supporting Police Widows: NAPOWA's Approach",
    slug: "supporting-police-widows",
    excerpt: "Learn about NAPOWA's comprehensive approach to supporting police widows across Kenya.",
    content: `
      <p>The loss of a spouse is one of life's most challenging experiences. For police widows in Kenya, this loss is often compounded by financial insecurity, social isolation, and the trauma associated with losing a loved one in the line of duty. At NAPOWA, we've developed a comprehensive approach to supporting police widows that addresses their unique needs and challenges.</p>
      
      <h2>Understanding the Challenges</h2>
      
      <p>Police widows in Kenya face numerous challenges, including:</p>
      
      <ul>
        <li>Financial insecurity due to loss of income</li>
        <li>Difficulty accessing benefits and entitlements</li>
        <li>Trauma and grief</li>
        <li>Social isolation</li>
        <li>Raising children as a single parent</li>
        <li>Housing insecurity</li>
      </ul>
      
      <p>Our approach begins with recognizing these challenges and developing targeted interventions to address each one.</p>
      
      <h2>Immediate Crisis Support</h2>
      
      <p>When a police officer dies, their family needs immediate support. NAPOWA provides:</p>
      
      <ul>
        <li>Emergency financial assistance</li>
        <li>Guidance on accessing benefits and entitlements</li>
        <li>Emotional support and counseling</li>
        <li>Practical help with funeral arrangements</li>
        <li>Advocacy with police departments and government agencies</li>
      </ul>
      
      <p>This immediate support helps widows navigate the initial crisis period and ensures they have access to the resources they need.</p>
      
      <h2>Long-term Economic Empowerment</h2>
      
      <p>Beyond the initial crisis period, NAPOWA focuses on long-term economic empowerment for police widows. This includes:</p>
      
      <ul>
        <li>Skills training in various vocational areas</li>
        <li>Financial literacy education</li>
        <li>Entrepreneurship support</li>
        <li>Microfinance opportunities</li>
        <li>Job placement assistance</li>
      </ul>
      
      <p>By developing economic independence, widows can provide for themselves and their children, reducing vulnerability and building resilience.</p>
      
      <h2>Emotional and Social Support</h2>
      
      <p>Grief and trauma require ongoing support. NAPOWA provides:</p>
      
      <ul>
        <li>Individual and group counseling</li>
        <li>Support groups where widows can connect with others who understand their experience</li>
        <li>Mentorship programs pairing new widows with those further along in their journey</li>
        <li>Community events and activities to reduce isolation</li>
      </ul>
      
      <p>These support systems help widows process their grief and rebuild their social connections.</p>
      
      <h2>Children's Support</h2>
      
      <p>Many police widows are also raising children who have lost a parent. NAPOWA supports these children through:</p>
      
      <ul>
        <li>Educational scholarships</li>
        <li>School supplies and uniforms</li>
        <li>Mentorship programs</li>
        <li>Counseling services</li>
        <li>Recreational activities</li>
      </ul>
      
      <p>By supporting both widows and their children, NAPOWA helps entire families rebuild their lives after loss.</p>
      
      <h2>Advocacy and Awareness</h2>
      
      <p>NAPOWA also works to raise awareness about the challenges faced by police widows and advocates for policies and practices that better support them. This includes:</p>
      
      <ul>
        <li>Engaging with police leadership</li>
        <li>Advocating for improved benefits and support systems</li>
        <li>Raising public awareness about the sacrifices made by police families</li>
        <li>Collaborating with other organizations serving widows and police families</li>
      </ul>
      
      <p>Through this comprehensive approach, NAPOWA is making a significant difference in the lives of police widows across Kenya. By addressing immediate needs while also focusing on long-term empowerment, we're helping widows not just survive but thrive after loss.</p>
      
      <p>If you're a police widow in need of support, or if you'd like to contribute to our work with police widows, please <a href="/contact">contact us</a> or <a href="/donate">donate</a> to support our programs.</p>
    `,
    category: "Widows Support",
    author: "Jane Muthoni",
    authorRole: "Widows Support Coordinator",
    authorBio:
      "Jane has been working with police widows for over 5 years and leads NAPOWA's widows support initiatives.",
    authorImage: "/placeholder.svg?height=100&width=100",
    status: "published",
    publishedAt: "2023-04-15T10:30:00Z",
    createdAt: "2023-04-10T08:15:00Z",
    updatedAt: "2023-04-14T14:20:00Z",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    tags: ["widows", "support", "community"],
    views: 245,
    relatedPosts: ["2", "5", "7"],
  },
  {
    id: "2",
    title: "Skills Development Programs for Police Wives",
    slug: "skills-development-programs",
    excerpt: "Discover the various skills development programs NAPOWA offers to police wives.",
    content: "Full content here...",
    category: "Skills Development",
    author: "Mary Akinyi",
    authorRole: "Programs Director",
    authorBio: "Mary oversees all NAPOWA programs, ensuring they effectively meet the needs of our members.",
    authorImage: "/placeholder.svg?height=100&width=100",
    status: "published",
    publishedAt: "2023-03-22T09:45:00Z",
    createdAt: "2023-03-18T11:30:00Z",
    updatedAt: "2023-03-21T16:10:00Z",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    tags: ["skills", "development", "training"],
    views: 189,
    relatedPosts: ["1", "3", "5"],
  },
  {
    id: "3",
    title: "Health Advocacy: Ensuring Well-being of Police Families",
    slug: "health-advocacy",
    excerpt: "How NAPOWA advocates for the health and well-being of police families.",
    content: "Full content here...",
    category: "Health",
    author: "Sarah Wanjiku",
    authorRole: "Health Coordinator",
    authorBio:
      "Sarah leads NAPOWA's health advocacy initiatives, focusing on improving health outcomes for police families.",
    authorImage: "/placeholder.svg?height=100&width=100",
    status: "published",
    publishedAt: "2023-02-28T14:20:00Z",
    createdAt: "2023-02-25T10:05:00Z",
    updatedAt: "2023-02-27T13:40:00Z",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    tags: ["health", "advocacy", "well-being"],
    views: 312,
    relatedPosts: ["1", "2", "7"],
  },
  {
    id: "5",
    title: "Success Stories: Police Wives Entrepreneurs",
    slug: "success-stories-entrepreneurs",
    excerpt: "Inspiring success stories of police wives who have become successful entrepreneurs.",
    content: "Full content here...",
    category: "Success Stories",
    author: "Faith Kamau",
    authorRole: "Training Coordinator",
    authorBio: "Faith develops and implements NAPOWA's skills training programs, empowering members economically.",
    authorImage: "/placeholder.svg?height=100&width=100",
    status: "published",
    publishedAt: "2023-01-18T08:00:00Z",
    createdAt: "2023-01-15T14:25:00Z",
    updatedAt: "2023-01-17T16:30:00Z",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    tags: ["success", "entrepreneurship", "inspiration"],
    views: 427,
    relatedPosts: ["1", "2", "7"],
  },
  {
    id: "7",
    title: "The Impact of Woman of Purpose Events",
    slug: "impact-woman-of-purpose",
    excerpt: "Exploring the transformative impact of our annual Woman of Purpose events on participants' lives.",
    content: "Full content here...",
    category: "Woman of Purpose",
    author: "Hope Njeri",
    authorRole: "Events Coordinator",
    authorBio: "Hope organizes NAPOWA's events, including the annual Woman of Purpose empowerment event.",
    authorImage: "/placeholder.svg?height=100&width=100",
    status: "published",
    publishedAt: "2023-05-10T11:15:00Z",
    createdAt: "2023-05-05T09:30:00Z",
    updatedAt: "2023-05-09T14:45:00Z",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    tags: ["empowerment", "events", "inspiration"],
    views: 178,
    relatedPosts: ["1", "2", "5"],
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const { slug } = params

  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching post data
    const fetchPost = () => {
      setIsLoading(true)

      // Find the post with the matching slug
      const foundPost = blogPosts.find((p) => p.slug === slug)

      if (foundPost) {
        setPost(foundPost)

        // Get related posts
        const related = blogPosts.filter((p) => foundPost.relatedPosts.includes(p.id))

        setRelatedPosts(related)
      }

      setIsLoading(false)
    }

    fetchPost()
  }, [slug])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full
           border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto py-16">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Blog Post Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
        <div className="napowa-stripes-top"></div>

      <section className="w-full bg-gradient-to-b from-orange/20
       to-background py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {calculateReadingTime(post.content)} min read
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="mr-1 h-4 w-4" />
                {post.views} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container relative -mt-10 mb-10 h-[300px] overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
        <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Blog Content */}
      <section className="w-full py-8 md:py-16">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_300px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="space-y-8">
              {/* Author Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{post.author}</h3>
                    <p className="text-sm text-primary">{post.authorRole}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{post.authorBio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div>
                <h3 className="mb-3 font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div>
                <h3 className="mb-3 font-semibold">Share</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Copy Link</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="w-full bg-muted/50 py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-2xl font-bold">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedPost.featuredImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline">{relatedPost.category}</Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.slug}`} className="group">
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">{relatedPost.title}</h3>
                    </Link>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link href={`/blog/${relatedPost.slug}`} className="flex items-center justify-center">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
