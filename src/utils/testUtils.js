import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../store'
import { act, Simulate } from 'react-dom/test-utils'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function pressKey(key, el = document) {
  const ctrlKey = key === 'Control'
  const shiftKey = key === 'Shift'
  fireEvent.keyDown(el, { key, ctrlKey, shiftKey });
  fireEvent.keyUp(el, { key, ctrlKey, shiftKey });
}

export function selectMode(modeDisplayName, modeType) {
  const mode = screen.getByLabelText(modeDisplayName, { selector: 'input' });
  act(() => Simulate.change(mode, { checked: true, target: { name: modeType }}))
}

export const firstCellCoords = { row: 0, col: 0 }

export function coordsString({ row, col }) {
  return `cell-${row}-${col}`;
}