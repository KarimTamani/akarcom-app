import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyFR() {
  return (
    <section className="py-10">
      <Card className="mx-auto border-none shadow-none">
        <CardContent className="space-y-6 p-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">
              Politique de confidentialité
            </h1>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 10 octobre 2024
            </p>
          </header>

          <p>
            Bienvenue sur <strong>Aqarcom</strong>, votre plateforme de confiance
            pour la recherche, l’achat, la vente et la location de biens
            immobiliers. Nous accordons une grande importance à votre vie privée
            et à la protection de vos données personnelles. Ce document explique
            comment nous collectons, utilisons, stockons et partageons vos
            informations. En utilisant notre site ou nos services, vous acceptez
            cette politique de confidentialité.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Informations que nous collectons
            </h2>

            <h3 className="font-semibold">A. Informations personnelles</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nom complet</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Adresse (si nécessaire pour les services géolocalisés)</li>
              <li>Nom d’utilisateur et mot de passe</li>
            </ul>

            <h3 className="font-semibold mt-4">B. Informations techniques</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Adresse IP</li>
              <li>Type d’appareil et de navigateur</li>
              <li>Pages visitées et durée de navigation</li>
            </ul>

            <h3 className="font-semibold mt-4">C. Informations immobilières</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Localisation du bien</li>
              <li>
                Détails du bien (type, surface, prix, images, etc.)
              </li>
              <li>Description et informations complémentaires</li>
            </ul>

            <h3 className="font-semibold mt-4">
              D. Informations de paiement (services payants)
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Données de carte ou compte bancaire</li>
              <li>
                Ces données sont stockées à l’aide de technologies de chiffrement
                avancées
              </li>
            </ul>

            <h3 className="font-semibold mt-4">E. Informations volontaires</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Messages, demandes ou questions</li>
              <li>Commentaires sur les annonces immobilières</li>
              <li>Inscription à la newsletter ou aux offres promotionnelles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Utilisation des informations
            </h2>

            <h3 className="font-semibold">
              A. Personnalisation de l’expérience utilisateur
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Afficher des biens correspondant à vos préférences</li>
              <li>Sauvegarder vos recherches et intérêts</li>
            </ul>

            <h3 className="font-semibold mt-4">B. Gestion du compte</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gestion de vos annonces immobilières</li>
              <li>Suivi des activités (messages, demandes)</li>
            </ul>

            <h3 className="font-semibold mt-4">C. Communication</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Répondre à vos demandes</li>
              <li>
                Envoyer des notifications sur les nouveaux biens ou le marché
              </li>
              <li>Vous informer des offres spéciales et nouveaux contenus</li>
            </ul>

            <h3 className="font-semibold mt-4">D. Analyse et amélioration</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Amélioration des performances du site</li>
              <li>Développement de nouvelles fonctionnalités</li>
            </ul>

            <h3 className="font-semibold mt-4">E. Sécurité et protection</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Détection des activités suspectes</li>
              <li>Protection contre les accès non autorisés</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Partage des informations
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Avec les prestataires de services (paiement, hébergement,
                analyse)
              </li>
              <li>Avec les autorités légales lorsque requis</li>
              <li>
                Avec des partenaires immobiliers de manière globale et non
                personnelle
              </li>
              <li>
                Aucune donnée personnelle n’est partagée sans votre consentement
                explicite
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Protection et stockage des données
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Chiffrement complet des données sensibles</li>
              <li>Systèmes de sécurité efficaces (pare-feu)</li>
              <li>Audits de sécurité réguliers</li>
              <li>Accès restreint aux données pour le personnel autorisé</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Droits des utilisateurs
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Droit d’accès à vos données</li>
              <li>Droit de modification</li>
              <li>Droit à la suppression du compte et des données</li>
              <li>Droit de retrait du consentement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Cookies
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Analyse du comportement de navigation</li>
              <li>Facilitation de la connexion et mémorisation des préférences</li>
              <li>Gestion des cookies via le navigateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Notre engagement</h2>
            <p>
              Chez <strong>Aqarcom</strong>, nous considérons que votre vie privée
              est essentielle à votre expérience immobilière. Nous nous engageons
              à utiliser vos données uniquement pour vous servir et vous offrir
              une plateforme sécurisée, fiable et efficace.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
