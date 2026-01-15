
import type { Metadata } from 'next'
import PasswordGeneratorTool from '../../components/PasswordGeneratorTool'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Free Password Generator - Create Strong Random Passwords Online | DevUtil',
  description: 'Generate strong, secure random passwords online. Customize length, include symbols, numbers, uppercase letters. 100% client-side processing. No passwords stored. Privacy-focused password generator.',
  keywords: [
    'password generator',
    'random password generator',
    'strong password generator',
    'secure password generator',
    'generate password online',
    'password creator',
    'random password',
    'strong password',
    'password maker'
  ],
  alternates: {
    canonical: 'https://www.devutil.dev/password-generator',
  },
  openGraph: {
    title: 'Free Password Generator - Create Strong Random Passwords Online | DevUtil',
    description: 'Generate strong, secure random passwords online. Customize length and character types. 100% client-side processing with no storage.',
    url: 'https://www.devutil.dev/password-generator',
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
    title: 'Free Password Generator - Create Strong Random Passwords Online | DevUtil',
    description: 'Generate strong, secure random passwords online. Customize length and character types. 100% client-side processing with no storage.',
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
  "name": "Password Generator",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Any",
  "image": "https://www.devutil.dev/og.png",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online password generator for creating strong, secure random passwords",
  "url": "https://www.devutil.dev/password-generator",
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
      "name": "Password Generator",
      "item": "https://www.devutil.dev/password-generator"
    }
  ]
}

export default function PasswordGeneratorPage() {
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

      <Header subtitle="Password Generator" />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex gap-2 text-sm text-gray-600">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li>/</li>
            <li className="font-semibold">Password Generator</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Free Online Password Generator</h1>
        <p className="text-lg text-gray-700 mb-8">
          Generate strong, secure random passwords instantly. Customize length and character types. 
          All passwords are created in your browser - nothing is stored or sent to any server.
        </p>

        {/* PASSWORD GENERATOR TOOL COMPONENT */}
        <PasswordGeneratorTool />

        {/* SEO CONTENT */}
        <section className="mt-12 prose max-w-none">
          <h2>What is a Password Generator?</h2>
          <p>
            A password generator is a tool that creates random, strong passwords to help protect your 
            online accounts from unauthorized access. Instead of manually creating passwords, which often 
            leads to weak or reused credentials, a password generator uses cryptographic randomness to 
            produce passwords that are extremely difficult to guess or crack.
          </p>
          <p>
            Our password generator runs entirely in your browser using JavaScript's cryptographic functions. 
            This means your generated passwords are never transmitted over the internet, stored on any server, 
            or logged in any way. The moment you close your browser tab, the password is gone unless you've 
            saved it to your password manager.
          </p>

          <h2>Why Use a Random Password Generator?</h2>
          <p>
            Human-created passwords are predictable. People tend to use common words, dates, names, or simple 
            patterns that hackers can easily guess using automated tools. A random password generator eliminates 
            human bias and creates truly random combinations of characters that are exponentially harder to crack.
          </p>
          <p>
            Modern password cracking tools can test billions of password combinations per second. A simple 
            8-character password using only lowercase letters can be cracked in seconds. However, a 16-character 
            password with mixed case, numbers, and symbols would take trillions of years to crack with current 
            technology. That's the power of randomness and length.
          </p>

          <h2>How to Create a Strong Password</h2>
          <p>
            A strong password has several key characteristics that make it resistant to cracking attempts:
          </p>
          <ul>
            <li><strong>Length matters most:</strong> Aim for at least 16 characters. Each additional character 
            exponentially increases the time needed to crack the password.</li>
            <li><strong>Use all character types:</strong> Include uppercase letters (A-Z), lowercase letters (a-z), 
            numbers (0-9), and special symbols (!@#$%^&*).</li>
            <li><strong>Avoid patterns:</strong> Don't use sequential characters (abc, 123) or keyboard patterns 
            (qwerty, asdf).</li>
            <li><strong>No personal information:</strong> Never include your name, birthday, pet names, or other 
            easily discoverable information.</li>
            <li><strong>Unique for each account:</strong> Never reuse passwords across different websites or services.</li>
          </ul>

          <h2>How to Use the Password Generator</h2>
          <p>
            Using our password generator is simple and takes just seconds:
          </p>
          <ol>
            <li>Choose your desired password length using the slider (8-64 characters recommended: 16+)</li>
            <li>Select which character types to include (uppercase, lowercase, numbers, symbols)</li>
            <li>Click "Generate Password" to create a new random password</li>
            <li>Click "Copy" to copy the password to your clipboard</li>
            <li>Paste the password into your password manager or account registration form</li>
            <li>Generate as many passwords as you need - each one is completely random</li>
          </ol>

          <h2>Password Security Best Practices</h2>
          <p>
            Generating a strong password is just the first step. Follow these best practices to maintain 
            good password security:
          </p>
          
          <h3>Use a Password Manager</h3>
          <p>
            Store your generated passwords in a reputable password manager like 1Password, Bitwarden, or 
            LastPass. Password managers securely encrypt your passwords and automatically fill them in when 
            needed. This allows you to use unique, complex passwords for every account without needing to 
            remember them all.
          </p>

          <h3>Enable Two-Factor Authentication</h3>
          <p>
            Even strong passwords can potentially be compromised through phishing, data breaches, or keyloggers. 
            Two-factor authentication (2FA) adds an extra layer of security by requiring a second form of 
            verification, such as a code from your phone or a hardware security key.
          </p>

          <h3>Never Reuse Passwords</h3>
          <p>
            If you reuse the same password across multiple sites, a breach at one site compromises all your 
            accounts. Always generate a unique password for each account. With a password manager, this is 
            effortless.
          </p>

          <h3>Change Passwords After Breaches</h3>
          <p>
            If a service you use reports a data breach, immediately generate a new password and update your 
            account. Services like Have I Been Pwned can alert you when your email appears in known breaches.
          </p>

          <h3>Be Wary of Phishing</h3>
          <p>
            No password is secure if you type it into a fake website. Always verify you're on the correct 
            URL before entering credentials. Look for HTTPS in the address bar and bookmark important login 
            pages to avoid typosquatting sites.
          </p>

          <h2>How Password Length Affects Security</h2>
          <p>
            Password length is the single most important factor in password strength. Here's how different 
            lengths compare when using all character types (uppercase, lowercase, numbers, symbols):
          </p>
          <ul>
            <li><strong>8 characters:</strong> Can be cracked in hours to days with modern hardware</li>
            <li><strong>12 characters:</strong> Would take years to crack with current technology</li>
            <li><strong>16 characters:</strong> Would take thousands of years to crack</li>
            <li><strong>20+ characters:</strong> Virtually impossible to crack with any foreseeable technology</li>
          </ul>
          <p>
            This is why we recommend passwords of at least 16 characters. The additional length provides 
            substantial security improvements while still being manageable with a password manager.
          </p>

          <h2>Common Password Mistakes to Avoid</h2>
          <p>
            These common mistakes make passwords vulnerable to attacks:
          </p>

          <h3>Using Dictionary Words</h3>
          <p>
            Passwords like "password", "welcome", or "baseball" can be cracked instantly using dictionary 
            attacks. Even adding numbers like "password123" doesn't help much, as these patterns are well-known 
            to attackers.
          </p>

          <h3>Simple Substitutions</h3>
          <p>
            Replacing letters with similar-looking numbers (p@ssw0rd) or adding exclamation marks at the end 
            (Password!) are predictable patterns that password crackers specifically check for.
          </p>

          <h3>Personal Information</h3>
          <p>
            Using birthdays, family names, pet names, or favorite sports teams makes passwords easy to guess 
            for anyone who knows you or can find your social media profiles.
          </p>

          <h3>Short Passwords</h3>
          <p>
            Many sites require minimum 8-character passwords, but this is no longer considered secure. Always 
            use the maximum length the site allows, preferably 16 characters or more.
          </p>

          <h3>Reusing Passwords</h3>
          <p>
            This is perhaps the most dangerous mistake. When one site gets breached, attackers try those 
            credentials on other popular sites. This is called credential stuffing and it's extremely effective.
          </p>

          <h2>Why Our Password Generator is Secure</h2>
          <p>
            Security and privacy are our top priorities. Here's what makes our password generator trustworthy:
          </p>
          
          <p>
            <strong>100% Client-Side Generation:</strong> All passwords are generated in your browser using 
            JavaScript's Web Crypto API. Your browser creates the random values using cryptographically secure 
            random number generation. The password never leaves your device.
          </p>

          <p>
            <strong>No Server Communication:</strong> We don't send your passwords to any server. We don't log 
            them. We don't store them. The generated password exists only in your browser's memory until you 
            copy it or close the tab.
          </p>

          <p>
            <strong>No Tracking or Analytics:</strong> We don't track what passwords you generate, how many 
            you create, or what settings you use. Your privacy is completely protected.
          </p>

          <p>
            <strong>Open Source Approach:</strong> You can view the source code of this page in your browser's 
            developer tools to verify that we're not doing anything malicious with your passwords.
          </p>

          <p>
            <strong>Works Offline:</strong> Once this page loads, you can disconnect from the internet and 
            continue generating passwords. This proves that nothing is being transmitted.
          </p>

          <h2>Password Generator vs Password Manager</h2>
          <p>
            A password generator and password manager serve different but complementary purposes:
          </p>

          <p>
            <strong>Password Generator:</strong> Creates new random passwords. Use this when signing up for 
            new accounts, changing old passwords, or creating master passwords for your password manager.
          </p>

          <p>
            <strong>Password Manager:</strong> Stores and encrypts your passwords, automatically fills them 
            in on websites, and syncs them across your devices. Most password managers include built-in 
            password generators.
          </p>

          <p>
            Our password generator is perfect for quick one-time use, sharing passwords securely (generate, 
            copy, paste, done), or when you don't have access to your password manager. However, we strongly 
            recommend using a dedicated password manager for long-term password storage and management.
          </p>

          <h2>How Hackers Crack Passwords</h2>
          <p>
            Understanding attack methods helps you appreciate why strong passwords matter:
          </p>

          <h3>Brute Force Attacks</h3>
          <p>
            Attackers try every possible combination of characters until they find the right password. Modern 
            GPUs can test billions of combinations per second, making short or simple passwords vulnerable.
          </p>

          <h3>Dictionary Attacks</h3>
          <p>
            Attackers use lists of common words, names, and passwords leaked from previous breaches. These 
            lists contain billions of known passwords and can crack weak passwords almost instantly.
          </p>

          <h3>Rainbow Table Attacks</h3>
          <p>
            Pre-computed tables of password hashes allow attackers to quickly reverse-engineer passwords 
            from stolen database dumps. Longer, more complex passwords are not included in these tables.
          </p>

          <h3>Credential Stuffing</h3>
          <p>
            When passwords leak from one site, attackers try those same credentials on other popular services. 
            This is why unique passwords for each account are essential.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>How long should my password be?</h3>
          <p>
            We recommend at least 16 characters for important accounts. For maximum security, use 20-32 
            characters. The longer the password, the more secure it is.
          </p>

          <h3>Should I include symbols in my password?</h3>
          <p>
            Yes, including symbols increases the number of possible combinations, making the password harder 
            to crack. However, length is more important than complexity. A 20-character password with only 
            letters is stronger than a 10-character password with all character types.
          </p>

          <h3>Can I use this for my master password?</h3>
          <p>
            Yes, but consider using a passphrase instead. A passphrase like "correct-horse-battery-staple" 
            is easier to remember than a random string while still being very secure due to its length.
          </p>

          <h3>How often should I change my passwords?</h3>
          <p>
            Only change passwords when you suspect they've been compromised or after a service reports a 
            breach. Regular password changes without reason can lead to weaker passwords as people resort 
            to predictable patterns.
          </p>

          <h3>Is this password generator truly random?</h3>
          <p>
            Yes, we use the Web Crypto API's cryptographically secure random number generator, which is 
            suitable for security-sensitive applications. This is the same random generator used by 
            password managers and encryption software.
          </p>

          <h3>Can someone see my generated password?</h3>
          <p>
            No. The password is generated entirely in your browser's memory and never leaves your device. 
            We don't log it, transmit it, or store it anywhere. When you close the tab, it's gone.
          </p>

          <h3>What if I need to remember the password?</h3>
          <p>
            Don't try to remember randomly generated passwords. Instead, store them in a password manager. 
            The only password you should memorize is your password manager's master password.
          </p>

          <h2>Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <a href="/hash-generator" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">Hash Generator</h3>
              <p className="text-sm text-gray-600">Generate MD5, SHA-1, SHA-256 hashes for passwords and data.</p>
            </a>
            <a href="/base64-encoder" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">Base64 Encoder</h3>
              <p className="text-sm text-gray-600">Encode sensitive data for safe transmission.</p>
            </a>
            <a href="/uuid-generator" className="border p-4 rounded hover:shadow-lg transition">
              <h3 className="font-bold mb-2">UUID Generator</h3>
              <p className="text-sm text-gray-600">Generate unique identifiers for database records.</p>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
