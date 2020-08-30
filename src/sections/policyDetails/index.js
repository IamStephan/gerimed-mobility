import React from 'react'

// Material
import { Typography, Chip } from '@material-ui/core'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss';

const Title = props => {
  return (
    <Typography
      variant='h2'
      className={styles['title']}
      gutterBottom
    >
      {props.children}
    </Typography>
  )
}

const Caption = props => {
  return (
    <Typography
      paragraph
    >
      {props.children}
    </Typography>
  )
}

const Header = props => {
  return (
    <Typography
      variant='h4'
      className={styles['header']}
      gutterBottom
    >
      {props.children}
    </Typography>
  )
}

const Paragraph = props => {
  return (
    <Typography
      variant='body1'
      paragraph
    >
      {props.children}
    </Typography>
  )
}

const PolicyDetails = () => {
  return (
    <Section
      className={styles['policySection']}
    >
      <section>
        <Title>
          Privacy Notice
        </Title>

        <Chip
          variant='outlined'
          color='secondary'
          label='Last updated August 22, 2020'
        />
      </section>

      <br />

      <section>
        <Paragraph>
        Thank you for choosing to be part of our community at Kogelpark Kliniek BK T/A Gerimed Mobility, doing business as Gerimed Mobility (“Gerimed Mobility”, “we”, “us”, or “our”). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at info@gerimedmobility.co.za.
        </Paragraph>

        <Paragraph>
        When you visit our website https://gerimedmobility.co.za (the "Website"), and more generally, use any of our services (the "Services", which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
        </Paragraph>

        <Paragraph>
        This privacy notice applies to all information collected through our Services (which, as described above, includes our Website), as well as any related services, sales, marketing or events.
        </Paragraph>

        <Paragraph>
        Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          What information do we collect?
        </Header>

        <Paragraph>
        <strong>
        Personal information you disclose to us
        </strong>
        </Paragraph>

        <Paragraph>
        We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
        </Paragraph>

        <Paragraph>
        The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:
        </Paragraph>

        <Paragraph>
        Personal Information Provided by You. We collect names; phone numbers; email addresses; mailing addresses; passwords; and other similar information.
        </Paragraph>

        <Paragraph>
        Payment Data. We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Flutterwave. You may find their privacy notice link(s) here: https://flutterwave.com/za/privacy-policy.
        </Paragraph>

        <Paragraph>
        Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS" below.
        </Paragraph>

        <Paragraph>
        All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
        </Paragraph>

        <Paragraph>
          <strong>
          Information automatically collected
          </strong>
        </Paragraph>

        <Paragraph>
        We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about who and when you use our Website and other technical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.
        </Paragraph>

        <Paragraph>
        Like many businesses, we also collect information through cookies and similar technologies.  
        </Paragraph>

        <Paragraph>
          <strong>
            The information we collect includes:
          </strong>
        </Paragraph>

        <Paragraph>
          Log and Usage Data. Log and usage data is service-related, diagnostic usage and performance information our servers automatically collect when you access or use our Website and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the Website (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps') and hardware settings).<br /><br />
          Device Data. We collect device data such as information about your computer, phone, tablet or other device you use to access the Website. Depending on the device used, this device data may include information such as your IP address (or proxy server), device application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system configuration information.<br /><br />
          Location Data. We collect information data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type of settings of the device you use to access the Website. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Locations settings on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services. <br /><br />
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How do we use your information?
        </Header>

        <Paragraph>
        We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
        </Paragraph>

        <Paragraph>
          <strong>
          We use the information we collect or receive:
          </strong>
        </Paragraph>

        <Paragraph>
        To facilitate account creation and logon process. If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract. See the section below headed "HOW DO WE HANDLE YOUR SOCIAL LOGINS" for further information.
        </Paragraph>

        <Paragraph>
        To post testimonials. We post testimonials on our Website that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the consent of the testimonial. If you wish to update, or delete your testimonial, please contact us at info@gerimedmobility.co.za and be sure to include your name, testimonial location, and contact information.
        </Paragraph>

        <Paragraph>
        Request feedback. We may use your information to request feedback and to contact you about your use of our Website.
        </Paragraph>

        <Paragraph>
        To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.
        </Paragraph>

        <Paragraph>
        To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.
        </Paragraph>

        <Paragraph>
        Fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Website.
        </Paragraph>

        <Paragraph>
        Administer prize draws and competitions. We may use your information to administer prize draws and competitions when you elect to participate in our competitions.
        </Paragraph>

        <Paragraph>
        To deliver and facilitate delivery of services to the user. We may use your information to provide you with the requested service.
        </Paragraph>

        <Paragraph>
        To respond to user inquiries/offer support to users. We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.
        </Paragraph>

        <Paragraph>
        To send you marketing and promotional communications. We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about us or our Website, subscribing to marketing or otherwise contacting us, we will collect personal information from you. You can opt-out of our marketing emails at any time (see the "WHAT ARE YOUR PRIVACY RIGHTS" below).
        </Paragraph>

        <Paragraph>
        Deliver targeted advertising to you. We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.
        </Paragraph>

        <Paragraph>
        For other business purposes. We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Website, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent.
        </Paragraph>
      </section>

      <br/>
      
      <section>
        <Header>
          Will your information be shared with anyone?
        </Header>

        <Paragraph>
        We may process or share your data that we hold based on the following legal basis:
        </Paragraph>

        <Paragraph>
        <strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.
        </Paragraph>

        <Paragraph>
          <strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.
        </Paragraph>
        
        <Paragraph>
          <strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.
        </Paragraph>

        <Paragraph>
          <strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
        </Paragraph>

        <Paragraph>
          <strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
        </Paragraph>

        <Paragraph>
          More specifically, we may need to process your data or share your personal information in the following situations:
        </Paragraph>

        <Paragraph>
        Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
        Vendors, Consultants and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Website, which will enable them to collect data on our behalf about how you interact with our Website over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content, pages or features, and better understand online activity. Unless described in this notice, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          Do we use cookies and other tracking technologies?
        </Header>

        <Paragraph>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How do we handle your social logins?
        </Header>

        <Paragraph>
        Our Website offers you the ability to register and login using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile Information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, profile picture as well as other information you choose to make public on such social media platform.
        </Paragraph>

        <Paragraph>
        We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Website. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How long do we keep your information?
        </Header>

        <Paragraph>
        We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </Paragraph>

        <Paragraph>
        When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How do we keep your information safe?
        </Header>

        <Paragraph>
        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          Do we collect information from minors?
        </Header>

        <Paragraph>
        We do not knowingly solicit data from or market to children under 18 years of age. By using the Website, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Website. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at info@gerimedmobility.co.za.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          What are my privacy rights?
        </Header>

        <Paragraph>
        If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
        </Paragraph>

        <Paragraph>
        If you are resident in Switzerland, the contact details for the data protection authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html.
        </Paragraph>

        <Paragraph>
          <strong>
            Account Information
          </strong>
        </Paragraph>

        <Paragraph>
        If you would at any time like to review or change the information in your account or terminate your account, you can:
        </Paragraph>

        <Paragraph>
        Log in to your account settings and update your user account.
        </Paragraph>

        <Paragraph>
        Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.
        </Paragraph>

        <Paragraph>
        Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Website. To opt-out of interest-based advertising by advertisers on our Website visit http://www.aboutads.info/choices/.
        </Paragraph>

        <Paragraph>
        Opting out of email marketing: You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may:
        </Paragraph>

        <Paragraph>
          Access your account settings and update your preferences.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          Controls for do-not-track features.
        </Header>
        <Paragraph>
        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          Do we make updates to this notice?
        </Header>

        <Paragraph>
        We may update this privacy notice from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How can you review, update, or delete the data we collect from you?
        </Header>

        <Paragraph>
          Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please visit: https://gerimedmobility.co.za/profile. We will respond to your request within 30 days.
        </Paragraph>
      </section>

      <br />

      <section>
        <Header>
          How can you contact us about this notice.
        </Header>

        <Paragraph>
          If you have questions or comments about this notice, you may email us at info@gerimedmobility.co.za or by post to:
        </Paragraph>

        <Paragraph>
          Kogelpark Kliniek BK T/A Gerimed Mobility <br />
          844@Oostewal - Building <br />
          Oostewal Road, Langebaan <br />
          Saldanha, Western Cape 7357 <br />
          South Africa <br />
          Phone: 082 079 4173 <br />
          Fax: 022 772 1273 <br />
          info@gerimedmobility.co.za <br />
        </Paragraph>
      </section>
    </Section>
  )
}

export default PolicyDetails
