import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Heart, BookOpen, Users, ArrowLeft, Calendar, MapPin } from "lucide-react"

type Props = {
  params: { id: string }
}

// Sample program data
const programs = [
  {
    id: "skills-development",
    title: "Skills Development",
    description:
      "Our skills development program provides training in various vocational skills to help police wives and widows become economically independent.",
    icon: Briefcase,
    image: "/placeholder.svg?height=800&width=1200",
    activities: [
      "Soap and detergent making workshops",
      "Fashion design and tailoring classes",
      "Candle production training",
      "Beadwork and jewelry making",
      "Food processing and preservation",
      "Computer literacy courses",
    ],
    impact:
      "Over 200 women have completed our skills training programs, with 70% reporting increased income through their new skills.",
    fullDescription: `
      <p>Economic empowerment is a cornerstone of NAPOWA's mission to support police wives across Kenya. Our skills development programs are designed to equip women with practical, marketable skills that can help them generate income, build financial independence, and contribute to their families' well-being.</p>
      
      <h2>Why Skills Development Matters</h2>
      
      <p>For many police wives in Kenya, access to economic opportunities can be limited by various factors, including:</p>
      
      <ul>
        <li>Frequent relocations due to their husbands' postings</li>
        <li>Limited formal education or professional qualifications</li>
        <li>Responsibilities of caring for children and managing households</li>
        <li>Limited access to capital for starting businesses</li>
      </ul>
      
      <p>Our skills development programs address these challenges by providing flexible, practical training that can lead to income-generating activities regardless of location or prior education.</p>
      
      <h2>Our Skills Training Programs</h2>
      
      <h3>Soap and Detergent Making</h3>
      
      <p>This popular program teaches participants how to create various types of soaps and cleaning products using locally available materials. Participants learn:</p>
      
      <ul>
        <li>Basic chemistry and safety procedures</li>
        <li>Formulation of different soap and detergent products</li>
        <li>Packaging and branding</li>
        <li>Basic business skills for selling products</li>
      </ul>
      
      <p>Many graduates of this program have established successful small businesses selling their products in local markets and to institutions.</p>
      
      <h3>Fashion Design and Tailoring</h3>
      
      <p>Our tailoring program equips women with skills to create clothing and textile products. The curriculum includes:</p>
      
      <ul>
        <li>Basic sewing techniques</li>
        <li>Pattern making and garment construction</li>
        <li>Fabric selection and care</li>
        <li>Design principles and fashion trends</li>
        <li>Business management for tailoring enterprises</li>
      </ul>
      
      <p>Graduates often establish home-based tailoring businesses or find employment in existing tailoring shops.</p>
      
      <h3>Food Processing and Preservation</h3>
      
      <p>This program focuses on techniques for processing and preserving food products for longer shelf life and added value. Participants learn:</p>
      
      <ul>
        <li>Food safety and hygiene principles</li>
        <li>Preservation techniques (drying, pickling, jam making, etc.)</li>
        <li>Packaging and labeling</li>
        <li>Marketing and distribution of food products</li>
      </ul>
      
      <p>This training is particularly valuable in areas with seasonal produce, allowing women to reduce waste and create value-added products.</p>
      
      <h3>Beadwork and Jewelry Making</h3>
      
      <p>Our beadwork program teaches traditional and contemporary jewelry making techniques. The curriculum covers:</p>
      
      <ul>
        <li>Basic beading techniques</li>
        <li>Design principles and color theory</li>
        <li>Creating various jewelry items (necklaces, bracelets, earrings)</li>
        <li>Sourcing materials and pricing products</li>
        <li>Marketing handcrafted jewelry</li>
      </ul>
      
      <p>This skill is particularly valuable as it requires minimal startup capital and can be practiced from home.</p>
      
      <h3>Computer Literacy</h3>
      
      <p>In today's digital world, basic computer skills are essential. Our computer literacy program covers:</p>
      
      <ul>
        <li>Basic computer operations</li>
        <li>Word processing and spreadsheet applications</li>
        <li>Internet and email use</li>
        <li>Social media for business</li>
        <li>Basic digital marketing</li>
      </ul>
      
      <p>These skills help women access information, connect with markets, and explore online income opportunities.</p>
      
      <h2>Beyond Technical Skills</h2>
      
      <p>All our skills development programs include components on:</p>
      
      <ul>
        <li>Financial literacy and basic accounting</li>
        <li>Business planning and management</li>
        <li>Marketing and customer service</li>
        <li>Savings and investment</li>
      </ul>
      
      <p>These complementary skills ensure that participants can translate their technical abilities into sustainable income-generating activities.</p>
    `,
    upcomingEvents: [
      {
        title: "Soap Making Workshop",
        date: "2023-06-15",
        location: "Nairobi Office",
        description: "Learn to make various types of soaps using locally available materials.",
      },
      {
        title: "Tailoring Basics Course",
        date: "2023-07-10",
        location: "Mombasa Office",
        description: "A two-week introduction to basic sewing and garment construction.",
      },
      {
        title: "Digital Skills for Business",
        date: "2023-06-28",
        location: "Online (Zoom)",
        description: "Learn how to use digital tools to market and grow your small business.",
      },
    ],
    successStories: [
      {
        name: "Mary Akinyi",
        story:
          "After completing the soap making training, I started a small business from my home. Now I supply soaps to three local hotels and earn enough to pay my children's school fees.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Sarah Wanjiku",
        story:
          "The tailoring program changed my life. I now run a small workshop making school uniforms, and I've even hired two other police wives to help with large orders.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Jane Muthoni",
        story:
          "Learning computer skills opened new doors for me. I now work part-time as a virtual assistant, which I can do from anywhere when my husband is transferred to a new posting.",
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  },
  {
    id: "health-advocacy",
    title: "Health & Rights Advocacy",
    description:
      "Our health advocacy program focuses on providing access to sexual and reproductive health information, counseling, and services for police wives and widows.",
    icon: Heart,
    image: "/placeholder.svg?height=800&width=1200",
    activities: [
      "Health awareness workshops",
      "Access to reproductive health services",
      "Mental health support and counseling",
      "Rights awareness training",
      "Domestic violence prevention",
      "Support groups for health challenges",
    ],
    impact:
      "We've reached over 300 women with critical health information and services, improving health outcomes for police families.",
    fullDescription: `
      <p>Health is a fundamental aspect of overall well-being, yet police families in Kenya often face unique challenges in accessing quality healthcare and maintaining good health. NAPOWA's Health Advocacy program works to address these challenges through education, advocacy, and direct support.</p>
      
      <h2>Health Challenges Facing Police Families</h2>
      
      <p>Police families in Kenya face several health-related challenges:</p>
      
      <ul>
        <li>Limited access to healthcare facilities, especially in remote postings</li>
        <li>Stress-related health issues due to the nature of police work</li>
        <li>Reproductive health needs that may be overlooked</li>
        <li>Mental health concerns, including anxiety, depression, and PTSD</li>
        <li>Limited health insurance coverage or difficulty navigating benefits</li>
      </ul>
      
      <p>Our Health Advocacy program addresses these challenges through a comprehensive approach.</p>
      
      <h2>Health Education and Awareness</h2>
      
      <p>Knowledge is the first step toward better health. NAPOWA conducts regular health education workshops covering:</p>
      
      <ul>
        <li>Preventive healthcare and early detection of common illnesses</li>
        <li>Reproductive health and family planning</li>
        <li>Nutrition and healthy lifestyle choices</li>
        <li>Mental health awareness and stress management</li>
        <li>First aid and emergency response</li>
      </ul>
      
      <p>These workshops empower police wives with information to make informed decisions about their health and the health of their families.</p>
      
      <h2>Access to Healthcare Services</h2>
      
      <p>NAPOWA works to improve access to healthcare services for police families through:</p>
      
      <ul>
        <li>Organizing mobile health clinics in areas with limited healthcare facilities</li>
        <li>Partnering with healthcare providers to offer discounted services</li>
        <li>Facilitating health screenings for common conditions</li>
        <li>Providing guidance on navigating health insurance benefits</li>
        <li>Connecting families with specialized care when needed</li>
      </ul>
      
      <p>These initiatives help ensure that police families can access the care they need, when they need it.</p>
      
      <h2>Reproductive Health Support</h2>
      
      <p>Reproductive health is a key focus of our program. We provide:</p>
      
      <ul>
        <li>Education on reproductive health and rights</li>
        <li>Access to family planning services and information</li>
        <li>Maternal health support during pregnancy and after childbirth</li>
        <li>Screening for reproductive health conditions</li>
        <li>Support for women experiencing reproductive health challenges</li>
      </ul>
      
      <p>By addressing reproductive health needs, we help women make informed choices and maintain their health throughout different life stages.</p>
      
      <h2>Mental Health Support</h2>
      
      <p>The stress of police work can affect the mental health of officers and their families. Our mental health initiatives include:</p>
      
      <ul>
        <li>Destigmatizing mental health through education and awareness</li>
        <li>Providing access to counseling services</li>
        <li>Teaching stress management and coping techniques</li>
        <li>Creating support groups for those experiencing similar challenges</li>
        <li>Training peer counselors within the police wives community</li>
      </ul>
      
      <p>These efforts help address the often-overlooked mental health needs of police families.</p>
    `,
    upcomingEvents: [
      {
        title: "Women's Health Screening Day",
        date: "2023-06-20",
        location: "Nairobi Office",
        description: "Free health screenings including breast cancer, cervical cancer, and general health checks.",
      },
      {
        title: "Mental Health First Aid Workshop",
        date: "2023-07-05",
        location: "Kisumu Office",
        description: "Learn to recognize signs of mental health challenges and provide initial support.",
      },
      {
        title: "Reproductive Health Seminar",
        date: "2023-06-30",
        location: "Mombasa Office",
        description: "Information session on reproductive health, family planning, and maternal health.",
      },
    ],
    successStories: [
      {
        name: "Grace Otieno",
        story:
          "Through a NAPOWA health screening, I discovered I had high blood pressure. The early detection and support I received helped me manage my condition before it became serious.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Faith Kamau",
        story:
          "The mental health support group helped me cope with anxiety related to my husband's dangerous assignments. I learned coping strategies that have improved my well-being and family relationships.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Hope Njeri",
        story:
          "NAPOWA's reproductive health program provided me with information and services I couldn't access in my remote posting. This allowed me to make informed choices about family planning.",
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  },
  {
    id: "woman-of-purpose",
    title: "Woman of Purpose",
    description:
      "Our annual Woman of Purpose event is a transformative gathering focused on empowering police wives and widows with life skills, inspiration, and community.",
    icon: BookOpen,
    image: "/placeholder.svg?height=800&width=1200",
    activities: [
      "Inspirational speakers and testimonials",
      "Leadership development workshops",
      "Networking opportunities",
      "Recognition of achievements",
      "Goal setting and vision boarding",
      "Community building activities",
    ],
    impact:
      "Each year, over 100 women attend our Woman of Purpose event, with 90% reporting increased confidence and motivation.",
    fullDescription: `
      <p>The Woman of Purpose program is NAPOWA's flagship annual event, designed to inspire, equip, and connect police wives and widows from across Kenya. This transformative gathering embodies our commitment to holistic empowerment and community building.</p>
      
      <h2>Program Overview</h2>
      
      <p>The Woman of Purpose event brings together hundreds of police wives and widows for three days of inspiration, learning, networking, and celebration. It's a unique opportunity to step away from daily responsibilities, focus on personal growth, and connect with a supportive community of women who understand the unique challenges and joys of being part of a police family.</p>
      
      <h2>Key Components</h2>
      
      <h3>Inspirational Speakers</h3>
      
      <p>Each year, we invite distinguished speakers who share insights on resilience, leadership, and purpose. Past speakers have included:</p>
      
      <ul>
        <li>Renowned psychologists specializing in resilience and trauma recovery</li>
        <li>Successful entrepreneurs from police family backgrounds</li>
        <li>High-ranking female police officers</li>
        <li>Spiritual leaders and counselors to police families</li>
        <li>Government officials advocating for police welfare</li>
      </ul>
      
      <p>These speakers share not only their expertise but often their personal journeys of overcoming challenges and finding purpose.</p>
      
      <h3>Practical Workshops</h3>
      
      <p>Participants can choose from a variety of workshops designed to build practical skills:</p>
      
      <ul>
        <li>Financial Freedom: Budgeting, Saving, and Investing</li>
        <li>Entrepreneurship Essentials for Beginners</li>
        <li>Digital Skills for the Modern Woman</li>
        <li>Effective Communication in Relationships</li>
        <li>Self-Care and Stress Management</li>
        <li>Navigating Grief and Loss (special track for widows)</li>
        <li>Parenting Resilient Children</li>
        <li>Leadership Development for Community Impact</li>
      </ul>
      
      <p>These workshops provide actionable knowledge that participants can immediately apply in their lives.</p>
      
      <h3>Networking and Mentorship</h3>
      
      <p>The event creates intentional spaces for connection and relationship building:</p>
      
      <ul>
        <li>Regional Networking Lunches - Connect with women from your region</li>
        <li>Mentorship Matchmaking - Connect younger wives with experienced mentors</li>
        <li>Interest-Based Roundtables - Discuss shared interests and challenges</li>
        <li>Evening Social Events - Build friendships in a relaxed atmosphere</li>
      </ul>
      
      <p>These connections often last well beyond the event, creating ongoing support networks.</p>
      
      <h3>Recognition and Celebration</h3>
      
      <p>We believe in celebrating the strength, resilience, and achievements of police wives and widows:</p>
      
      <ul>
        <li>Woman of Purpose Awards - Recognizing outstanding contributions and achievements</li>
        <li>Talent Showcase - Celebrating the diverse talents within our community</li>
        <li>Graduation Ceremony - For those who have completed NAPOWA training programs</li>
        <li>Gala Dinner - A special evening of celebration and inspiration</li>
      </ul>
      
      <p>These recognition elements help affirm the value and potential of each participant.</p>
    `,
    upcomingEvents: [
      {
        title: "Woman of Purpose Annual Event 2023",
        date: "2023-08-15",
        location: "Nairobi International Convention Center",
        description:
          "Three-day empowerment event featuring workshops, speakers, networking, and celebration. Registration required.",
      },
      {
        title: "Woman of Purpose Regional Meetup - Mombasa",
        date: "2023-06-25",
        location: "Mombasa Office",
        description: "One-day mini-event for past participants to reconnect and share progress.",
      },
      {
        title: "Leadership Workshop Series",
        date: "2023-07-15",
        location: "Online (Zoom)",
        description: "Preparatory workshop series for women interested in attending the main event.",
      },
    ],
    successStories: [
      {
        name: "Charity Odhiambo",
        story:
          "Attending the Woman of Purpose event gave me the confidence to start my own business. The workshops provided practical knowledge, and the connections I made continue to support me.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Mercy Nyambura",
        story:
          "As a new police wife, I felt isolated until I attended Woman of Purpose. I found a community of women who understood my challenges and mentors who helped me navigate this unique lifestyle.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Elizabeth Wangari",
        story:
          "After losing my husband, I attended the widows' track at Woman of Purpose. The healing and support I experienced there helped me find strength I didn't know I had and a new vision for my future.",
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  },
  {
    id: "crisis-support",
    title: "Crisis Support",
    description:
      "Our crisis support program provides immediate assistance to police families facing difficult situations, including bereavement, illness, or financial emergencies.",
    icon: Users,
    image: "/placeholder.svg?height=800&width=1200",
    activities: [
      "Emergency financial assistance",
      "Bereavement support for widows",
      "Counseling services",
      "Referrals to specialized services",
      "Temporary housing assistance",
      "Children's education support",
    ],
    impact:
      "We've provided critical support to over 100 families in crisis, helping them navigate challenging times with dignity and hope.",
    fullDescription: `
      <p>Police families face unique challenges and sometimes find themselves in crisis situations that require immediate support. Whether it's the loss of a loved one, injury in the line of duty, domestic violence, or other emergencies, NAPOWA's Crisis Support program provides timely, compassionate assistance to help families navigate difficult times.</p>
      
      <h2>Understanding Crisis Situations</h2>
      
      <p>Police families may experience various types of crises:</p>
      
      <ul>
        <li><strong>Line of Duty Deaths or Injuries:</strong> When an officer is killed or seriously injured while serving</li>
        <li><strong>Sudden Illness or Death:</strong> Health emergencies or unexpected deaths in the family</li>
        <li><strong>Domestic Violence:</strong> Situations where family members face abuse or violence</li>
        <li><strong>Financial Emergencies:</strong> Sudden loss of income, major unexpected expenses, or financial hardship</li>
        <li><strong>Natural Disasters:</strong> Displacement or loss due to floods, fires, or other disasters</li>
        <li><strong>Mental Health Crises:</strong> Severe depression, PTSD, or other acute mental health challenges</li>
      </ul>
      
      <p>These situations often require immediate intervention and comprehensive support to prevent long-term negative consequences.</p>
      
      <h2>Our Approach to Crisis Support</h2>
      
      <p>NAPOWA's Crisis Support program is built on principles of rapid response, compassionate care, and holistic support:</p>
      
      <h3>24/7 Crisis Hotline</h3>
      
      <p>Our crisis hotline is available around the clock, providing:</p>
      
      <ul>
        <li>Immediate emotional support</li>
        <li>Assessment of urgent needs</li>
        <li>Connection to emergency services when needed</li>
        <li>Guidance on next steps</li>
        <li>Activation of our crisis response team</li>
      </ul>
      
      <p>The hotline is staffed by trained volunteers who understand the unique challenges of police families and can provide culturally sensitive support.</p>
      
      <h3>Rapid Response Team</h3>
      
      <p>When a crisis is reported, our Rapid Response Team is mobilized to provide in-person support. The team typically includes:</p>
      
      <ul>
        <li>A crisis coordinator who manages the overall response</li>
        <li>A trained counselor or social worker</li>
        <li>Volunteers with relevant experience (e.g., widows supporting new widows)</li>
        <li>When appropriate, a liaison to police department services</li>
      </ul>
      
      <p>The team conducts a comprehensive needs assessment and develops an immediate action plan to address the most urgent concerns.</p>
      
      <h3>Emergency Financial Assistance</h3>
      
      <p>For families facing financial emergencies, NAPOWA provides:</p>
      
      <ul>
        <li>Emergency cash grants for immediate needs (food, transportation, medical expenses)</li>
        <li>Temporary housing assistance when needed</li>
        <li>Help with funeral expenses in cases of bereavement</li>
        <li>Connection to longer-term financial support resources</li>
      </ul>
      
      <p>This immediate financial support helps stabilize the situation while longer-term solutions are developed.</p>
    `,
    upcomingEvents: [
      {
        title: "Crisis Response Training",
        date: "2023-06-18",
        location: "Nairobi Office",
        description: "Training for volunteers who want to join our crisis response team.",
      },
      {
        title: "Grief Support Group",
        date: "2023-07-01",
        location: "Kisumu Office",
        description: "Ongoing support group for those who have lost loved ones.",
      },
      {
        title: "Financial Emergency Preparedness Workshop",
        date: "2023-06-22",
        location: "Eldoret Office",
        description: "Learn strategies to prepare for and prevent financial emergencies.",
      },
    ],
    successStories: [
      {
        name: "Rebecca Mutua",
        story:
          "When my husband was injured in the line of duty, NAPOWA's crisis team provided immediate support, helping with hospital transportation and connecting us with resources for his recovery.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Esther Kimani",
        story:
          "After losing our home in a fire, NAPOWA provided emergency housing assistance and helped us rebuild. Their support made a traumatic situation manageable.",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        name: "Lucy Omondi",
        story:
          "As a new widow, I didn't know where to turn. NAPOWA's crisis support helped me navigate funeral arrangements, access benefits, and begin the healing process with dignity.",
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = programs.find((p) => p.id === params.id)

  if (!program) {
    return {
      title: "Program Not Found | NAPOWA",
      description: "The program you're looking for doesn't exist or has been removed.",
    }
  }

  return {
    title: `${program.title} | NAPOWA Programs`,
    description: program.description,
  }
}

export default function ProgramPage({ params }: Props) {
  const program = programs.find((p) => p.id === params.id)

  if (!program) {
    notFound()
  }

  // Get the icon component
  const IconComponent = program.icon

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/programs"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <IconComponent className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{program.title}</h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container relative -mt-10 mb-10 h-[300px] overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
        <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" priority />
      </div>

      {/* Program Content */}
      <section className="w-full py-8 md:py-16">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_300px]">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: program.fullDescription }}
            />

            <div className="space-y-8">
              {/* Key Activities */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Key Activities</h3>
                  <ul className="space-y-2">
                    {program.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-primary/10 p-1">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-muted-foreground">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Impact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Impact</h3>
                  <p className="text-muted-foreground">{program.impact}</p>
                </CardContent>
              </Card>

              {/* Get Involved */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Get Involved</h3>
                  <p className="mb-4 text-muted-foreground">
                    Interested in this program? There are several ways you can get involved or benefit from it.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/volunteer">Volunteer</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/donate">Support This Program</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {program.upcomingEvents && program.upcomingEvents.length > 0 && (
        <section className="w-full bg-muted/50 py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold">Upcoming Events</h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {program.upcomingEvents.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
                    <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {program.successStories && program.successStories.length > 0 && (
        <section className="w-full py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold">Success Stories</h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {program.successStories.map((story, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-semibold">{story.name}</h3>
                    </div>
                    <p className="text-muted-foreground">"{story.story}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full bg-primary/5 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Get Involved?</h2>
            <p className="mb-8 text-muted-foreground">
              Whether you want to benefit from this program, volunteer your skills, or support our work financially,
              we'd love to hear from you.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/programs">Explore Other Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
