import { Building, Users, Briefcase, Rocket, UserCheck, Server } from 'lucide-react';

export const features = [
    {
        icon: Building,
        title: 'Digital Marketing Agencies',
        description: 'Offer AI-powered outreach services to clients and generate recurring revenue streams.',
    },
    {
        icon: Users,
        title: 'Sales Teams',
        description: 'Scale your outreach with intelligent automation and personalized messaging.',
    },
    {
        icon: Briefcase,
        title: 'Growing Businesses',
        description: 'Comprehensive lead generation solutions that scale with your business needs.',
    },
    {
        icon: UserCheck,
        title: 'Consultants & Coaches',
        description: 'Monetize lead generation as a premium service offering to your clients.'
    },
    {
        icon: Rocket,
        title: 'Entrepreneurs',
        description: 'Launch and scale your business with proven, customizable automation tools.'
    },
    {
        icon: Server,
        title: 'Enterprise Teams',
        description: 'Complete, brandable platform with multi-tenant architecture and user management.'
    }
];

export const testimonials = [
  {
    name: 'Sarah J.',
    role: 'CEO of TechCorp',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    testimonial: 'Svara AI has transformed our sales process. The quality of leads is unparalleled, and the AI scoring is a game-changer.'
  },
  {
    name: 'Mike R.',
    role: 'Head of Sales at Innovate Ltd.',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    testimonial: 'We\'ve seen a 300% increase in qualified leads since adopting Svara. It\'s an essential tool for any modern sales team.'
  },
   {
    name: 'Emily K.',
    role: 'Founder of MarketRise',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    testimonial: 'The automated scraping and enrichment saves us hundreds of hours per month. It\'s like having a team of data scientists on demand.'
  },
  {
    name: 'David L.',
    role: 'VP of Growth, ScaleUp',
    avatar: 'https://picsum.photos/seed/avatar4/100/100',
    testimonial: 'The integration was seamless, and we started seeing high-quality leads within the first day. Highly recommended.'
  },
  {
    name: 'Jessica M.',
    role: 'Sales Director, Global Solutions',
    avatar: 'https://picsum.photos/seed/avatar5/100/100',
    testimonial: 'Svara\'s ability to identify key decision-makers has been invaluable. Our outreach is more effective than ever.'
  },
  {
    name: 'Alex C.',
    role: 'Marketing Manager, Creative Co.',
    avatar: 'https://picsum.photos/seed/avatar6/100/100',
    testimonial: 'A fantastic tool for aligning sales and marketing. We now have a consistent, high-quality stream of leads to nurture.'
  },
  {
    name: 'Maria G.',
    role: 'Founder, Connect AI',
    avatar: 'https://picsum.photos/seed/avatar7/100/100',
    testimonial: 'As a startup founder, every second counts. Svara AI is our secret weapon for efficient and effective lead generation.'
  },
  {
    name: 'Tom H.',
    role: 'Enterprise Account Executive',
    avatar: 'https://picsum.photos/seed/avatar8/100/100',
    testimonial: 'I can focus on building relationships and closing deals instead of spending hours on prospecting. It has easily doubled my productivity.'
  },
  {
    name: 'Linda B.',
    role: 'Business Development, Synergy Inc.',
    avatar: 'https://picsum.photos/seed/avatar9/100/100',
    testimonial: 'The data accuracy is top-notch. We\'ve significantly reduced our bounce rates on email campaigns.'
  },
  {
    name: 'Kevin S.',
    role: 'CEO, QuantumLeap',
    avatar: 'https://picsum.photos/seed/avatar10/100/100',
    testimonial: 'This is the future of B2B sales. The AI not only finds leads but gives us the context we need to start meaningful conversations.'
  },
];


export const pricingPlans = [
    {
        title: 'Free',
        description: 'For individuals and small teams getting started.',
        price: '$0',
        features: [
            '50 leads/month',
            'Basic enrichment',
            'Community support'
        ],
        isPopular: false,
        cta: {
            text: 'Get Started',
            href: '/signup'
        }
    },
    {
        title: 'Pro',
        description: 'For growing teams that need more power and scale.',
        price: '$99',
        features: [
            '2,000 leads/month',
            'Advanced AI enrichment',
            'API Access & Webhooks',
            'Priority email support'
        ],
        isPopular: true,
        cta: {
            text: 'Choose Pro',
            href: '/signup'
        }
    },
    {
        title: 'Enterprise',
        description: 'For large organizations with custom requirements.',
        price: 'Custom',
        features: [
            'Unlimited leads',
            'Custom AI models',
            'Dedicated account manager',
            '24/7 premium support'
        ],
        isPopular: false,
        cta: {
            text: 'Contact Sales',
            href: '/contact-sales'
        }
    }
]
