import { Card, CardContent } from "@/components/ui/card"

export default function TermsConditionsFR() {
  return (
    <section className="py-10">
      <Card className="mx-auto border-none shadow-none">
        <CardContent className="space-y-6 p-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">Conditions d’utilisation</h1>
            <p className="text-sm text-muted-foreground">
              Conditions générales d’utilisation – « Akarcom »
            </p>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 10 octobre 2024
            </p>
          </header>

          <p>
            Bienvenue sur <strong>Akarcom</strong>. En utilisant notre site ou
            l’un de ses services, vous acceptez de respecter les conditions
            ci-dessous. Veuillez les lire attentivement avant toute utilisation.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Définitions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Site :</strong> la plateforme immobilière Akarcom.
              </li>
              <li>
                <strong>Utilisateur :</strong> toute personne naviguant,
                recherchant ou publiant une annonce.
              </li>
              <li>
                <strong>Contenu :</strong> annonces, images, textes et offres
                publiés sur le site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Conditions d’utilisation du service
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>L’utilisateur doit être âgé d’au moins 18 ans</li>
              <li>
                Le site doit être utilisé à des fins légales uniquement
              </li>
              <li>
                La publication de contenu faux, trompeur ou offensant est
                interdite
              </li>
              <li>
                Akarcom se réserve le droit de supprimer tout contenu non conforme
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Création de compte
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Les informations fournies doivent être exactes</li>
              <li>Les identifiants doivent rester confidentiels</li>
              <li>
                Le compte peut être suspendu en cas d’utilisation abusive
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Annonces</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                L’utilisateur est responsable des informations publiées
              </li>
              <li>Les biens proposés doivent être réels et disponibles</li>
              <li>
                Toute violation des droits de propriété ou de la vie privée est
                interdite
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Responsabilité</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Akarcom ne garantit pas l’exactitude de toutes les annonces
              </li>
              <li>
                La plateforme n’est pas responsable des litiges entre utilisateurs
              </li>
              <li>
                Chaque partie est responsable de ses propres accords
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Modification des conditions
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Akarcom peut modifier ces conditions à tout moment</li>
              <li>Les modifications prennent effet immédiatement</li>
              <li>
                L’utilisation continue vaut acceptation des nouvelles conditions
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Propriété intellectuelle
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Tous les éléments du site sont la propriété d’Akarcom
              </li>
              <li>
                Toute reproduction sans autorisation écrite est interdite
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Protection des données
            </h2>
            <p>
              Les données des utilisateurs sont protégées conformément à la
              politique de confidentialité. Veuillez vous y référer pour plus
              d’informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Droit applicable</h2>
            <p>
              Ces conditions sont régies par les lois en vigueur dans le pays où
              opère Akarcom. Les tribunaux locaux sont compétents en cas de litige.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
