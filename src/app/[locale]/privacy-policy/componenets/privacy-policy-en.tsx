import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyEN() {
  return (
    <section className="py-10">
      <Card className=" mx-auto border-none shadow-none">
        <CardContent className="space-y-6 p-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: October 10, 2024
            </p>
          </header>

          <p>
            Welcome to <strong>Akarcom</strong>, your trusted platform for
            searching, buying, selling, and renting real estate. We place great
            importance on your privacy and the protection of your personal data.
            This document explains how we collect, use, store, and share your
            information. By using our website or any of our services, you agree
            to this Privacy Policy.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>

            <h3 className="font-semibold">A. Personal Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address (when required for location-based services)</li>
              <li>Username and password</li>
            </ul>

            <h3 className="font-semibold mt-4">B. Technical Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Device and browser type</li>
              <li>Visited pages and browsing duration</li>
            </ul>

            <h3 className="font-semibold mt-4">C. Property Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Property location</li>
              <li>
                Property details (type, size, price, images, etc.)
              </li>
              <li>Property description and additional information</li>
            </ul>

            <h3 className="font-semibold mt-4">
              D. Payment Information (for paid services)
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Card number or bank account details</li>
              <li>
                This data is stored using high-level encryption technologies
              </li>
            </ul>

            <h3 className="font-semibold mt-4">E. Voluntary Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Messages, requests, or inquiries</li>
              <li>Comments on property listings</li>
              <li>Newsletter or promotional subscriptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use the Information
            </h2>

            <h3 className="font-semibold">A. User Experience Personalization</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Display properties matching your preferences</li>
              <li>Save searches and previous interests</li>
            </ul>

            <h3 className="font-semibold mt-4">B. Account Management</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Manage your property listings</li>
              <li>Track activities such as messages or requests</li>
            </ul>

            <h3 className="font-semibold mt-4">C. Communication</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your inquiries or requests</li>
              <li>Send notifications about new properties or market updates</li>
              <li>Inform you about special offers and new content</li>
            </ul>

            <h3 className="font-semibold mt-4">D. Analytics and Improvement</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Improve website performance based on user behavior</li>
              <li>Develop new features aligned with market needs</li>
            </ul>

            <h3 className="font-semibold mt-4">E. Security and Protection</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Detect suspicious activities</li>
              <li>Protect accounts from unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Information Sharing
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                With service providers such as payment gateways, hosting
                services, or analytics tools
              </li>
              <li>With legal authorities when required by law</li>
              <li>
                With real estate partners in a general, non-personal manner
                (e.g., statistics)
              </li>
              <li>
                We do not share your personal information with third parties
                without your explicit consent
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Data Protection and Storage
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full encryption of sensitive data during transfer and storage</li>
              <li>Effective security systems such as firewalls</li>
              <li>Regular security audits</li>
              <li>Restricted employee access to data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. User Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to your personal data</li>
              <li>Modify your personal information</li>
              <li>Request account and data deletion</li>
              <li>Withdraw previously granted consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Analyze browsing behavior and improve services</li>
              <li>Facilitate login and remember preferences</li>
              <li>Control cookie settings via your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Our Commitment</h2>
            <p>
              At <strong>Akarcom</strong>, we believe that your privacy is a core
              part of your real estate experience. We are committed to using
              your data solely to serve you and to provide a secure, reliable,
              and efficient real estate platform.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
