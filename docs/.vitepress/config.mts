import { defineConfig } from 'vitepress'
import sidebar from './sidebar/sidebar.generated.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tti-devmobile/',
  title: "DEV <MOBILE/>",
  description: "Apprendre TypeScript et Ionic",
  lang: 'fr-FR',
  lastUpdated: true,
  ignoreDeadLinks: true, // ignore dead links to allow build to succeed
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: '/logo.png',
      nav: [
          {text: 'Accueil', link: '/'},
          {text: 'Examples', link: '/markdown-examples'}
      ],

      sidebar: {
          '/': sidebar
      },
/*      sidebar: [
          {
              text: 'Examples',
              items: [
                  {text: 'Markdown Examples', link: '/markdown-examples'},
                  {text: 'Runtime API Examples', link: '/api-examples'}
              ]
          }
      ],*/

      socialLinks: [
          {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
          {icon: 'ionic', link: 'https://ionicframework.com/'}
      ],
      outline: {
          label: 'Sur cette page',
      },
      docFooter: {
          prev: 'Page précédente',
          next: 'Page suivante',
      },
      lastUpdatedText: 'Dernière mise à jour',
      returnToTopLabel: 'Retour en haut',
      darkModeSwitchLabel: 'Mode sombre',
      sidebarMenuLabel: 'Menu',
      search: {
          provider: 'local',
          options: {
              locales: {
                  root: {
                      translations: {
                          button: {
                              buttonText: 'Rechercher',
                              buttonAriaLabel: 'Lancer une recherche'
                          },
                          modal: {
                              displayDetails: 'Afficher les détails',
                              resetButtonTitle: 'Réinitialiser la recherche',
                              backButtonTitle: 'Fermer la recherche',
                              noResultsText: 'Aucun résultat trouvé',
                              footer: {
                                  selectText: 'Sélectionner',
                                  selectKeyAriaLabel: 'Entrée',
                                  navigateText: 'Naviguer',
                                  navigateUpKeyAriaLabel: 'Flèche haut',
                                  navigateDownKeyAriaLabel: 'Flèche bas',
                                  closeText: 'Fermer',
                                  closeKeyAriaLabel: 'Échap'
                              }
                          }
                      }
                  }
              }
          },
          notFound: {
              title: 'Page non trouvée',
              quote: 'Oups ! Cette page n’existe pas ou plus.',
              linkText: 'Retour à l’accueil',
          }
      },
      markdown: {
          toc: {level: [2, 3]},
          image: {
              lazyLoading: true // désactivé par défaut
          }
      }
  }
})
