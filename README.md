
# chrome-extension
You can
- open all links at once for [Nikkei](https://www.nikkei.com/) and [Hacker News](https://news.ycombinator.com/) websites
- toggle pin setting on the current tab

## Keyboard shortcuts
This extension does **not** declare `suggested_key` in `manifest.json`.
A suggested key is only applied when the extension is first registered, and it is
silently dropped when it collides with a browser shortcut — which made the keys
stop working after a Brave update.

Assign the keys yourself at `brave://extensions/shortcuts`
(`chrome://extensions/shortcuts` on Chrome). The popup shows the currently
assigned keys and has a button to open that page.

Recommended keys:

| command | mac | others |
| --- | --- | --- |
| open all links at once | `Command+Shift+L` | `Ctrl+Shift+L` |
| toggle pin | `Command+Shift+P` | `Ctrl+Shift+P` |
