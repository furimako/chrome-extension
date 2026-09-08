/* global chrome */
const SHORTCUTS_URL = 'chrome://extensions/shortcuts'

const MODIFIER = navigator.userAgent.includes('Mac') ? 'Command' : 'Ctrl'
const RECOMMENDED_KEYS = {
    'open-all-at-once': `${MODIFIER}+Shift+L`,
    'toggle-pin': `${MODIFIER}+Shift+P`
}

function badge(text, className) {
    const span = document.createElement('span')
    span.className = className
    span.textContent = text
    return span
}

async function renderCommands() {
    const list = document.getElementById('commands')
    const commands = await chrome.commands.getAll()

    commands
        .filter((c) => c.name !== '_execute_action')
        .forEach(({ name, description, shortcut }) => {
            const li = document.createElement('li')

            const desc = document.createElement('div')
            desc.textContent = description
            li.appendChild(desc)

            li.appendChild(badge(shortcut || '未割り当て', shortcut ? 'key' : 'key unset'))

            const recommended = RECOMMENDED_KEYS[name]
            if (recommended && recommended !== shortcut) {
                li.appendChild(badge(`recommend: ${recommended}`, 'key recommended'))
            }

            list.appendChild(li)
        })
}

document.getElementById('open-shortcuts').addEventListener('click', () => {
    // brave:// / chrome:// は <a href> では開けないため tabs API で開く
    chrome.tabs.create({ url: SHORTCUTS_URL })
    window.close()
})

renderCommands()
