'use babel'

import { Point } from 'atom'
import * as Helpers from '../'

describe('Atom-Autocomplete', function() {
  let editor

  beforeEach(function() {
    waitsForPromise(function() {
      return atom.workspace.open(__filename).then(function() {
        editor = atom.workspace.getActiveTextEditor()
      })
    })
  })
  afterEach(function() {
    atom.workspace.destroyActivePaneItem()
  })

  function getPoint(point) {
    return Point.fromObject(point)
  }

  describe('shouldTriggerAutocomplete', function() {
    it('returns true for activatedManually', function() {
      expect(Helpers.shouldTriggerAutocomplete({ activatedManually: true })).toBe(true)
    })

    it('only allows autocomplete at appropriate times', function() {
      expect(Helpers.shouldTriggerAutocomplete({ editor, bufferPosition: getPoint([6, 6]) })).toBe(false)
      expect(Helpers.shouldTriggerAutocomplete({ editor, bufferPosition: getPoint([6, 7]) })).toBe(true)
      expect(Helpers.shouldTriggerAutocomplete({ editor, bufferPosition: getPoint([6, Infinity]) })).toBe(true)
      expect(Helpers.shouldTriggerAutocomplete({ editor, bufferPosition: getPoint([3, Infinity]) })).toBe(false)
      expect(Helpers.shouldTriggerAutocomplete({ editor, bufferPosition: getPoint([5, Infinity]) })).toBe(false)
    })
  })
})
