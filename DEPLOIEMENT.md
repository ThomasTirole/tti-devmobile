# Déploiement sur Infomaniak (devmobile.ch)

Ce projet est configuré pour déployer automatiquement sur l'hébergement Infomaniak avec le domaine **devmobile.ch**.

## Configuration requise

Pour que le déploiement automatique fonctionne, vous devez configurer les secrets suivants dans les paramètres GitHub du repository (Settings > Secrets and variables > Actions) :

### Secrets GitHub nécessaires

1. **INFOMANIAK_FTP_SERVER** : L'adresse du serveur FTP/FTPS Infomaniak
   - Format: `ftp.votredomaine.ch` ou l'adresse fournie par Infomaniak
   - Exemple: `ftp.devmobile.ch`

2. **INFOMANIAK_FTP_USERNAME** : Votre nom d'utilisateur FTP Infomaniak
   - Disponible dans le manager Infomaniak sous "Hébergement Web > FTP"

3. **INFOMANIAK_FTP_PASSWORD** : Votre mot de passe FTP Infomaniak
   - Le mot de passe que vous avez défini pour l'accès FTP

## Comment trouver vos identifiants FTP Infomaniak

1. Connectez-vous à votre [Manager Infomaniak](https://manager.infomaniak.com)
2. Allez dans **Hébergement Web**
3. Sélectionnez votre hébergement (devmobile.ch)
4. Cliquez sur **FTP** dans le menu
5. Vous y trouverez :
   - L'adresse du serveur FTP
   - Votre nom d'utilisateur
   - Vous pouvez créer/modifier le mot de passe FTP si nécessaire

## Workflow de déploiement

Le déploiement se déclenche automatiquement à chaque push sur la branche `main` :

1. Le code est récupéré
2. Les dépendances Node.js sont installées
3. La sidebar est générée
4. Le site VitePress est construit
5. Les fichiers du dossier `docs/.vitepress/dist/` sont déployés sur Infomaniak via FTPS

## Configuration du domaine

Le site est configuré pour fonctionner à la racine du domaine devmobile.ch :
- Base URL : `/` (configuré dans `docs/.vitepress/config.mts`)

## Déploiement manuel (optionnel)

Si vous souhaitez déployer manuellement :

```bash
# 1. Construire le site
npm ci
npm run gen:sidebar
npm run docs:build

# 2. Les fichiers générés se trouvent dans docs/.vitepress/dist/
# 3. Uploadez ces fichiers vers votre hébergement Infomaniak via FTP
```

## Ancienne configuration (GitHub Pages)

L'ancien workflow de déploiement vers GitHub Pages a été désactivé et renommé en `.github/workflows/deploy-github-pages.yml.disabled`. 

**Pour le réactiver si nécessaire :**
1. Renommez le fichier en `.github/workflows/deploy-github-pages.yml` (sans `.disabled`)
2. Dans `docs/.vitepress/config.mts`, changez `base: '/'` en `base: '/tti-devmobile/'`
3. Changez aussi le chemin du favicon en `/tti-devmobile/favicon.ico`

**Note :** Vous ne pouvez pas maintenir les deux déploiements simultanément car ils nécessitent des configurations différentes (base URL différente).

## Dépannage

### Le déploiement échoue

1. Vérifiez que tous les secrets sont correctement configurés dans GitHub
2. Assurez-vous que les identifiants FTP sont corrects
3. Vérifiez que votre hébergement Infomaniak autorise les connexions FTPS
4. Consultez les logs du workflow GitHub Actions pour plus de détails

### Le site ne s'affiche pas correctement

1. Vérifiez que les fichiers sont bien déployés à la racine de votre hébergement
2. Assurez-vous que le fichier `index.html` est présent
3. Vérifiez les permissions des fichiers sur le serveur

## Support

Pour toute question concernant :
- **L'hébergement Infomaniak** : [Support Infomaniak](https://www.infomaniak.com/fr/support)
- **Le projet** : Ouvrez une issue sur GitHub
