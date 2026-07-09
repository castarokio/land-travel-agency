import { Destination } from "@/types";
import { asset } from "@/lib/assets";

export const destinations: Destination[] = [
  {
    id: "maldives",
    name: "Les Maldives",
    tagline: "Échappée tropicale & Atolls coralliens",
    shortDesc: "Des îles-hôtels privées entourées de lagons turquoise d'une clarté absolue.",
    image: asset("intl-maldives-resort.webp"),
    heroImage: asset("intl-maldives-resort.webp"),
    intro: "Découvrez un archipel de rêve où le temps semble s'arrêter. Entre plages de sable blanc d'une finesse absolue, villas de luxe sur pilotis et récifs coralliens foisonnants de vie marine, les Maldives offrent le sanctuaire ultime pour s'évader du quotidien.",
    places: [
      {
        name: "L'Atoll de Malé Nord",
        image: asset("airport.webp"),
        description: "L'un des atolls les plus réputés, alliant transferts rapides, lagons somptueux et une barrière de corail idéale pour le snorkeling."
      },
      {
        name: "La Réserve d'Atoll Baa (UNESCO)",
        image: asset("intl-maldives-resort.webp"),
        description: "Un espace maritime protégé abritant une biodiversité marine unique, célèbre pour ses rassemblements saisonniers de raies mantas."
      },
      {
        name: "Les Plages de Sable Luminescent de Vaadhoo",
        image: asset("local-coastal-resort.webp"),
        description: "Un spectacle magique où les vagues s'illuminent d'une lueur bleue fluorescente à la nuit tombée grâce au phytoplancton."
      }
    ],
    stats: [
      { value: "28°C", label: "Température Eau Moyenne" },
      { value: "350", label: "Espèces de Corail" },
      { value: "99%", label: "Satisfaction Voyageurs" }
    ],
    hotels: [
      {
        name: "Soneva Jani 5* Luxury",
        type: "Villas sur pilotis",
        desc: "Resort de luxe emblématique proposant des villas avec toits rétractables et toboggans privés menant directement dans le lagon."
      },
      {
        name: "Kuredu Island Resort 4*",
        type: "Bungalows de plage",
        desc: "Une île-hôtel animée dotée de superbes plages de sable blanc, de terrains de golf et d'un centre de plongée PADI réputé."
      }
    ],
    reviews: [
      {
        author: "Sarah & Marc (Lyon)",
        rating: 5,
        text: "Un paradis absolu. Le séjour sur pilotis reste inoubliable, la clarté de l'eau est irréelle.",
        date: "Mai 2026"
      },
      {
        author: "Thomas D. (Bruxelles)",
        rating: 5,
        text: "Nager avec les raies mantas à la réserve de Baa restera l'un des plus beaux moments de ma vie.",
        date: "Février 2026"
      }
    ],
    collage: [
      asset("intl-maldives-resort.webp"),
      asset("airport.webp"),
      asset("local-coastal-resort.webp")
    ],
    price: "À partir de 1 890 €",
    duration: "8 Jours",
    placesCount: "3 Lieux",
    rating: "4.9/5 selon plus de 120 avis",
    location: "Maldives, Océan Indien",
    itinerary: [
      {
        title: "1. Arrivée à Malé",
        subtitle: "Accueil à l'aéroport international de Malé",
        desc: "Bienvenue aux Maldives. À votre arrivée à l'aéroport international de Velana, vous serez accueilli par notre représentant local et transféré en speedboat ou hydravion vers votre lagon paradisiaque.",
        image: asset("airport.webp")
      },
      {
        title: "2. Détente & Récifs de Corail",
        subtitle: "Exploration des récifs maison",
        desc: "Consacrez cette journée à la découverte du récif corallien qui entoure votre île-hôtel. Équipé de palmes, masque et tuba, vous nagerez au milieu de centaines de poissons tropicaux multicolores.",
        image: asset("intl-maldives-resort.webp")
      },
      {
        title: "3. Réserve d'Atoll Baa",
        subtitle: "Nager avec les raies mantas",
        desc: "Excursion guidée en bateau vers la réserve de biosphère de l'Atoll Baa (classée par l'UNESCO). Si les conditions de saison le permettent, vous aurez le privilège de nager with des raies mantas géantes.",
        image: asset("local-coastal-resort.webp")
      },
      {
        title: "4. Sunset Cruise & Dauphins",
        subtitle: "Croisière romantique au coucher de soleil",
        desc: "Embarquez en fin d'après-midi à bord d'un Dhoni traditionnel pour une croisière inoubliable. Observez les dauphins jouer dans les vagues alors que le soleil se couche sur l'océan Indien.",
        image: asset("airport.webp")
      },
      {
        title: "5. Expérience Bien-être",
        subtitle: "Massage & Soins sur pilotis",
        desc: "Profitez d'une matinée relaxante au spa du complexe. Le pavillon de soins sur pilotis est doté de planchers en verre pour observer la faune marine pendant votre massage relaxant.",
        image: asset("intl-maldives-resort.webp")
      },
      {
        title: "6. Dîner sur un Banc de Sable",
        subtitle: "Soirée privée exclusive",
        desc: "Pour votre dernière soirée, notre équipe organise un dîner gastronomique aux chandelles sur un banc de sable entièrement privatisé pour vous, sous la voûte étoilée des tropiques.",
        image: asset("local-coastal-resort.webp")
      }
    ],
    highlights: [
      {
        title: "Plongée sous-marine d'exception dans les atolls",
        desc: "Explorez des passes océaniques réputées mondialement et observez des requins de récif, des tortues de mer et des bancs de barracudas."
      },
      {
        title: "Dîner gastronomique sous-marin",
        desc: "Vivez l'expérience unique de dîner dans un restaurant de verre situé à 5 mètres sous la surface de la mer, entouré par la vie aquatique."
      },
      {
        title: "Vols panoramiques en hydravion",
        desc: "Profitez d'une vue aérienne spectaculaire sur les atolls coralliens en forme de colliers de perles jetés sur le bleu profond de l'océan."
      },
      {
        title: "Hébergement de luxe éco-responsable",
        desc: "Séjournez dans des villas conçues en matériaux naturels de haute qualité, combinant luxe moderne et respect strict de l'environnement."
      }
    ],
    whatsIncluded: [
      {
        title: "Vols internationaux et transferts inclus",
        desc: "Le forfait comprend vos billets d'avion A/R au départ de Paris/Casablanca ainsi que tous les transferts internes en hydravion ou speedboat rapide."
      },
      {
        title: "Formule tout inclus premium (All-Inclusive)",
        desc: "Tous vos repas dans les différents restaurants du resort, ainsi qu'une sélection de boissons fines, spiritueux et cocktails toute la journée."
      },
      {
        title: "Activités nautiques non-motorisées gratuites",
        desc: "Accès illimité aux équipements de planche à voile, paddle, kayak et matériel complet de snorkeling durant toute la durée du séjour."
      },
      {
        title: "Conciergerie et assistance francophone 24h/24",
        desc: "Un conseiller dédié sur place ainsi qu'une ligne d'assistance téléphonique disponible jour et nuit pour répondre à toutes vos demandes."
      }
    ]
  },
  {
    id: "japon",
    name: "Le Japon",
    tagline: "Tradition séculaire & Modernité électrique",
    shortDesc: "Le contraste fascinant entre les temples zen de Kyoto et les néons de Tokyo.",
    image: asset("intl-tokyo-streets.webp"),
    heroImage: asset("intl-tokyo-streets.webp"),
    intro: "Embarquez pour un voyage sensoriel au pays du Soleil-Levant. Le Japon séduit par sa dualité unique : d'un côté, des mégapoles ultra-modernes à la pointe de la technologie ; de l'autre, des sanctuaires shintoïstes enveloppés de silence.",
    places: [
      {
        name: "Le Quartier de Shibuya à Tokyo",
        image: asset("intl-tokyo-streets.webp"),
        description: "Découvrez l'effervescence urbaine du passage piéton le plus célèbre du monde, entouré de gratte-ciels et d'écrans géants."
      },
      {
        name: "Le Temple d'Or (Kinkaku-ji) à Kyoto",
        image: asset("why-choose-student-illustration.png"),
        description: "Un chef-d'œuvre architectural recouvert de feuilles d'or pur, se reflétant sur un étang miroir au cœur d'un jardin zen."
      },
      {
        name: "Le Mont Fuji & Lac Kawaguchi",
        image: asset("local-mountain-hike.webp"),
        description: "Le volcan sacré emblématique du Japon, offrant des panoramas spectaculaires à couper le souffle, surtout au printemps."
      }
    ],
    stats: [
      { value: "99.8%", label: "Ponctualité des Trains" },
      { value: "1 600+", label: "Temples à Kyoto" },
      { value: "98.9%", label: "Indice de Sécurité" }
    ],
    hotels: [
      {
        name: "Park Hyatt Tokyo 5*",
        type: "Hôtel de Prestige",
        desc: "Niché au sommet de gratte-ciels scintillants, offrant des vues panoramiques spectaculaires sur Tokyo et le Mont Fuji."
      },
      {
        name: "Ryokan Gion Hanamikoji (Kyoto)",
        type: "Auberge Traditionnelle",
        desc: "Une immersion authentique dans la culture japonaise avec chambres en tatami, futons de soie et bains thermaux."
      }
    ],
    reviews: [
      {
        author: "Léa G. (Paris)",
        rating: 5,
        text: "Le contraste entre Tokyo la nuit et le calme des temples de Kyoto est saisissant. Organisation parfaite.",
        date: "Avril 2026"
      },
      {
        author: "Nicolas P. (Genève)",
        rating: 5,
        text: "Une aventure culturelle hors du temps. Les gens sont d'une politesse et d'une gentillesse incroyables.",
        date: "Janvier 2026"
      }
    ],
    collage: [
      asset("intl-tokyo-streets.webp"),
      asset("why-choose-student-illustration.png"),
      asset("local-mountain-hike.webp")
    ],
    price: "À partir de 2 150 €",
    duration: "10 Jours",
    placesCount: "4 Villes",
    rating: "4.8/5 selon plus de 90 avis",
    location: "Japon, Asie de l'Est",
    itinerary: [
      {
        title: "1. Arrivée à Tokyo",
        subtitle: "Transfert à Shibuya",
        desc: "Bienvenue à Tokyo. Accueil à l'aéroport et transfert privatif vers votre hôtel situé au cœur de la ville moderne de Shibuya. Reste de la journée libre.",
        image: asset("intl-tokyo-streets.webp")
      },
      {
        title: "2. Tokyo Moderne & Électrique",
        subtitle: "Shinjuku & Shibuya Crossing",
        desc: "Visitez le quartier de la mode de Harajuku, le paisible sanctuaire Meiji Jingu, puis plongez dans l'effervescence lumineuse des gratte-ciels de Shinjuku.",
        image: asset("why-choose-student-illustration.png")
      },
      {
        title: "3. Tradition à Asakusa",
        subtitle: "Le plus vieux temple de Tokyo",
        desc: "Explorez le vieux Tokyo à Asakusa, visitez le temple Senso-ji et parcourez la rue Nakamise bordée de boutiques d'artisanat traditionnel japonais.",
        image: asset("local-mountain-hike.webp")
      },
      {
        title: "4. Le Mont Fuji",
        subtitle: "Excursion à Hakone",
        desc: "Départ pour Hakone en train. Profitez d'une croisière sur le lac Ashi avec vue sur le Mont Fuji par temps clair, puis relaxez-vous dans les sources thermales (Onsen).",
        image: asset("intl-tokyo-streets.webp")
      },
      {
        title: "5. Kyoto la Traditionnelle",
        subtitle: "Voyage en Shinkansen",
        desc: "Embarquez à bord du train à grande vitesse Shinkansen vers Kyoto, l'ancienne capitale impériale abritant des milliers de temples bouddhistes.",
        image: asset("why-choose-student-illustration.png")
      },
      {
        title: "6. Forêt de Bambous d'Arashiyama",
        subtitle: "Temples et nature",
        desc: "Marchez au milieu des tiges géantes de la bambouseraie d'Arashiyama, puis visitez le temple Tenryu-ji et le célèbre pavillon d'Or Kinkaku-ji.",
        image: asset("local-mountain-hike.webp")
      }
    ],
    highlights: [
      {
        title: "Traversée du pays en train Shinkansen",
        desc: "Voyagez à plus de 300 km/h dans le train le plus ponctuel et confortable du monde avec votre Japan Rail Pass inclus."
      },
      {
        title: "Immersion dans un Ryokan traditionnel",
        desc: "Dormez sur des futons traditionnels dans une chambre en tatami et dégustez un dîner gastronomique multi-services Kaiseki."
      },
      {
        title: "Cérémonie du thé à Kyoto",
        desc: "Découvrez l'esthétique zen et la philosophie de la préparation du thé vert matcha lors d'une cérémonie privée animée par un maître."
      },
      {
        title: "Rencontre avec les daims de Nara",
        desc: "Parcourez le grand parc historique de Nara où des centaines de cerfs et daims sacrés et apprivoisés se promènent en toute liberté."
      }
    ],
    whatsIncluded: [
      {
        title: "Vols réguliers directs A/R",
        desc: "Billets d'avion sur vols réguliers avec franchises bagages incluses pour Tokyo et au retour de l'aéroport du Kansai."
      },
      {
        title: "Japan Rail Pass de 7 jours",
        desc: "Accès illimité aux lignes de trains JR à travers tout le Japon, y compris les trains à grande vitesse Shinkansen."
      },
      {
        title: "Hébergements de charme 4* et Ryokan",
        desc: "Hôtels de catégorie supérieure idéalement situés et une nuit magique dans un Ryokan de standing avec sources chaudes."
      },
      {
        title: "Guides locaux francophones",
        desc: "Visites privatives guidées d'une journée entière à Tokyo et à Kyoto pour explorer l'histoire et les secrets locaux."
      }
    ]
  },
  {
    id: "suisse",
    name: "La Suisse",
    tagline: "Sommets alpins & Lacs miroirs",
    shortDesc: "Le grand air des Alpes dans un chalet en bois face aux glaciers éternels.",
    image: asset("intl-swiss-alps.webp"),
    heroImage: asset("intl-swiss-alps.webp"),
    intro: "Respirez la pureté des sommets suisses. Avec ses montagnes majestueuses, ses lacs aux reflets émeraude et ses villages pittoresques de chalets fleuris, la Suisse est le paradis des amateurs de nature, de randonnées et de gastronomie alpine.",
    places: [
      {
        name: "Zermatt & le Cervin",
        image: asset("intl-swiss-alps.webp"),
        description: "Une station de montagne piétonne d'un charme authentique fou, dominée par la pyramide rocheuse du Cervin."
      },
      {
        name: "Le Lac Léman & le Château de Chillon",
        image: asset("local-coastal-resort.webp"),
        description: "Une forteresse médiévale posée sur l'eau, offrant une vue imprenable sur le lac Léman et les sommets environnants."
      },
      {
        name: "La Région de la Jungfrau",
        image: asset("local-mountain-hike.webp"),
        description: "Un panorama grandiose regroupant trois géants de pierre : l'Eiger, le Mönch et la Jungfrau, accessible par train à crémaillère."
      }
    ],
    stats: [
      { value: "4 478m", label: "Sommet du Cervin" },
      { value: "100%", label: "Énergie Verte Locale" },
      { value: "96.4%", label: "Pureté de l'Air Alpin" }
    ],
    hotels: [
      {
        name: "The Omnia Zermatt 5*",
        type: "Chalet Contemporain",
        desc: "Bâti sur une roche dominant Zermatt, ce lodge de design mêle esthétique alpine moderne et confort douillet."
      },
      {
        name: "Grand Hotel du Lac Vevey 5*",
        type: "Palace Historique",
        desc: "Hôtel majestueux en bord de lac Léman, offrant des vues imprenables sur les vignes du Lavaux et les Alpes."
      }
    ],
    reviews: [
      {
        author: "Antoine L. (Marseille)",
        rating: 5,
        text: "Les randonnées autour de Zermatt sont fantastiques. L'air pur des glaciers fait un bien fou.",
        date: "Mars 2026"
      },
      {
        author: "Clara & Rémi (Lille)",
        rating: 5,
        text: "Voyager en train panoramique à travers la Jungfrau est une expérience féerique. Je recommande chaudement.",
        date: "Décembre 2025"
      }
    ],
    collage: [
      asset("intl-swiss-alps.webp"),
      asset("local-mountain-hike.webp"),
      asset("local-coastal-resort.webp")
    ],
    price: "À partir de 1 250 €",
    duration: "7 Jours",
    placesCount: "3 Régions",
    rating: "4.9/5 selon plus de 70 avis",
    location: "Suisse, Europe Centrale",
    itinerary: [
      {
        title: "1. Arrivée à Genève",
        subtitle: "Château de Chillon & Vevey",
        desc: "Arrivée à Genève et transfert en train le long du lac Léman vers Vevey. Visite libre de la forteresse médiévale du Château de Chillon posée sur l'eau.",
        image: asset("intl-swiss-alps.webp")
      },
      {
        title: "2. Montreux & Vignobles du Lavaux",
        subtitle: "Randonnée et dégustation",
        desc: "Parcourez les magnifiques terrasses de vignobles de Lavaux (classées UNESCO) plongeant dans le lac Léman, avec dégustation de cépages locaux.",
        image: asset("local-mountain-hike.webp")
      },
      {
        title: "3. Ascension vers Zermatt",
        subtitle: "Au pied du mythique Cervin",
        desc: "Prenez le train de montagne vers Zermatt, une station alpine interdite aux voitures. Installation dans votre hôtel faisant face au Mont Cervin.",
        image: asset("local-coastal-resort.webp")
      },
      {
        title: "4. Lac Riffelsee & Randonnée",
        subtitle: "Gornergrat Bahn",
        desc: "Montez en train à crémaillère jusqu'au sommet du Gornergrat à 3 089m. Randonnée facile vers le lac Riffelsee où se reflète la pyramide du Cervin.",
        image: asset("intl-swiss-alps.webp")
      },
      {
        title: "5. Région de la Jungfrau",
        subtitle: "Interlaken & Chalets de Grindelwald",
        desc: "Départ pour l'Oberland bernois. Installation à Grindelwald, un charmant village entouré de parois rocheuses de l'Eiger et de vertes prairies.",
        image: asset("local-mountain-hike.webp")
      },
      {
        title: "6. Le Col de la Jungfraujoch",
        subtitle: "Le toit de l'Europe à 3 454m",
        desc: "Montez par le train Eiger Express jusqu'à la gare la plus haute d'Europe. Visitez le palais de glace creusé sous le glacier d'Aletsch.",
        image: asset("local-coastal-resort.webp")
      }
    ],
    highlights: [
      {
        title: "Swiss Travel Pass de Première Classe",
        desc: "Découvrez la Suisse en toute liberté grâce au pass de train illimité incluant les trajets panoramiques, bateaux et transports urbains."
      },
      {
        title: "Ascension Gornergrat à crémaillère",
        desc: "Montez à bord du plus ancien chemin de fer à crémaillère électrique de Suisse pour embrasser une vue sur 29 sommets de plus de 4 000m."
      },
      {
        title: "Fondue suisse traditionnelle",
        desc: "Dégustez une fondue moitié-moitié traditionnelle au fromage de montagne dans une authentique stube en bois lambrissée."
      },
      {
        title: "Château médiéval de Chillon",
        desc: "Parcourez les salles voûtées et les cours de cette forteresse insulaire historique édifiée sur un rocher du lac Léman."
      }
    ],
    whatsIncluded: [
      {
        title: "Swiss Travel Pass illimité",
        desc: "Liberté totale de déplacement sur le réseau ferroviaire suisse en 1ère classe pour la durée de votre séjour."
      },
      {
        title: "Hébergements haut de gamme 4*S / 5*",
        desc: "Sélection d'hôtels alpins prestigieux offrant un service personnalisé et des espaces spa face aux montagnes."
      },
      {
        title: "Réservations de trains panoramiques",
        desc: "Places assises sécurisées et garanties à bord des célèbres trains à grandes baies vitrées suisses."
      },
      {
        title: "Excursions de montagne incluses",
        desc: "Billets d'accès pour le train du Gornergrat Bahn et le téléphérique Eiger Express vers la Jungfraujoch."
      }
    ]
  },
  {
    id: "tanzanie",
    name: "La Tanzanie",
    tagline: "Aventure sauvage & Safaris mythiques",
    shortDesc: "Vivez le spectacle de la faune sauvage et de la grande migration au Serengeti.",
    image: asset("intl-safari-wildlife.webp"),
    heroImage: asset("intl-safari-wildlife.webp"),
    intro: "Vivez l'expérience ultime de la nature brute en Afrique. La Tanzanie abrite les parcs nationaux les plus renommés du monde, des plaines à perte de vue du Serengeti aux plages d'épices baignées de soleil de l'archipel de Zanzibar.",
    places: [
      {
        name: "Plaines Infinies du Serengeti",
        image: asset("intl-safari-wildlife.webp"),
        description: "Le théâtre de la grande migration annuelle de millions de gnous zèbres, traqués par les plus grands prédateurs."
      },
      {
        name: "Cratère du Ngorongoro",
        image: asset("local-desert-sunset.webp"),
        description: "Une caldeira naturelle de 20 km de large formant un véritable éden sauvage où cohabitent plus de 25 000 grands mammifères."
      },
      {
        name: "Les Plages Blanches de Zanzibar",
        image: asset("intl-maldives-resort.webp"),
        description: "Une halte balnéaire paradisiaque aux influences orientales, idéale pour clore un safari de rêve les pieds dans l'eau."
      }
    ],
    stats: [
      { value: "Big 5", label: "Animaux Observés" },
      { value: "35 000 km²", label: "Surface Réserve Naturelle" },
      { value: "97.8%", label: "Taux de Satisfaction" }
    ],
    hotels: [
      {
        name: "Four Seasons Safari Lodge 5*",
        type: "Lodge de Prestige",
        desc: "Niché au cœur du parc du Serengeti, avec une piscine à débordement surplombant un point d'eau où s'abreuvent les éléphants."
      },
      {
        name: "Zanzibar White Sand Luxury 5*",
        type: "Villas de Plage",
        desc: "Des villas écologiques de luxe posées sur le sable blanc de Paje, idéales pour se détendre après un safari sauvage."
      }
    ],
    reviews: [
      {
        author: "Guillaume & Sophie (Toulouse)",
        rating: 5,
        text: "Le cratère du Ngorongoro est un éden. Nous avons vu les Big Five en une seule journée !",
        date: "Juin 2026"
      },
      {
        author: "Mélanie V. (Montréal)",
        rating: 5,
        text: "Le lodge Four Seasons est magique. Prendre son petit-déjeuner face aux girafes et zèbres est inoubliable.",
        date: "Octobre 2025"
      }
    ],
    collage: [
      asset("intl-safari-wildlife.webp"),
      asset("local-desert-sunset.webp"),
      asset("intl-maldives-resort.webp")
    ],
    price: "À partir de 2 450 €",
    duration: "7 Jours",
    placesCount: "3 Parcs",
    rating: "4.9/5 selon plus de 80 avis",
    location: "Tanzanie, Afrique de l'Est",
    itinerary: [
      {
        title: "1. Arrivée à Kilimanjaro",
        subtitle: "Transfert vers Arusha",
        desc: "Arrivée à l'aéroport international du Kilimandjaro, accueil chaleureux et transfert privatif vers votre lodge de charme situé dans les plantations de café d'Arusha.",
        image: asset("intl-safari-wildlife.webp")
      },
      {
        title: "2. Cratère du Ngorongoro",
        subtitle: "Descente dans la caldeira",
        desc: "Partez pour une journée de safari dans le cratère géologique du Ngorongoro, un amphithéâtre naturel abritant des milliers de grands animaux sauvages.",
        image: asset("local-desert-sunset.webp")
      },
      {
        title: "3. Parc National du Serengeti",
        subtitle: "Safaris sur les pistes",
        desc: "Prenez la route vers les plaines sauvages et infinies du Serengeti. Premier safari l'après-midi à la recherche de guépards, lions et léopards.",
        image: asset("intl-maldives-resort.webp")
      },
      {
        title: "4. La Grande Migration",
        subtitle: "Troupeaux sauvages à perte de vue",
        desc: "Une journée complète dédiée à la recherche des grands troupeaux migrateurs de gnous et zèbres, ainsi que des prédateurs qui les suivent.",
        image: asset("intl-safari-wildlife.webp")
      },
      {
        title: "5. Vol vers Zanzibar",
        subtitle: "De la savane à l'océan Indien",
        desc: "Transfert vers l'aérodrome du Serengeti et vol en avion de brousse vers l'île aux épices de Zanzibar. Installation dans votre villa de plage de luxe.",
        image: asset("local-desert-sunset.webp")
      },
      {
        title: "6. Détente à Zanzibar",
        subtitle: "Sable blanc & lagon turquoise",
        desc: "Journée libre pour vous reposer sur le sable chaud de Paje, faire du kitesurf ou visiter Stone Town, la vieille ville historique arabe de l'île.",
        image: asset("intl-maldives-resort.webp")
      }
    ],
    highlights: [
      {
        title: "Safaris privatifs en 4x4 à toit ouvrant",
        desc: "Voyagez confortablement avec votre guide-chauffeur privé francophone expérimenté dans un véhicule tout-terrain parfaitement équipé."
      },
      {
        title: "Piscines face aux points d'eau sauvages",
        desc: "Séjournez dans des éco-lodges de grand standing dotés de terrasses en bois où vous pouvez observer la faune venir s'abreuver."
      },
      {
        title: "Vol en avion de brousse au-dessus du Serengeti",
        desc: "Déplacez-vous facilement en gagnant un temps précieux grâce à un vol intérieur panoramique au-dessus de la savane africaine."
      },
      {
        title: "Plages d'épices de Zanzibar",
        desc: "Terminez votre aventure sauvage par un séjour balnéaire farniente sur les plages de sable blanc poudré de l'océan Indien."
      }
    ],
    whatsIncluded: [
      {
        title: "Tous les vols et taxes de parcs",
        desc: "Billets d'avion A/R internationaux, vol intérieur Serengeti-Zanzibar, et tous les frais d'entrée quotidiens dans les réserves nationales."
      },
      {
        title: "Lodges de luxe en pension complète",
        desc: "Tous les hébergements en formule pension complète pendant le safari (petits-déjeuners, déjeuners pique-nique et dîners gourmands)."
      },
      {
        title: "Chauffeur-guide francophone dédié",
        desc: "L'accompagnement exclusif d'un guide naturaliste tanzanien certifié durant toutes les excursions de safaris."
      },
      {
        title: "Bouteilles d'eau fraîche à bord du 4x4",
        desc: "Mise à disposition gratuite de boissons fraîches illimitées dans la glacière du véhicule durant les safaris."
      }
    ]
  }
];
