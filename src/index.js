'use strict'

const PREFIX_REGEX = /[^ ,{}();'"]$/

function shouldTriggerAutocomplete({ editor, activatedManually, bufferPosition }) {
  if (activatedManually) {
    return true
  }
  const prefix = editor.getTextInBufferRange([[bufferPosition.row, 0], bufferPosition])
  return PREFIX_REGEX.test(prefix)
}

module.exports = { shouldTriggerAutocomplete }
