import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface TemplateEmailProps {
  userFirstname: string
  msg: string
}

export const TemplateEmail = ({ userFirstname, msg }: TemplateEmailProps) => (
  <Html>
    <Head />
    <Preview>Ada pesan baru dari {userFirstname}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`../../assets/images/meta-image.png`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>
          Ada pesan baru dari <Text style={{ fontWeight: 'bold' }}>{userFirstname}</Text>
        </Text>

        <Hr style={hr} />
        <Text style={paragraph}>{msg}</Text>
      </Container>
    </Body>
  </Html>
)
export default TemplateEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
