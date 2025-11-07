import fs from 'fs'
import yaml from 'js-yaml'

function cleanSidebar(items) {
  return items
    .filter(item => item.enabled !== false)
    .map(item => ({
      text: item.text,
      link: item.link,
      collapsed: item.collapsed,
      ...(item.items ? {items: cleanSidebar(item.items)} : {})
    }))
}

const sidebarYaml = fs.readFileSync('docs/.vitepress/sidebar/sidebar.yaml', 'utf8')
const parsed = yaml.load(sidebarYaml)
const cleaned = cleanSidebar(parsed)

const esmContent =
  'export default ' + JSON.stringify(cleaned, null, 2) + '\n'

fs.writeFileSync(
  'docs/.vitepress/sidebar/sidebar.generated.mjs',
  esmContent
)

console.log('✅ Sidebar ESM généré.')
