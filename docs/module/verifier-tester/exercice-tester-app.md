# 👨‍💻 Exercice pratique - Tests d'une application mobile

Vous êtes testeur QA dans une équipe de développement. L'équipe vient de terminer le développement de **SpotFinder**, une application mobile permettant de découvrir des spots locaux. Avant la mise en production, votre responsable vous demande de **vérifier que l'application répond aux exigences** définies dans le cahier des charges.

## 🧭 SpotFinder - Découvrez les meilleurs spots locaux

**SpotFinder** est une application mobile qui permet aux utilisateurs de découvrir des lieux intéressants : cafés, parcs, restaurants et points photo.

### Fonctionnalités principales

| Onglet       | Description                                   |
|--------------|-----------------------------------------------|
| **Explorer** | Liste des spots avec tri et ajout aux favoris |
| **Favoris**  | Spots ajoutés aux favoris par l'utilisateur   |
| **À propos** | Informations, statistiques et options         |

## 📋 Cahier des charges 

### Exigences fonctionnelles

| ID    | Exigence                                                                                      |
|-------|-----------------------------------------------------------------------------------------------|
| EF-01 | L'utilisateur peut naviguer entre les onglets de l'application                                |
| EF-02 | Le bouton retour ramène à l'écran précédent de manière cohérente                              |
| EF-03 | L'utilisateur peut ajouter un spot à ses favoris                                              |
| EF-04 | L'utilisateur peut retirer un spot de ses favoris                                             |
| EF-05 | Les favoris sont conservés après fermeture et réouverture de l'application                    |
| EF-06 | Le tri "Note décroissante" affiche les meilleures notes en premier                            |
| EF-07 | Le tri "Note croissante" affiche les moins bonnes notes en premier                            |
| EF-08 | L'utilisateur peut trier les spots par ordre alphabétique                                     |
| EF-09 | Un retour haptique (vibration) est ressenti lors de l'ajout d'un favori depuis la liste       |
| EF-10 | Un retour haptique (vibration) est ressenti lors de l'ajout d'un favori depuis la page détail |
| EF-11 | L'utilisateur peut consulter ses statistiques d'utilisation                                   |
| EF-12 | L'utilisateur peut exporter ses données                                                       |

### Exigences non fonctionnelles

L'application doit également respecter des critères de **qualité générale** :

- **Portabilité** : L'application doit être utilisable quelle que soit l'orientation de l'écran
- **Performance** : L'application doit être réactive et fluide
- **Ergonomie** : Les éléments interactifs doivent être faciles à utiliser
- **Stabilité** : L'application ne doit pas crasher en utilisation normale

## 👨‍🏫 Consignes

### Partie 1 : Exploration et tests (20-30 min)

1. [Installez l'application](/tips-and-tricks/generate-install-apk) sur votre appareil ou émulateur
2. Explorez l'application en testant les différentes fonctionnalités
3. Identifiez les problèmes que vous rencontrez


<a href="/5.1/SpotFinder.apk" target="_blank" class="btn btn-primary" style="display:inline-block;padding:12px 22px;background:linear-gradient(90deg,#4f46e5,#4f46f9);color:#ffffff;text-decoration:none;border-radius:12px;border:0;font-weight:600;box-shadow:0 8px 20px rgba(15,23,42,0.12);transition:transform .16s ease,box-shadow .16s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 14px 28px rgba(15,23,42,0.16)'" onmouseout="this.style.transform='none';this.style.boxShadow='0 8px 20px rgba(15,23,42,0.12)'" aria-label="Télécharger SpotFinder">
Télécharger l'application
</a>

### Partie 2 : Livrables à rendre

#### A. Cas de test (2-3 cas)

Rédigez **2 à 3 cas de test** en utilisant le modèle ci-dessous. Choisissez des exigences que vous souhaitez vérifier.

#### B. Rapport d'anomalie (minimum 1)

Pour chaque problème identifié, rédigez **un rapport d'anomalie** en précisant :
- S'il s'agit d'un problème **fonctionnel** ou **non fonctionnel**
- Le niveau de **sévérité** (Critique / Majeur / Mineur)

## 🥸 Modèle de cas de test

```
┌─────────────────────────────────────────────────────────────────┐
│ CAS DE TEST                                                     │
├─────────────────────────────────────────────────────────────────┤
│ ID du test      : CT-XXX                                        │
│ Exigence testée : EF-XX ou ENF                                  │
│ Titre           : [Description courte]                          │
├─────────────────────────────────────────────────────────────────┤
│ PRÉCONDITIONS                                                   │
│ - [État initial requis]                                         │
├─────────────────────────────────────────────────────────────────┤
│ ÉTAPES                                                          │
│ 1. [Action]                                                     │
│ 2. [Action]                                                     │
├─────────────────────────────────────────────────────────────────┤
│ RÉSULTAT ATTENDU                                                │
│ [Ce qui devrait se produire]                                    │
├─────────────────────────────────────────────────────────────────┤
│ RÉSULTAT OBTENU                                                 │
│ ☐ Conforme    ☐ Non conforme                                   │
│ Observations :                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🐞 Modèle de rapport d'anomalie

```
┌─────────────────────────────────────────────────────────────────┐
│ RAPPORT D'ANOMALIE                                              │
├─────────────────────────────────────────────────────────────────┤
│ ID              : ANO-XXX                                       │
│ Testeur         : [Votre nom]                                   │
├─────────────────────────────────────────────────────────────────┤
│ CLASSIFICATION                                                  │
│ Type     : ☐ Fonctionnelle    ☐ Non fonctionnelle              │
│ Sévérité : ☐ Critique  ☐ Majeure  ☐ Mineure                    │
├─────────────────────────────────────────────────────────────────┤
│ ENVIRONNEMENT                                                   │
│ Appareil / Émulateur : [Ex: Pixel 6 / Samsung Galaxy S21]       │
│ Version Android      : [Ex: Android 13]                         │
├─────────────────────────────────────────────────────────────────┤
│ DESCRIPTION                                                     │
│                                                                 │
│ Titre : [Description courte du problème]                        │
│                                                                 │
│ Étapes pour reproduire :                                        │
│ 1.                                                              │
│ 2.                                                              │
│ 3.                                                              │
│                                                                 │
│ Résultat observé :                                              │
│ [Ce qui se passe]                                               │
│                                                                 │
│ Résultat attendu :                                              │
│ [Ce qui devrait se passer]                                      │
├─────────────────────────────────────────────────────────────────┤
│ CAPTURE D'ÉCRAN (si possible)                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🪜 Échelle de sévérité

| Niveau       | Description                                                       |
|--------------|-------------------------------------------------------------------|
| **Critique** | L'application crashe ou une fonctionnalité est totalement bloquée |
| **Majeure**  | Une fonctionnalité ne fonctionne pas comme prévu                  |
| **Mineure**  | Problème de confort ou d'ergonomie                                |

## 📚 Récapitulatif des livrables

| Livrable           | Quantité  |
|--------------------|-----------|
| Cas de test        | 2-3       |
| Rapport d'anomalie | Minimum 1 |


*Bon travail !*
![typing-cat-gif](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHptMHNya2Njb3V1OGN0Nmg3OXJqZ3Fha25sZmFubGthNGNsN3dtbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sm9AfJRiZofjlrkAAl/giphy.gif)

## 📔 TL;DR
::: details Récapitulatif du chapitre
Cet exercice vous place en rôle de QA pour tester l’app SpotFinder. Vous devez explorer l’app, vérifier des exigences fonctionnelles et non fonctionnelles, puis produire 2–3 cas de test et au moins un rapport d’anomalie. Des modèles de cas de test et de rapport, ainsi qu’une échelle de sévérité, sont fournis.
:::

