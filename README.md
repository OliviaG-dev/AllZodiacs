# AllZodiacs 🪐

**Explore tous les horoscopes à partir de ta naissance**

## 📖 Introduction

AllZodiacs est une application moderne qui regroupe les systèmes astrologiques et horoscopiques du monde entier.

À partir d'une simple date de naissance (jour, mois, année), AllZodiacs révèle instantanément les signes associés à de multiples traditions : occidentale, chinoise, égyptienne, africaine, maya, druidique, arabe, aztèque et bien d'autres — y compris des horoscopes rares et anciens.

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
- Architecture modulaire et extensible

## 📁 Structure du projet

```
src/
├── App/              # Composant principal
│   ├── App.tsx
│   └── App.css
├── components/       # Composants réutilisables
│   ├── DateInput/   # Formulaire de saisie de date
│   │   ├── DateInput.tsx
│   │   └── DateInput.css
│   └── ResultsDisplay/  # Affichage des résultats
│       ├── ResultsDisplay.tsx
│       └── ResultsDisplay.css
├── utils/            # Utilitaires et logique métier
│   └── astrologyCalculators.ts
├── types/            # Définitions TypeScript
│   └── astrology.ts
└── main.tsx          # Point d'entrée
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

- ✅ Calcul du signe astrologique occidental (zodiaque tropical)
- ✅ Calcul du signe astrologique chinois
- ✅ Calcul du signe astrologique égyptien
- ✅ Interface moderne et responsive
- ✅ Architecture modulaire pour ajout facile de nouveaux systèmes

## 🔮 Systèmes astrologiques à venir

- [ ] Horoscope maya
- [ ] Horoscope druidique
- [ ] Horoscope arabe
- [ ] Horoscope aztèque
- [ ] Horoscope africain
- [ ] Et bien d'autres...

## 📝 Licence

Ce projet est open-source et disponible sous licence MIT.

---

**AllZodiacs** - Connecte les traditions anciennes aux technologies modernes 🌟
