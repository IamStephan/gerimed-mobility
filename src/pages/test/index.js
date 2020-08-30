import React from 'react'

// Hooks
import { useRendersCount } from 'react-use'

// Templates
import ContentLayout, { Section, NavbarDetector } from '../../templates/content_layout'

const TestPage = () => {
  const renders = useRendersCount()
  return (
    <ContentLayout
      isNavNormal={false}
    >
      <NavbarDetector />
      <Section
        isClamped={false}
        isPadded={false}
      >
        asd
      </Section>

      <Section>
        {
          renders
        }
      </Section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </ContentLayout>
  )
}

export default TestPage
