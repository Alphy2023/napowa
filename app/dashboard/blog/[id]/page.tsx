"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, Plus, Save, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    `,
    category: "Widows Support",
    author: "Jane Muthoni",
    status: "published",
    publishedAt: "2023-04-15T10:30:00Z",
    createdAt: "2023-04-10T08:15:00Z",
    updatedAt: "2023-04-14T14:20:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["widows", "support", "community"],
    views: 245,
  },
  {
    id: "2",
    title: "Skills Development Programs for Police Wives",
    slug: "skills-development-programs",
    excerpt: "Discover the various skills development programs NAPOWA offers to police wives.",
    content: `
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
      
      <h2>Success Stories</h2>
      
      <p>Our skills development programs have transformed many lives. For example:</p>
      
      <ul>
        <li>Mary, a police wife from Kisumu, established a soap-making business that now supplies products to several local hotels.</li>
        <li>Sarah, from Nakuru, used her tailoring skills to start a school uniform business that employs three other women.</li>
        <li>Jane, a police widow from Nairobi, used her food processing skills to create a line of preserved fruits that she sells at local markets and online.</li>
      </ul>
      
      <p>These women and many others have found not just income but also purpose, confidence, and community through our skills development programs.</p>
      
      <h2>Get Involved</h2>
      
      <p>If you're a police wife interested in our skills development programs, or if you'd like to support these initiatives through donations or volunteering, please <a href="/contact">contact us</a> or visit our <a href="/programs/skills-development">Skills Development program page</a> for more information.</p>
    `,
    category: "Skills Development",
    author: "Mary Akinyi",
    status: "published",
    publishedAt: "2023-03-22T09:45:00Z",
    createdAt: "2023-03-18T11:30:00Z",
    updatedAt: "2023-03-21T16:10:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["skills", "development", "training"],
    views: 189,
  },
  {
    id: "3",
    title: "Health Advocacy: Ensuring Well-being of Police Families",
    slug: "health-advocacy",
    excerpt: "How NAPOWA advocates for the health and well-being of police families.",
    content: `
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
      
      <h2>Advocacy for Better Health Policies</h2>
      
      <p>Beyond direct services, NAPOWA advocates for policies and practices that better support the health of police families:</p>
      
      <ul>
        <li>Engaging with police leadership on health benefit improvements</li>
        <li>Advocating for health facilities in areas with high concentrations of police families</li>
        <li>Promoting workplace policies that support mental health</li>
        <li>Raising awareness about the specific health needs of police families</li>
        <li>Collaborating with health organizations to develop targeted programs</li>
      </ul>
      
      <p>Through advocacy, we work toward systemic changes that can improve health outcomes for all police families.</p>
      
      <h2>Impact Stories</h2>
      
      <p>Our Health Advocacy program has made a significant difference in many lives:</p>
      
      <ul>
        <li>Sarah, a police wife from Mombasa, detected breast cancer early through one of our screening programs and received timely treatment.</li>
        <li>John, a police officer, and his wife received counseling through our mental health program, helping them navigate the stress of his dangerous assignment.</li>
        <li>A group of police wives in Nakuru formed a wellness club after attending our health workshops, supporting each other in maintaining healthy lifestyles.</li>
      </ul>
      
      <p>These stories illustrate the real impact of health education, access, and advocacy.</p>
      
      <h2>Get Involved</h2>
      
      <p>If you're interested in our Health Advocacy program, whether as a beneficiary or a supporter, please <a href="/contact">contact us</a> or visit our <a href="/programs/health-advocacy">Health Advocacy program page</a> for more information on upcoming workshops, screenings, and advocacy initiatives.</p>
    `,
    category: "Health",
    author: "Sarah Wanjiku",
    status: "published",
    publishedAt: "2023-02-28T14:20:00Z",
    createdAt: "2023-02-25T10:05:00Z",
    updatedAt: "2023-02-27T13:40:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["health", "advocacy", "well-being"],
    views: 312,
  },
  {
    id: "4",
    title: "Upcoming Woman of Purpose Annual Event",
    slug: "woman-of-purpose-event",
    excerpt: "Details about the upcoming Woman of Purpose annual empowerment event.",
    content: `
      <p>We are excited to announce our upcoming Woman of Purpose Annual Event, a transformative gathering designed to inspire, equip, and connect police wives and widows from across Kenya. This flagship event embodies NAPOWA's commitment to holistic empowerment and community building.</p>
      
      <h2>Event Overview</h2>
      
      <p><strong>Date:</strong> June 15-17, 2023<br>
      <strong>Venue:</strong> Nairobi International Convention Center<br>
      <strong>Theme:</strong> "Resilience, Growth, and Purpose: Thriving in Every Season"</p>
      
      <p>The Woman of Purpose event brings together hundreds of police wives and widows for three days of inspiration, learning, networking, and celebration. It's a unique opportunity to step away from daily responsibilities, focus on personal growth, and connect with a supportive community of women who understand the unique challenges and joys of being part of a police family.</p>
      
      <h2>Event Highlights</h2>
      
      <h3>Keynote Speakers</h3>
      
      <p>We are honored to welcome distinguished speakers who will share insights on resilience, leadership, and purpose:</p>
      
      <ul>
        <li><strong>Dr. Joyce Mwangi</strong> - Renowned psychologist specializing in resilience and trauma recovery</li>
        <li><strong>Mrs. Catherine Otieno</strong> - Successful entrepreneur and advocate for women's economic empowerment</li>
        <li><strong>Inspector General Sarah Kimani</strong> - One of Kenya's highest-ranking female police officers</li>
        <li><strong>Pastor Grace Njoroge</strong> - Spiritual leader and counselor to police families</li>
      </ul>
      
      <h3>Workshops and Training Sessions</h3>
      
      <p>Participants can choose from a variety of practical workshops designed to build skills and knowledge:</p>
      
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
      
      <h3>Networking and Mentorship</h3>
      
      <p>The event creates intentional spaces for connection and relationship building:</p>
      
      <ul>
        <li>Regional Networking Lunches - Connect with women from your region</li>
        <li>Mentorship Matchmaking - Connect younger wives with experienced mentors</li>
        <li>Interest-Based Roundtables - Discuss shared interests and challenges</li>
        <li>Evening Social Events - Build friendships in a relaxed atmosphere</li>
      </ul>
      
      <h3>Recognition and Celebration</h3>
      
      <p>We believe in celebrating the strength, resilience, and achievements of police wives and widows:</p>
      
      <ul>
        <li>Woman of Purpose Awards - Recognizing outstanding contributions and achievements</li>
        <li>Talent Showcase - Celebrating the diverse talents within our community</li>
        <li>Graduation Ceremony - For those who have completed NAPOWA training programs</li>
        <li>Gala Dinner - A special evening of celebration and inspiration</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      
      <p>The Woman of Purpose event is open to:</p>
      
      <ul>
        <li>Wives of current police officers</li>
        <li>Widows of police officers</li>
        <li>Female police officers</li>
        <li>NAPOWA members and supporters</li>
      </ul>
      
      <p>Women at all stages of life and from all regions of Kenya are welcome. Special tracks are available for young wives, senior wives, and widows to address their specific needs and interests.</p>
      
      <h2>Registration Information</h2>
      
      <p><strong>Registration Fee:</strong> KES 3,000 per person<br>
      (Includes all sessions, materials, meals, and the gala dinner)</p>
      
      <p><strong>Scholarship Opportunities:</strong> Limited scholarships are available for those who need financial assistance. Please contact our office for application details.</p>
      
      <p><strong>Accommodation:</strong> Discounted rates are available at partner hotels near the venue. Details will be provided upon registration.</p>
      
      <p><strong>Registration Deadline:</strong> May 31, 2023</p>
      
      <h2>How to Register</h2>
      
      <p>Registration can be completed through any of the following methods:</p>
      
      <ul>
        <li>Online: Visit our website at www.NAPOWA.org/wop2023</li>
        <li>Mobile: Send "WOP" to 22123 and follow the prompts</li>
        <li>In-person: Visit any NAPOWA regional office</li>
        <li>Phone: Call our office at +254 72 808 1194</li>
      </ul>
      
      <h2>Volunteer and Sponsorship Opportunities</h2>
      
      <p>We welcome individuals and organizations interested in supporting this transformative event:</p>
      
      <ul>
        <li><strong>Volunteers:</strong> Help with event logistics, registration, participant support, etc.</li>
        <li><strong>Sponsors:</strong> Support the event financially or through in-kind donations</li>
        <li><strong>Exhibitors:</strong> Showcase products or services relevant to our participants</li>
      </ul>
      
      <p>For more information on how to get involved, please contact our events team at events@NAPOWA.org or call +254 72 808 1194.</p>
      
      <h2>Join Us!</h2>
      
      <p>The Woman of Purpose Annual Event is more than just a conference—it's a life-changing experience that has empowered hundreds of women over the years. We invite you to be part of this special gathering as we celebrate resilience, foster growth, and discover purpose together.</p>
      
      <p>Register today and take a step toward becoming the woman of purpose you were created to be!</p>
    `,
    category: "Events",
    author: "Grace Otieno",
    status: "draft",
    publishedAt: null,
    createdAt: "2023-05-05T09:30:00Z",
    updatedAt: "2023-05-06T11:15:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["events", "empowerment", "woman of purpose"],
    views: 0,
  },
  {
    id: "5",
    title: "Success Stories: Police Wives Entrepreneurs",
    slug: "success-stories-entrepreneurs",
    excerpt: "Inspiring success stories of police wives who have become successful entrepreneurs.",
    content: `
      <p>At NAPOWA, we believe in the power of economic empowerment to transform lives. Through our skills development and entrepreneurship programs, many police wives and widows have established successful businesses that support their families and contribute to their communities. In this article, we share some inspiring success stories that demonstrate the resilience, creativity, and determination of these remarkable women.</p>
      
      <h2>Mary Akinyi: From Soap-Making Workshop to Thriving Business</h2>
      
      <p>When Mary's husband was posted to a remote area in Kisumu County, she struggled to find employment. With three children to support and limited job opportunities, Mary joined NAPOWA's soap-making workshop in 2019.</p>
      
      <p>"I had no business experience and very little savings," Mary recalls. "But the training gave me both technical skills and business knowledge."</p>
      
      <p>Starting with just KES 5,000 in capital, Mary began producing soap in her kitchen. She sold her products door-to-door and at local markets. Today, her business, "Pure Naturals," supplies handmade soaps and detergents to several hotels in Kisumu and employs four other women.</p>
      
      <p>"What started as a way to earn extra income has become a real business," says Mary. "I can pay school fees for my children and even save for the future. Most importantly, I've gained confidence in my abilities."</p>
      
      <h2>Sarah Wanjiku: Tailoring Success</h2>
      
      <p>Sarah's journey began when her husband, a police officer in Nakuru, was injured in the line of duty and had to take extended leave without full pay. With the family's income reduced, Sarah needed to find a way to support them.</p>
      
      <p>Through NAPOWA's tailoring program, Sarah learned not only sewing skills but also business planning and marketing. She identified a gap in the market for affordable, high-quality school uniforms.</p>
      
      <p>"I started with one sewing machine in my living room," Sarah explains. "I approached local schools and offered competitive prices and reliable delivery."</p>
      
      <p>Three years later, Sarah's business has grown to include a workshop with five sewing machines and three employees—all police wives. She has contracts with four schools in Nakuru and also produces custom clothing.</p>
      
      <p>"The business has been a blessing for our family," Sarah says. "When my husband was unable to work, we could have fallen into poverty. Instead, we maintained our standard of living, and I discovered my entrepreneurial abilities."</p>
      
      <h2>Jane Muthoni: Turning Tragedy into Purpose</h2>
      
      <p>Jane's story is one of remarkable resilience. After losing her husband in a security operation in 2018, the young widow with two small children faced an uncertain future.</p>
      
      <p>"I was devastated emotionally and financially," Jane remembers. "NAPOWA's widow support program was my lifeline during that dark time."</p>
      
      <p>Through NAPOWA, Jane participated in a food processing and preservation training program. She learned to make jams, pickles, and dried fruits using locally available produce.</p>
      
      <p>Starting small, Jane began selling her products at local markets in Nairobi. Her business, "Widow's Harvest," now supplies preserved fruits and condiments to several supermarkets and has an online presence.</p>
      
      <p>"Building this business helped me heal," Jane shares. "It gave me purpose and a way to provide for my children. Now I mentor other widows, showing them that there is life and hope after loss."</p>
      
      <h2>Grace Otieno: Digital Skills Open New Doors</h2>
      
      <p>Unlike many NAPOWA members, Grace had completed college with a degree in communication. However, frequent relocations due to her husband's police postings made it difficult to build a career.</p>
      
      <p>"Every time we moved, I had to start over," Grace explains. "Traditional employment wasn't working for our lifestyle."</p>
      
      <p>Through NAPOWA's digital skills program, Grace learned about online freelancing opportunities. She developed skills in content writing, social media management, and basic graphic design.</p>
      
      <p>"The digital economy allows me to work from anywhere," Grace says. "Now when my husband is transferred, my work comes with me."</p>
      
      <p>Grace now earns a steady income as a freelance content creator and has expanded to train other police wives in digital skills. Her location-independent business model has proven especially valuable for the mobile lifestyle of many police families.</p>
      
      <h2>Faith Kamau: Beadwork Cooperative</h2>
      
      <p>Faith's entrepreneurial journey took a collaborative approach. After learning beadwork through NAPOWA's training program, she recognized that working alone limited her production capacity and market reach.</p>
      
      <p>"I saw that we could accomplish more together than separately," Faith explains.</p>
      
      <p>She organized ten other police wives who had completed the same training to form the "Sisterhood Beads Cooperative." The group pools resources to purchase materials in bulk, shares a workspace, and divides large orders among members.</p>
      
      <p>The cooperative now produces beaded jewelry, accessories, and decorative items that are sold to tourists and through export channels. Their collective approach has allowed them to access larger markets and secure better prices for their products.</p>
      
      <p>"The cooperative model works well for us," Faith says. "We support each other not just in business but in life. When one member has a family emergency or other challenges, the others step in to help."</p>
      
      <h2>Common Success Factors</h2>
      
      <p>While each woman's journey is unique, several common factors have contributed to their success:</p>
      
      <ul>
        <li><strong>Practical, market-relevant skills:</strong> NAPOWA's training programs focus on skills that meet market demands.</li>
        <li><strong>Business knowledge:</strong> Technical skills are complemented by training in business planning, marketing, and financial management.</li>
        <li><strong>Supportive community:</strong> The NAPOWA network provides ongoing mentorship, encouragement, and practical support.</li>
        <li><strong>Resilience and determination:</strong> These women have overcome significant challenges through persistence and hard work.</li>
        <li><strong>Identifying market gaps:</strong> Successful entrepreneurs have found unmet needs in their communities.</li>
      </ul>
      
      <h2>Impact Beyond Income</h2>
      
      <p>The impact of these entrepreneurial journeys extends beyond financial gains. These women report:</p>
      
      <ul>
        <li>Increased confidence and self-esteem</li>
        <li>Greater respect within their families and communities</li>
        <li>Improved decision-making power in household matters</li>
        <li>Satisfaction in creating employment for others</li>
        <li>Pride in serving as role models for their children</li>
      </ul>
      
      <p>As Mary puts it, "When you can provide for yourself and your family, you stand taller. You know your worth."</p>
      
      <h2>Join Our Entrepreneurship Programs</h2>
      
      <p>These success stories represent just a few of the many police wives and widows who have transformed their lives through entrepreneurship. If you're interested in starting or growing your own business, NAPOWA offers various training programs, mentorship opportunities, and in some cases, startup capital through our microfinance initiatives.</p>
      
      <p>To learn more about our entrepreneurship programs, please <a href="/contact">contact us</a> or visit our <a href="/programs/skills-development">Skills Development program page</a>.</p>
    `,
    category: "Success Stories",
    author: "Faith Kamau",
    status: "published",
    publishedAt: "2023-01-18T08:00:00Z",
    createdAt: "2023-01-15T14:25:00Z",
    updatedAt: "2023-01-17T16:30:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["success", "entrepreneurship", "inspiration"],
    views: 427,
  },
  {
    id: "6",
    title: "Crisis Support: How NAPOWA Helps in Difficult Times",
    slug: "crisis-support",
    excerpt: "Learn about NAPOWA's crisis support system for police families facing difficult situations.",
    content: `
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
      
      <h3>Practical Support Services</h3>
      
      <p>Crisis situations often create practical challenges that can be overwhelming. Our volunteers provide:</p>
      
      <ul>
        <li>Childcare during emergencies</li>
        <li>Meal preparation and delivery</li>
        <li>Transportation to medical appointments, legal proceedings, etc.</li>
        <li>Temporary housing arrangements</li>
        <li>Assistance with paperwork and administrative tasks</li>
      </ul>
      
      <p>These practical services allow families to focus on recovery while ensuring basic needs are met.</p>
      
      <h3>Emotional and Psychological Support</h3>
      
      <p>Trauma and crisis can have significant emotional impacts. NAPOWA provides:</p>
      
      <ul>
        <li>Crisis counseling and psychological first aid</li>
        <li>Referrals to professional mental health services</li>
        <li>Support groups specific to different types of crises</li>
        <li>Peer support from others who have experienced similar situations</li>
      </ul>
      
      <p>This emotional support helps prevent long-term psychological consequences and promotes healing.</p>
      
      <h3>Advocacy and Navigation</h3>
      
      <p>Navigating systems during a crisis can be challenging. Our team advocates for families and helps them access:</p>
      
      <ul>
        <li>Police department benefits and services</li>
        <li>Government assistance programs</li>
        <li>Healthcare services</li>
        <li>Legal support when needed</li>
        <li>Educational support for children</li>
      </ul>
      
      <p>This advocacy ensures that families receive all the support they're entitled to during difficult times.</p>
      
      <h2>From Crisis to Recovery</h2>
      
      <p>While our Crisis Support program focuses on immediate needs, NAPOWA is committed to supporting families throughout the recovery process:</p>
      
      <ul>
        <li><strong>Transition to Long-term Support:</strong> After the immediate crisis, families are connected to NAPOWA's ongoing programs for continued support.</li>
        <li><strong>Follow-up Care:</strong> Regular check-ins ensure that recovery is progressing and new needs are addressed.</li>
        <li><strong>Resilience Building:</strong> Programs and resources to help families develop coping skills and resilience for the future.</li>
        <li><strong>Community Integration:</strong> Connecting families to supportive community networks for ongoing support.</li>
      </ul>
      
      <p>Our goal is not just to help families survive crises but to emerge stronger and more resilient.</p>
      
      <h2>Crisis Prevention</h2>
      
      <p>Beyond responding to crises, NAPOWA works to prevent them through:</p>
      
      <ul>
        <li>Education on recognizing warning signs of various crises</li>
        <li>Financial literacy training to prevent financial emergencies</li>
        <li>Relationship and communication workshops to strengthen families</li>
        <li>Stress management and mental health awareness programs</li>
        <li>Community building to reduce isolation and increase support networks</li>
      </ul>
      
      <p>These preventive efforts help reduce the frequency and severity of crises among police families.</p>
      
      <h2>How to Access Crisis Support</h2>
      
      <p>If you or a police family you know is experiencing a crisis:</p>
      
      <ul>
        <li><strong>Crisis Hotline:</strong> Call our 24/7 hotline at +254 700 000 000</li>
        <li><strong>SMS Alert:</strong> Text "HELP" to 22123 with your name and location</li>
        <li><strong>Regional Offices:</strong> Visit any NAPOWA office during business hours</li>
        <li><strong>Police Welfare Office:</strong> Ask to be connected to NAPOWA's Crisis Support program</li>
      </ul>
      
      <p>In life-threatening emergencies, always call emergency services (999) first, then contact NAPOWA for additional support.</p>
      
      <h2>Support Our Crisis Response Work</h2>
      
      <p>NAPOWA's Crisis Support program relies on donations and volunteers to provide timely, effective assistance to families in need. You can support this vital work by:</p>
      
      <ul>
        <li>Making a financial donation specifically for crisis response</li>
        <li>Volunteering for our crisis response team (training provided)</li>
        <li>Donating goods or services (transportation, temporary housing, professional services)</li>
        <li>Raising awareness about the program within police communities</li>
      </ul>
      
      <p>To learn more about supporting our Crisis Support program, please <a href="/contact">contact us</a> or visit our <a href="/donate">donation page</a>.</p>
    `,
    category: "Crisis Support",
    author: "Hope Njeri",
    status: "draft",
    publishedAt: null,
    createdAt: "2023-05-08T13:10:00Z",
    updatedAt: "2023-05-09T10:45:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["crisis", "support", "assistance"],
    views: 0,
  },
]

// Categories for the dropdown
const categories = [
  "Widows Support",
  "Skills Development",
  "Health",
  "Events",
  "Success Stories",
  "Crisis Support",
  "Woman of Purpose",
  "Financial Literacy",
]

export default function EditBlogPost() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    // Simulate fetching post data
    const fetchPost = () => {
      setIsLoading(true)

      // Find the post with the matching id
      const foundPost = blogPosts.find((p) => p.id === id)

      if (foundPost) {
        setPost(foundPost)
        setTags(foundPost.tags || [])
      }

      setIsLoading(false)
    }

    fetchPost()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPost((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === "status") {
      const status = checked ? "published" : "draft"
      const publishedAt = checked && !post.publishedAt ? new Date().toISOString() : post.publishedAt
      setPost((prev: any) => ({ ...prev, status, publishedAt }))
    } else {
      setPost((prev: any) => ({ ...prev, [name]: checked }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    setIsSaving(true)

    // Update tags in the post
    const updatedPost = { ...post, tags }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Blog post saved",
        description: "Your changes have been saved successfully.",
      })
      router.push("/dashboard/blog")
    }, 1000)
  }

  const handlePreview = () => {
    // Open the blog post in a new tab
    window.open(`/blog/${post.slug}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Blog Post Not Found</h2>
        <p className="mb-6 text-muted-foreground">The blog post you're trying to edit doesn't exist.</p>
        <Button asChild>
          <Link href="/dashboard/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/blog">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{post.title || "Edit Blog Post"}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview} disabled={isSaving}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Enter blog post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of the post"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-md border">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt="Featured image"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <p className="text-muted-foreground">No image selected</p>
                      </div>
                    )}
                    <Button variant="secondary" size="sm" className="absolute bottom-2 right-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" value={post.slug} onChange={handleChange} placeholder="post-url-slug" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={post.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full p-0 hover:bg-destructive/20"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add tag</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    Published
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </Label>
                  <Switch
                    id="status"
                    checked={post.status === "published"}
                    onCheckedChange={(checked) => handleSwitchChange("status", checked)}
                  />
                </div>

                {post.status === "published" && (
                  <div className="space-y-2">
                    <Label htmlFor="publishedAt">Publish Date</Label>
                    <Input
                      id="publishedAt"
                      name="publishedAt"
                      type="datetime-local"
                      value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={post.metaTitle || post.title}
                    onChange={handleChange}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={post.metaDescription || post.excerpt}
                    onChange={handleChange}
                    placeholder="SEO description (defaults to post excerpt)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Social Media Preview</Label>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                          <Image
                            src={post.featuredImage || "/placeholder.svg"}
                            alt="Social media preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold">{post.metaTitle || post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.metaDescription || post.excerpt}</p>
                        <p className="text-xs text-muted-foreground">NAPOWA.org</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
