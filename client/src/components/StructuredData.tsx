// JSON-LD Structured Data for SEO rich snippets
// This helps Google understand what SoloChief is and display rich results

export function OrganizationSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SoloChief',
        url: 'https://solochief.com',
        logo: 'https://solochief.com/solochief-logo.svg',
        description:
            'SoloChief provides hyper-specialized AI operators that autonomously handle lead generation, ad design, video production, market intelligence, reputation management, and domain infrastructure for businesses and entrepreneurs.',
        foundingDate: '2026',
        founder: {
            '@type': 'Person',
            name: 'Ajay',
            jobTitle: 'Founder & CEO',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@solochief.com',
            contactType: 'customer service',
            availableLanguage: 'English',
        },
        sameAs: [],
        offers: {
            '@type': 'AggregateOffer',
            lowPrice: '498',
            highPrice: '1498',
            priceCurrency: 'USD',
            offerCount: 3,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    );
}

export function WebsiteSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SoloChief',
        url: 'https://solochief.com',
        description: 'Autonomous AI Workforce for Businesses',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://solochief.com/operators?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    );
}

export function SoftwareApplicationSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SoloChief AI Operators',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
            'Ten hyper-specialized AI operators that autonomously handle business operations: lead generation, ad design, video production, market intelligence, reputation management, and domain infrastructure.',
        offers: [
            {
                '@type': 'Offer',
                name: 'CORE',
                price: '498',
                priceCurrency: 'USD',
                description: 'The Foundation. For founders who need to validate quickly and generate cash flow.',
                priceValidUntil: '2027-12-31',
            },
            {
                '@type': 'Offer',
                name: 'PRIME',
                price: '898',
                priceCurrency: 'USD',
                description: 'The Growth Engine. For scaling startups requiring market intelligence & protection.',
                priceValidUntil: '2027-12-31',
            },
            {
                '@type': 'Offer',
                name: 'APEX',
                price: '1498',
                priceCurrency: 'USD',
                description: 'The Market Leader. Maximum volume. Total market ubiquity.',
                priceValidUntil: '2027-12-31',
            },
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '47',
            bestRating: '5',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
    );
}
