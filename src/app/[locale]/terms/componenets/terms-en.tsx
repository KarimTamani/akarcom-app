import { Card, CardContent } from "@/components/ui/card"

export default function TermsConditionsEN() {
  return (
    <section className="py-10">
      <Card className="mx-auto border-none shadow-none">
        <CardContent className="space-y-6 p-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground">
              General Terms of Use – “Akarcom”
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: October 10, 2024
            </p>
          </header>

          <p>
            Welcome to <strong>Akarcom</strong>. By using our website or any of
            its services, you agree to comply with the terms and conditions
            outlined below. Please read them carefully before using the
            platform.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Website:</strong> The Akarcom real estate platform.
              </li>
              <li>
                <strong>User:</strong> Any person browsing, searching, or
                posting listings.
              </li>
              <li>
                <strong>Content:</strong> All listings, images, text, and offers
                published on the platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Terms of Service Use
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Users must be at least 18 years old</li>
              <li>
                The website must be used for lawful and legitimate purposes only
              </li>
              <li>Publishing false, misleading, or abusive content is prohibited</li>
              <li>
                Akarcom reserves the right to remove or modify violating content
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Account Creation</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Users must provide accurate and truthful information</li>
              <li>Login credentials must be kept confidential</li>
              <li>
                Akarcom may suspend or terminate accounts in case of misuse
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Listings</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Users are responsible for the accuracy of posted listings</li>
              <li>All listed properties must be real and available</li>
              <li>
                Content violating intellectual property or privacy rights is
                prohibited
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Liability</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Akarcom does not guarantee the accuracy of all listings
              </li>
              <li>
                The platform is not responsible for disputes between users
              </li>
              <li>
                Users are solely responsible for negotiations and agreements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Changes to the Terms
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Akarcom may modify these terms at any time</li>
              <li>Changes take effect immediately upon publication</li>
              <li>Continued use implies acceptance of updated terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Intellectual Property
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All website elements are owned by Akarcom</li>
              <li>
                Copying or redistribution without written permission is
                prohibited
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Data Protection</h2>
            <p>
              User data is protected in accordance with our Privacy Policy.
              Please refer to the Privacy Policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the country in which
              Akarcom operates. Local courts shall have jurisdiction over any
              disputes.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
