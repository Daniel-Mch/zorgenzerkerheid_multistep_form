import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

const catalog = {
  basicInsurance: [
    { id: 'basis', name: 'Basis', price: 100, description: 'Basisdekking' },
  ],
  additionalInsurance: [],
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(catalog),
      }),
    ),
  )
})

describe('App', () => {
  it('renders the registration heading and first step', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: /verzekering afsluiten/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /persoonlijke informatie/i }),
    ).toBeInTheDocument()
  })
})
