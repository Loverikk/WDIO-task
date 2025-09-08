export class Navigation {
    get categories() {
        return $('a[data-test="nav-categories"]')
    }

    get categoriesDropdown() {
        return $('.dropdown-menu.show')
    }

    get powerToolsCategory() {
        return $('[data-test="nav-power-tools"]')
    }
}