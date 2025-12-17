(() => {
  const DEFAULT_DOMAINS = [
    'meet.google.com',
    'zoom.us',
    'teams.microsoft.com',
    'web.whatsapp.com',
    'discord.com',
    'whereby.com',
    'workplace.com',
    'slack.com',
    'jitsi',
  ]

  const textarea = document.getElementById('domains')
  const statusEl = document.getElementById('status')
  const saveBtn = document.getElementById('save')

  function setStatus(msg, timeout = 1200) {
    statusEl.textContent = msg
    if (timeout) {
      setTimeout(() => { statusEl.textContent = '' }, timeout)
    }
  }

  function load() {
    chrome.storage.sync.get({ allowedDomains: DEFAULT_DOMAINS }, (res) => {
      const domains = Array.isArray(res.allowedDomains) && res.allowedDomains.length > 0 ? res.allowedDomains : DEFAULT_DOMAINS
      textarea.value = domains.join('\n')
    })
  }

  function save() {
    const lines = textarea.value
      .split('\n')
      .map((d) => d.trim())
      .filter((d) => d.length > 0)
    const domains = lines.length > 0 ? lines : DEFAULT_DOMAINS
    chrome.storage.sync.set({ allowedDomains: domains }, () => {
      setStatus('Saved')
    })
  }

  saveBtn.addEventListener('click', save)
  load()
})()
