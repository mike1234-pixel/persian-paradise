import { render, screen } from '@testing-library/react'
import { Glossary } from './Glossary'

describe('<Glossary />', () => {
  test('renders loading screen', async () => {
    const modules = undefined

    render(
      <Glossary
        modules={modules}
        modulesLoading={true}
        errorLoadingModules={null}
      />
    )

    expect(screen.getByText('loading...')).toBeInTheDocument()
  })

  test('renders glossary with modules', async () => {
    const modules = [
      {
        _id: '64c6476a00012b98e3a0c766',
        title: 'Phrases 1',
        subtitle: 'Greetings and Basic Conversation',
        emoji: '🗣',
        phrases: [
          {
            fa: {
              informal: 'sálam',
              formal: 'dorood'
            },
            _id: '6600671e203e9632e67c2387',
            en: 'hello',
            emoji: '🙋‍♂️'
          }
        ]
      }
    ]

    render(
      <Glossary
        modules={modules}
        modulesLoading={false}
        errorLoadingModules={null}
      />
    )

    expect(screen.getByText('Phrases 1 🗣')).toBeInTheDocument()
  })
})
