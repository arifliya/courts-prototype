document.addEventListener('DOMContentLoaded', initHeader, false)

const tabOpenClass = 'connect-dps-common-header__toggle-open'

function initHeader() {
  // Define all toggle configurations
  const toggleConfigs = [
    {
      toggleSelector: '.connect-dps-common-header__user-menu-toggle',
      menuSelector: '#connect-dps-common-header-user-menu',
      needsFallbackHiding: true
    },
    {
      toggleSelector: '[data-qa="connect-dps-common-service-menu-toggle"]',
      menuSelector: '#connect-dps-common-header-services-menu'
    },
    {
      toggleSelector: '[data-qa="connect-dps-common-search-toggle"]',
      menuSelector: '#connect-dps-common-header-search-menu'
    }
  ]

  // Store all toggle/menu pairs for the closeTabs function
  const allTogglePairs = []

  // Initialize each toggle
  toggleConfigs.forEach(config => {
    const toggle = document.querySelector(config.toggleSelector)
    const menu = document.querySelector(config.menuSelector)

    if (toggle && menu) {
      // Store this pair for cross-closing functionality
      allTogglePairs.push([toggle, menu])

      // Handle special setup for user menu
      if (config.needsFallbackHiding) {
        hideFallbackLinks()
        toggle.removeAttribute('hidden')
        toggle.setAttribute('aria-expanded', 'false')
      }

      // Add click listener
      toggle.addEventListener('click', function(event) {
        // Close other open menus (exclude current one)
        const otherPairs = allTogglePairs.filter(pair => pair[0] !== toggle)
        closeTabs(otherPairs)
        
        // Toggle this menu
        toggleMenu(toggle, menu)
      })

      console.log(`Initialized toggle: ${config.toggleSelector}`)
    } else {
      console.log(`Toggle not found: ${config.toggleSelector}`)
    }
  })
}

function closeTabs(tabTuples) {
  tabTuples.forEach(([tab, menu]) => {
    menu.setAttribute('hidden', 'hidden')
    tab.classList.remove(tabOpenClass)
    tab.setAttribute('aria-expanded', 'false')
    tab.setAttribute('aria-label', tab.dataset.textForShow)
  })
}

function toggleMenu(toggle, menu) {
  const isOpen = !menu.getAttribute('hidden')

  if (isOpen) {
    menu.setAttribute('hidden', 'hidden')
    toggle.classList.remove(tabOpenClass)
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', toggle.dataset.textForShow)
  } else {
    menu.removeAttribute('hidden')
    toggle.classList.add(tabOpenClass)
    toggle.setAttribute('aria-expanded', 'true')
    toggle.setAttribute('aria-label', toggle.dataset.textForHide)
  }
}

function hideFallbackLinks() {
  const userLink = document.querySelector('.connect-dps-common-header__user-menu-link')
  if (userLink) {
    userLink.setAttribute('hidden', 'hidden')
  }
}