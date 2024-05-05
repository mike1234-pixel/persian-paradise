import { render, screen, fireEvent } from '@testing-library/react'
import { GlossaryModal } from 'components/common/GlossaryModal/GlossaryModal'

describe('GlossaryModal', () => {
  test('renders modal closed by default', () => {
    render(<GlossaryModal phrases={[]} />)
    const modal = screen.queryByRole('dialog')
    expect(modal).toBeNull()
  })

  test('renders modal when float button is clicked', () => {
    const { getByTestId } = render(<GlossaryModal phrases={[]} />)
    const floatButton = getByTestId('glossary-modal-float-button')
    fireEvent.click(floatButton)
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  test('closes modal when cancel button is clicked', () => {
    const { getByTestId } = render(<GlossaryModal phrases={[]} />)
    const floatButton = getByTestId('glossary-modal-float-button')
    fireEvent.click(floatButton)
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancelButton)
    const modal = screen.queryByRole('dialog')
    expect(modal).toBeNull()
  })
})
