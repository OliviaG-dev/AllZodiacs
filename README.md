# AllZodiacs 🪐

**Explore tous les horoscopes à partir de ta naissance**

## 📖 Introduction

AllZodiacs est une application moderne qui regroupe les systèmes astrologiques et horoscopiques du monde entier.

À partir d'une simple date de naissance (jour, mois, année), AllZodiacs révèle instantanément les signes associés à de multiples traditions : occidentale, chinoise, égyptienne, africaine, maya, druidique, perse, aztèque, védique, viking, celtique, tibétain, kabbalistique, alchimique, inuit, amérindien et bien d'autres — y compris des horoscopes rares et anciens.

**AllZodiacs ne prédit pas : il connecte.**  
Il offre une lecture culturelle, symbolique et comparative des signes à travers le temps et les civilisations.

## 💼 Concept Commercial / Pitch Produit

### 🎯 Le concept

AllZodiacs centralise et normalise des dizaines de systèmes astrologiques en un seul outil simple, rapide et fiable.  
L'utilisateur entre une date → l'application fournit automatiquement tous les signes correspondants, sans calcul complexe ni recherche manuelle.

### 💡 La valeur ajoutée

- **🔹 Unification** : fini les sites séparés pour chaque horoscope
- **🔹 Accessibilité** : une interface claire, sans jargon inutile
- **🔹 Culture & découverte** : exploration des traditions du monde
- **🔹 Scalabilité** : ajout facile de nouveaux horoscopes
- **🔹 Fiabilité** : règles de calcul transparentes et documentées
- **🔹 Richesse** : descriptions détaillées, traits, compatibilité, conseils, couleurs et pierres pour chaque signe

### 👥 Pour qui ?

- Curieux et passionnés d'astrologie
- Créateurs de contenu ésotérique
- Développeurs et projets open-source
- Applications bien-être / spiritualité
- Utilisateurs cherchant une lecture culturelle, non dogmatique

### 🚀 Positionnement

AllZodiacs n'est pas un horoscope de plus.  
C'est un **moteur universel de correspondance astrologique**, pensé comme un pont entre traditions anciennes et technologies modernes.

## 🛠️ Technologies

- **React 19** avec TypeScript
- **Vite** pour le build et le développement
- **React Router** pour la navigation
- Architecture modulaire et extensible
- Design moderne avec CSS personnalisé

## 📁 Structure du projet

```
src/
├── App/                    # Composant principal
│   ├── App.tsx
│   └── App.css
├── components/             # Composants réutilisables
│   ├── DateInput/         # Formulaire de saisie de date
│   │   ├── DateInput.tsx
│   │   └── DateInput.css
│   └── ResultsDisplay/     # Affichage des résultats
│       ├── ResultsDisplay.tsx
│       └── ResultsDisplay.css
├── pages/                 # Pages de l'application
│   ├── home/              # Page d'accueil
│   ├── results/            # Page des résultats
│   └── describe/          # Page de description détaillée
├── data/                  # Données des systèmes astrologiques
│   ├── occidental/        # Zodiaque occidental
│   ├── chinois/           # Zodiaque chinois
│   ├── egyptien/          # Horoscope égyptien
│   ├── africain/          # Horoscope africain
│   ├── maya/              # Horoscope maya
│   ├── azteque/           # Horoscope aztèque
│   ├── druidique/         # Horoscope druidique
│   ├── perse/             # Horoscope perse
│   ├── védique/           # Horoscope védique
│   ├── viking/            # Horoscope viking
│   ├── celtique/          # Horoscope celtique
│   ├── tibétain/          # Horoscope tibétain
│   ├── kabbalistique/     # Horoscope kabbalistique
│   ├── alchimique/        # Horoscope alchimique
│   ├── inuit/             # Horoscope inuit
│   └── amérindien/        # Horoscope amérindien
├── utils/                 # Utilitaires et logique métier
│   ├── astrologyCalculators.ts  # Calculs des signes
│   └── zodiacDescriptions.ts     # Gestion des descriptions
├── types/                 # Définitions TypeScript
│   └── astrology.ts
└── main.tsx               # Point d'entrée
```

## 🚀 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## ✨ Fonctionnalités actuelles

### 🎯 Calculs astrologiques

- ✅ **16 systèmes astrologiques** entièrement implémentés
- ✅ Calculs précis basés sur les dates de naissance
- ✅ Gestion des cycles complexes (chinois avec éléments, maya, etc.)

### 📊 Systèmes astrologiques implémentés

1. **Occidental** - Zodiaque tropical (12 signes)
2. **Chinois** - Zodiaque chinois avec 5 éléments (60 combinaisons)
3. **Tibétain** - Zodiaque tibétain (12 animaux)
4. **Kabbalistique** - 72 anges gardiens
5. **Perse** - Zodiaque persan (12 signes)
6. **Maya** - Calendrier Tzolk'in (20 signes)
7. **Aztèque** - Tonalpohualli (20 signes)
8. **Druidique** - Arbres sacrés (13 signes)
9. **Amérindien** - Totems spirituels (12 signes)
10. **Africain** - Archétypes sacrés (12 signes)
11. **Égyptien** - Divinités sacrées (6 signes)
12. **Inuit** - Animaux arctiques (12 signes)
13. **Védique** - Astrologie védique (12 signes)
14. **Alchimique** - Phases alchimiques (7 signes)
15. **Viking** - Cycles mythiques (6 périodes)
16. **Celtique** - Arbres sacrés (13 signes)

### 📖 Descriptions détaillées

Pour chaque signe, AllZodiacs fournit :

- ✅ **Description complète** du signe
- ✅ **Mots-clés** caractéristiques
- ✅ **Traits de personnalité** (positifs et négatifs)
- ✅ **Compatibilité** avec d'autres signes
- ✅ **Conseils** (quotidien, amour, travail, santé)
- ✅ **Couleurs** associées
- ✅ **Pierres** et cristaux
- ✅ **Périodes** et dates
- ✅ **Éléments** et planètes (selon le système)
- ✅ **Symboles** et représentations

### 🎨 Interface utilisateur

- ✅ Interface moderne et responsive
- ✅ Design adaptatif avec couleurs spécifiques par système
- ✅ Navigation intuitive entre les pages
- ✅ Affichage visuel des signes actifs
- ✅ Mise en page centrée et harmonieuse

### 🔧 Architecture technique

- ✅ Architecture modulaire et extensible
- ✅ Système de mapping intelligent pour gérer les variations de noms
- ✅ Normalisation des noms pour correspondances précises
- ✅ Gestion des données JSON structurées
- ✅ TypeScript pour la sécurité des types

## 🔮 Améliorations futures

- [ ] Ajout de nouveaux systèmes astrologiques
- [ ] Export des résultats (PDF, image)
- [ ] Comparaison entre systèmes
- [ ] Historique des recherches
- [ ] Mode sombre/clair
- [ ] Multilingue (traductions)
- [ ] Graphiques et visualisations

## 📝 Licence

Ce projet est open-source et disponible sous licence MIT.

---

**AllZodiacs** - Connecte les traditions anciennes aux technologies modernes 🌟
