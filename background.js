/* global chrome */
function openNikkeiLinks() {
    document
        .querySelectorAll('a[data-rn-track="konshin"]')
        .forEach((v) => window.open(v.href))
}

function openHackerNewsLinks() {
    document
        .querySelectorAll('table.itemlist > tbody > tr.athing > td:nth-child(3) > a')
        .forEach((v, i) => { if (i < 10) window.open(v.href) })
}

chrome.commands.onCommand.addListener(async (command) => {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const tabId = currentTab.id
    const { url } = currentTab
    console.log(`starting Google Chrome extensions for furimako (command: ${command}, tabId: ${tabId}, url: ${url})`)

    let func
    switch (command) {
    case 'open-all-at-once':
        console.log('executing "open-all-at-once"')
        if (url.includes('https://www.nikkei.com/')) {
            console.log('Nikkei')
            func = openNikkeiLinks
        } else if (url.includes('https://news.ycombinator.com/')) {
            console.log('Hacker News')
            func = openHackerNewsLinks
        } else {
            console.log('match no URLs')
            return
        }
        chrome.scripting.executeScript({
            target: { tabId },
            func,
            args: []
        })
        console.log('finished "open-all-at-once"')
        break
        
    case 'toggle-pin':
        console.log('executing "toggle-pin"')
        await chrome.tabs.update(tabId, { pinned: !currentTab.pinned })
        console.log(`finished "toggle-pin" (pinned: ${currentTab.pinned} -> ${!currentTab.pinned})`)
        break
        
    default:
        break
    }
})
