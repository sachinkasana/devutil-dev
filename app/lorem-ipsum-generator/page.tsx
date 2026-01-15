import type { Metadata } from 'next'
import LoremIpsumTool from '../../components/LoremIpsumTool'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online | DevUtil',
  description: 'Generate Lorem Ipsum placeholder text for your designs and mockups. Create paragraphs, words, or sentences instantly. Free online Lorem Ipsum generator for designers and developers.',
  keywords: [
    'lorem ipsum generator',
    'placeholder text generator',
    'dummy text generator',
    'lorem ipsum',
    'placeholder text',
    'fake text generator',
    'lipsum generator',
    'lorem ipsum dolor sit amet'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/lorem-ipsum-generator',
  },
  openGraph: {
    title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online | DevUtil',
    description: 'Generate Lorem Ipsum placeholder text instantly for designs and mockups. Create paragraphs, words, or sentences. Free and fast.',
    url: 'https://www.devutil.dev/lorem-ipsum-generator',
    siteName: 'DevUtil',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.devutil.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'DevUtil'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator - Placeholder Text Generator Online | DevUtil',
    description: 'Generate Lorem Ipsum placeholder text instantly for designs and mockups. Create paragraphs, words, or sentences. Free and fast.',
    images: ['https://www.devutil.dev/og.png']
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lorem Ipsum Generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Any",
  "image": "https://www.devutil.dev/og.png",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online Lorem Ipsum placeholder text generator",
  "url": "https://www.devutil.dev/lorem-ipsum-generator",
  "publisher": {
    "@type": "Organization",
    "name": "DevUtil",
    "url": "https://www.devutil.dev/"
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.devutil.dev"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Lorem Ipsum Generator",
      "item": "https://www.devutil.dev/lorem-ipsum-generator"
    }
  ]
}

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header subtitle="Lorem Ipsum Generator" />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex gap-2 text-sm text-gray-600">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li>/</li>
            <li className="font-semibold">Lorem Ipsum Generator</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Free Lorem Ipsum Generator</h1>
        <p className="text-lg text-gray-700 mb-8">
          Generate Lorem Ipsum placeholder text instantly for your designs, mockups, and prototypes. 
          Choose paragraphs, words, or sentences. Fast, free, and easy to use.
        </p>

        {/* LOREM IPSUM TOOL COMPONENT */}
        <LoremIpsumTool />

        {/* SEO CONTENT */}
        <section className="mt-12 prose max-w-none">
          <h2>What is Lorem Ipsum?</h2>
          <p>
            Lorem Ipsum is placeholder text used in the design and publishing industry. It has been the 
            standard dummy text since the 1500s, when an unknown printer scrambled a galley of type to 
            create a type specimen book. The text is derived from sections of Cicero's "De finibus bonorum 
            et malorum" written in 45 BC, making it over 2000 years old.
          </p>
          <p>
            The text has survived not just five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularized in the 1960s with Letraset sheets containing 
            Lorem Ipsum passages, and more recently with desktop publishing software like PageMaker and 
            word processors.
          </p>

          <h2>Why Use a Lorem Ipsum Generator?</h2>
          <p>
            Lorem Ipsum serves several important purposes in design and development workflows:
          </p>
          <p>
            <strong>Focus on Visual Design:</strong> Using placeholder text allows designers to focus on 
            layout, typography, and visual hierarchy without being distracted by actual content. Real content 
            can bias design decisions or draw attention away from the overall composition.
          </p>
          <p>
            <strong>Realistic Length and Flow:</strong> Unlike using "text here" or "content goes here" 
            repeatedly, Lorem Ipsum has a natural distribution of letters and word lengths that mimics real 
            language. This helps you see how actual content will flow in your design.
          </p>
          <p>
            <strong>Client Presentations:</strong> When presenting mockups to clients before final content 
            is available, Lorem Ipsum prevents them from focusing on placeholder text instead of the design 
            itself. It's clearly temporary but still looks professional.
          </p>
          <p>
            <strong>Rapid Prototyping:</strong> Developers can quickly populate forms, cards, articles, and 
            other UI components with realistic-looking text during development without waiting for copywriters.
          </p>

          <h2>How to Use the Lorem Ipsum Generator</h2>
          <p>
            Our Lorem Ipsum generator is simple and flexible:
          </p>
          <ol>
            <li>Choose what type of text you want: paragraphs, words, or sentences</li>
            <li>Select the quantity (how many paragraphs, words, or sentences)</li>
            <li>Optionally start with "Lorem ipsum dolor sit amet" for the classic opening</li>
            <li>Click "Generate" to create your placeholder text</li>
            <li>Click "Copy" to copy the text to your clipboard</li>
            <li>Paste into your design tool, code editor, or document</li>
          </ol>

          <h2>When to Use Lorem Ipsum</h2>
          <p>
            Lorem Ipsum is most useful in these scenarios:
          </p>

          <h3>Website Mockups and Wireframes</h3>
          <p>
            When creating initial website designs, you often don't have final content yet. Lorem Ipsum lets 
            you show how text will appear in headers, body copy, sidebars, and footers. This helps clients 
            visualize the layout before investing in copywriting.
          </p>

          <h3>Print Design Layouts</h3>
          <p>
            Magazine layouts, brochures, posters, and other print materials benefit from Lorem Ipsum during 
            the design phase. It lets you experiment with column widths, font sizes, and text placement 
            without being constrained by actual content.
          </p>

          <h3>Application Development</h3>
          <p>
            When building user interfaces for web or mobile apps, developers need realistic text to test 
            how components handle different content lengths. Lorem Ipsum helps identify layout issues like 
            text overflow, line breaking, and spacing problems.
          </p>

          <h3>Typography Testing</h3>
          <p>
            When evaluating fonts and type treatments, Lorem Ipsum provides a neutral testing ground. You 
            can assess legibility, readability, and aesthetic appeal without the meaning of words influencing 
            your judgment.
          </p>

          <h2>Lorem Ipsum vs Real Content</h2>
          <p>
            While Lorem Ipsum is invaluable for design work, it has limitations:
          </p>
          <p>
            <strong>Doesn't Test Real-World Scenarios:</strong> Actual content may be shorter, longer, or 
            structured differently than Lorem Ipsum. Always test with real or realistic content before 
            finalizing designs.
          </p>
          <p>
            <strong>Lacks Emotional Context:</strong> Real content has tone, emotion, and meaning that can 
            affect design decisions. Headlines, calls-to-action, and key messages should be designed with 
            actual or very close approximations of final content.
          </p>
          <p>
            <strong>May Hide Content Strategy Issues:</strong> Lorem Ipsum can mask problems with information 
            hierarchy, content flow, and user experience. Always validate designs with content strategists 
            and real users before launch.
          </p>

          <h2>The History of Lorem Ipsum</h2>
          <p>
            The Lorem Ipsum text we use today comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum 
            et Malorum" (The Extremes of Good and Evil) by Marcus Tullius Cicero, written in 45 BC. This book 
            is a treatise on the theory of ethics popular during the Renaissance.
          </p>
          <p>
            The first line "Lorem ipsum dolor sit amet" comes from a line in section 1.10.32: "Neque porro 
            quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." which 
            translates to "There is no one who loves pain itself, who seeks after it and wants to have it, 
            simply because it is pain..."
          </p>
          <p>
            The text was scrambled and altered over the centuries, with words added, removed, or changed. 
            By the 1500s, it had evolved into the Lorem Ipsum we recognize today. The modern version was 
            popularized by Letraset in the 1960s when they released transfer sheets with Lorem Ipsum text.
          </p>

          <h2>Alternatives to Lorem Ipsum</h2>
          <p>
            While Lorem Ipsum is the standard, several alternatives exist:
          </p>

          <h3>Cupcake Ipsum</h3>
          <p>
            Sweet-themed placeholder text using dessert and pastry words. Fun for food-related projects or 
            to add personality to mockups.
          </p>

          <h3>Bacon Ipsum</h3>
          <p>
            Meat-themed placeholder text that uses various meat and cooking terms. Popular among developers 
            for its humor value.
          </p>

          <h3>Hipster Ipsum</h3>
          <p>
            Ironic placeholder text using hipster culture terminology and phrases. Good for modern, 
            lifestyle-oriented designs.
          </p>

          <h3>Corporate Ipsum</h3>
          <p>
            Business jargon and corporate buzzwords as placeholder text. Useful for enterprise software 
            or business-focused designs.
          </p>

          <h3>Real Content</h3>
          <p>
            When possible, use actual content or very close approximations. This is always better than any 
            placeholder text because it reveals real-world constraints and opportunities in your design.
          </p>

          <h2>Lorem Ipsum Best Practices</h2>
          <p>
            Follow these guidelines when using placeholder text:
          </p>

          <h3>Replace Before Launch</h3>
          <p>
            Always replace Lorem Ipsum with real content before launching a website or product. Accidentally 
            shipping with placeholder text looks unprofessional and confuses users.
          </p>

          <h3>Use Appropriate Lengths</h3>
          <p>
            Match your Lorem Ipsum length to realistic content expectations. A headline should be short, 
            body copy longer, captions brief. Don't use the same amount everywhere.
          </p>

          <h3>Test Edge Cases</h3>
          <p>
            Try very short and very long placeholder text to see how your design handles extremes. Real 
            content rarely fits perfectly, so your layout should be flexible.
          </p>

          <h3>Communicate Clearly</h3>
          <p>
            When sharing mockups with clients or stakeholders, clearly indicate that Lorem Ipsum is temporary. 
            Add comments or notes about where real content will come from.
          </p>

          <h3>Consider Accessibility</h3>
          <p>
            Screen readers will read Lorem Ipsum aloud, which isn't helpful for users with visual impairments. 
            In prototypes meant for accessibility testing, use realistic content instead.
          </p>

          <h2>Lorem Ipsum for Different Design Contexts</h2>

          <h3>Web Design</h3>
          <p>
            For websites, use Lorem Ipsum in navigation menus, hero sections, cards, blog posts, sidebars, 
            and footers. Test responsive breakpoints with various text lengths to ensure your design adapts 
            properly.
          </p>

          <h3>Mobile App Design</h3>
          <p>
            Mobile screens have limited space, so use shorter Lorem Ipsum snippets. Test how text truncates, 
            wraps, or scrolls in list views, detail pages, and forms.
          </p>

          <h3>Email Templates</h3>
          <p>
            Email clients render text differently, so test Lorem Ipsum in actual email clients, not just 
            design tools. Pay attention to line length, font rendering, and how text appears on mobile 
            email apps.
          </p>

          <h3>Print Materials</h3>
          <p>
            For brochures, flyers, and posters, print test pages with Lorem Ipsum to verify readability 
            at actual size. What looks good on screen may be too small or large in print.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Where does Lorem Ipsum come from?</h3>
          <p>
            Lorem Ipsum comes from sections of "De finibus bonorum et malorum," a Latin text by Cicero 
            written in 45 BC. The text was scrambled and altered over centuries to create the placeholder 
            text used today.
          </p>

          <h3>What does Lorem Ipsum mean?</h3>
          <p>
            Lorem Ipsum itself doesn't mean anything coherent - it's scrambled Latin. The original source 
            material was about ethics and philosophy, but the modern Lorem Ipsum is intentionally nonsensical 
            to avoid distracting from design.
          </p>

          <h3>Is Lorem Ipsum copyrighted?</h3>
          <p>
            No, Lorem Ipsum is not copyrighted. It's based on ancient Latin text that's in the public domain. 
            You can freely use it in any project, commercial or personal.
          </p>

          <h3>How much Lorem Ipsum should I use?</h3>
          <p>
            Use enough to fill your layout realistically but not so much that it becomes unwieldy. For a blog 
            post layout, 2-3 paragraphs might be enough. For a full article page, use 5-10 paragraphs.
          </p>

          <h3>Can I use Lorem Ipsum in production?</h3>
          <p>
            No, never ship products with Lorem Ipsum text. It should only be used during design and 
            development. Always replace it with real content before launch.
          </p>

          <h3>Are there Lorem Ipsum alternatives?</h3>
          <p>
            Yes, there are many themed alternatives like Bacon Ipsum, Cupcake Ipsum, and Hipster Ipsum. 
            However, Lorem Ipsum remains the most professional choice for client presentations.
          </p>

          <h2>Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <a href="/json-formatter" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">JSON Formatter</h3>
              <p className="text-sm text-gray-600">Format and validate JSON data for APIs and configs.</p>
            </a>
            <a href="/password-generator" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">Password Generator</h3>
              <p className="text-sm text-gray-600">Generate strong, secure random passwords.</p>
            </a>
            <a href="/uuid-generator" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">UUID Generator</h3>
              <p className="text-sm text-gray-600">Create unique identifiers for your projects.</p>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
