import React from 'react'

// Material
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const FAQ = () => {
  return (
    <section
      className={styles['faqSection']}
    >
      <div
        className={styles['faqContainer']}
      >
        <Typography
          variant='h4'
          className={styles['title']}
        >
          Frequently asked questions
        </Typography>

        <div
          className={styles['questions']}
        >
          <Accordion
            expanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography
                className={styles['header']}
              >
                How does shipping work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography
                className={styles['header']}
              >
                Can i make refunds?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography
                className={styles['header']}
              >
                What Payment gateway do you use?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQ
