import React from 'react'

// Material
import { Typography, Avatar, Divider } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

// Templates
import { Section } from '../../templates/content_layout'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// Styles
import styles from './styles.module.scss'

// Static Queries
const STATIC_QUERY = graphql`
  query {
    FAQ: strapiFaq {
      frequentlyAskedQuestion {
        faq_section {
          title: section_name
          questions {
            answer
            question
          }
        }
      }
    }
  }
`

const FAQ = () => {
  const { FAQ: { frequentlyAskedQuestion: { faq_section: sections } } } = useStaticQuery(STATIC_QUERY)

  return (
    <Section
      className={styles['faqSection']}
    >
      <Typography
        variant='h4'
        className={styles['title']}
        color='secondary'
      >
        <b>Frequently Asked Questions</b>
      </Typography>

      {
        sections.map((section, i) => (
          <section
            key={section.title}
            className={styles['questionSection']}
          >
            <Typography
              variant='h5'
              className={styles['header']}
              color='secondary'
            >
              <b>{section.title}</b>
            </Typography>

            <Divider />

            <div
              className={styles['questionsContent']}
            >
              {
                section.questions.map((question, i) => (
                  <div
                    key={i}
                    className={styles['question']}
                  >
                    <div className={styles['left']}>
                      <Avatar
                        className={styles['questionAvatar']}
                      >
                        <HelpOutline />
                      </Avatar>
                    </div>

                    <div
                      className={styles['right']}
                    >
                      <Typography
                        className={styles['questionHeader']}
                        variant='h6'
                      >
                        <b>{question.question}</b>
                      </Typography>
                      <Typography
                        className={styles['questionContent']}
                      >
                        {question.answer}
                      </Typography>
                    </div>
                    
                  </div>
                ))
              }
            </div>
          </section>
        ))
      }
    </Section>
  )
}

export default FAQ
