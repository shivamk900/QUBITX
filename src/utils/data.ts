// About Section
import { Shield, Zap, Code, Share2, Clock, Trophy, Users } from 'lucide-react';

export const aboutData = [{
    icon: Code,
    title: "Cutting-Edge Challenges",
    description: "Tackle real-world problems with the latest technologies in AI, blockchain, and more."
},
{
    icon: Zap,
    title: "24-Hour Sprint",
    description: "Push your creative limits in this intense coding marathon designed to spark innovation."
},
{
    icon: Shield,
    title: "Mentorship & Support",
    description: "Get guidance from industry experts to help bring your ideas to life."
},
{
    icon: Share2,
    title: "Networking Opportunities",
    description: "Connect with fellow tech enthusiasts, sponsors, and potential employers."
}]

// Rounds Data
export const roundsData = [
    {
        number: 1,
        title: "Ideation & Team Formation",
        description:
            "Submit your innovative project idea and form your dream team. Present your concept to mentors for initial feedback.",
        timeline: "48 Hours",
        icon: Users,
        className: "w-6 h-6 text-neon-blue",
        details: [
            "Team registration & idea submission",
            "Mentor matching & initial guidance",
            "Project scope definition",
            "Technical stack planning",
        ],
    },
    {
        number: 2,
        title: "Development & Mentorship",
        description:
            "Build your prototype with continuous support from industry experts. Regular checkpoints to ensure you're on track.",
        timeline: "72 Hours",
        icon: Code,
        className: "w-6 h-6 text-neon-purple",
        details: [
            "Intensive coding & development",
            "One-on-one mentorship sessions",
            "Technical workshops",
            "Progress presentations",
        ],
    },
    {
        number: 3,
        title: "Final Presentation & Judging",
        description:
            "Showcase your solution to our panel of judges. Demonstrate the impact and innovation of your project.",
        timeline: "24 Hours",
        icon: Trophy,
        className: "w-6 h-6 text-neon-pink",
        details: [
            "Project demonstration",
            "Technical documentation",
            "Final presentation",
            "Awards ceremony",
        ],
    },
]
// Problem Statements Data
export const problemStatementsData = [
    {
        id: 'open-innovation',
        title: 'Open Innovation',
        description: 'Create groundbreaking solutions that push technological boundaries across any domain.',
        icon: '🎯',
        color: 'from-blue-500 to-purple-500'
    },
    {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        description: 'Develop intelligent systems that can learn, adapt, and solve complex problems.',
        icon: '🤖',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'health-tech',
        title: 'Health-Tech',
        description: 'Transform healthcare with innovative technological solutions.',
        icon: '🏥',
        color: 'from-green-500 to-emerald-500'
    },
    {
        id: 'mid-tech',
        title: 'Mid-Tech',
        description: 'Bridge traditional industries with cutting-edge technology solutions.',
        icon: '🔄',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'edu-tech',
        title: 'Edu-Tech',
        description: 'Revolutionize learning through innovative educational technology.',
        icon: '📚',
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'fin-tech',
        title: 'Fin-Tech',
        description: 'Innovate financial services with next-generation technology.',
        icon: '💰',
        color: 'from-yellow-500 to-orange-500'
    }
]

// Schedule Data
export const scheduleData = {
    day1: [
        {
            time: "9:00 AM - 10:00 AM",
            title: "Registration & Coffee",
            description: "Check-in and get your welcome package",
            location: "Main Hall"
        },
        {
            time: "10:00 AM - 11:00 AM",
            title: "Opening Ceremony",
            description: "Welcome address and introduction to challenges",
            speaker: "Sarah Chen, QUBITX-GLBM Director",
            location: "Cyber Auditorium"
        },
        {
            time: "11:00 AM - 12:00 PM",
            title: "Team Formation",
            description: "Find teammates and brainstorm project ideas",
            location: "Collaboration Zones"
        },
        {
            time: "12:00 PM - 1:00 PM",
            title: "Lunch Break",
            description: "Fuel up for the hackathon",
            location: "Food Court"
        },
        {
            time: "1:00 PM - 2:00 PM",
            title: "AI in 2025: Future Trends",
            description: "Exploring cutting-edge AI technologies",
            speaker: "Dr. Alex Morgan, AI Research Lead",
            location: "Tech Hub"
        },
        {
            time: "2:00 PM",
            title: "Hacking Begins!",
            description: "Start working on your projects",
            location: "All Zones"
        }
    ],
    day2: [
        {
            time: "All Day",
            title: "Hacking Continues",
            description: "Continue working on your projects",
            location: "All Zones"
        },
        {
            time: "10:00 AM - 11:00 AM",
            title: "Workshop: Web3 Technologies",
            description: "Learn about blockchain and decentralized apps",
            speaker: "Marcus Lee, Blockchain Expert",
            location: "Workshop Room A"
        },
        {
            time: "2:00 PM - 3:00 PM",
            title: "Workshop: Rapid Prototyping",
            description: "Techniques for rapid MVP development",
            speaker: "Zoe Williams, Product Designer",
            location: "Workshop Room B"
        },
        {
            time: "6:00 PM - 7:00 PM",
            title: "Dinner & Networking",
            description: "Take a break and connect with others",
            location: "Food Court"
        }
    ],
};

// Speakers Data

export const speakersDate = [
    {
        name: "Dr. Sarah Chen",
        role: "AI Research Lead",
        company: "TechNova Labs",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Marcus Lee",
        role: "Blockchain Expert",
        company: "CryptoFuture",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Alex Morgan",
        role: "VR/AR Specialist",
        company: "Dimension XR",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Zoe Williams",
        role: "Product Designer",
        company: "Neomorphic UI",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    }
]

// Organizers Data
export const organizersData = [
    {
        name: "Dr. Sarah Chens",
        role: "Event Director",
        company: "TechNova Labs",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Marcus Lee",
        role: "Technical Lead",
        company: "CryptoFuture",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Alex Morgan",
        role: "Operations Manager",
        company: "Dimension XR",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    },
    {
        name: "Zoe Williams",
        role: "Partnerships Lead",
        company: "Neomorphic UI",
        image: "/placeholder.svg",
        socials: {
            linkedin: "#",
            twitter: "#",
            website: "#"
        }
    }
]

// Sponsors Data
export const sponsorsData = {
    diamond: [
        { src: "/placeholder.svg", alt: "TechNova" },
        { src: "/placeholder.svg", alt: "CyberSys" },
    ],
    gold: [
        { src: "/placeholder.svg", alt: "FutureStack" },
        { src: "/placeholder.svg", alt: "Quantum Labs" },
    ],
    silver: [
        { src: "/placeholder.svg", alt: "FutureStack" },
        { src: "/placeholder.svg", alt: "Quantum Labs" },
        { src: "/placeholder.svg", alt: "NeoCode" },
        { src: "/placeholder.svg", alt: "Digital Pulse" },
    ],
    bronze: [
        { src: "/placeholder.svg", alt: "ByteWorks" },
        { src: "/placeholder.svg", alt: "CodeSphere" },
        { src: "/placeholder.svg", alt: "TechFront" },
        { src: "/placeholder.svg", alt: "DataFlow" },
        { src: "/placeholder.svg", alt: "CloudNine" },
        { src: "/placeholder.svg", alt: "HexCore" },
    ]
}