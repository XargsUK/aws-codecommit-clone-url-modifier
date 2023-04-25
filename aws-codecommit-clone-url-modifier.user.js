// ==UserScript==
// @name         AWS CodeCommit Clone URL Modifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Modify the clone URL to include the profile name
// @author       https://github.com/XargsUK/
// @match        https://*.console.aws.amazon.com/codesuite/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  const debugmode = false // Set to true to enable debug logging

  function getProfileName () {
    const profileSpan = Array.from(document.querySelectorAll('span')).find(span => span.title.startsWith('PowerUser @'))
    if (profileSpan) {
      const label = profileSpan.textContent
      const parts = label.split(' | ')
      const profileName = parts[0].split('/ ')[1].trim()
      if (debugmode) {
        console.log('Profile name:', profileName)
      }
      return profileName
    }
    if (debugmode) {
      console.log('Profile name not found')
    }
    return null
  }

  function getCloneUrlFromContent (contentElement) {
    const urlPattern = /(codecommit::[^<]+)(<br>)/
    const match = contentElement.innerHTML.match(urlPattern)
    if (match) {
      const url = match[1]
      if (debugmode) {
        console.log('Clone URL:', url)
      }
      return url
    }
    if (debugmode) {
      console.log('Clone URL not found')
    }
    return null
  }

  function modifyCloneUrl (cloneUrl, profileName) {
    const urlParts = cloneUrl.split('//')
    const modifiedUrl = urlParts[0] + '//' + profileName + '@' + urlParts[1]
    if (debugmode) {
      console.log('Modified URL:', modifiedUrl)
    }
    return modifiedUrl
  }

  function copyToClipboard (text) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    if (debugmode) {
      console.log('Copied to clipboard:', text)
    }
  }

  function handleFlashMessageCreation (contentElement) {
    const cloneUrl = getCloneUrlFromContent(contentElement)
    const profileName = getProfileName()

    if (cloneUrl && profileName) {
      const modifiedUrl = modifyCloneUrl(cloneUrl, profileName)
      copyToClipboard(modifiedUrl)
    }
  }
  // eslint-disable-next-line no-undef
  const observer = new MutationObserver((mutations) => {
    if (debugmode) {
      console.log('Mutation detected')
    }
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        // eslint-disable-next-line no-undef
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('.awsui-flash-message')) {
          if (debugmode) {
            console.log('New flash message detected')
          }
          const contentElement = node.querySelector('[awsui-flash-region="content"]')
          if (contentElement) {
            if (debugmode) {
              console.log('Flash message content found')
            }
            handleFlashMessageCreation(contentElement)
          }
        }
      }
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
})()
