import { HtmlHead } from '../layout'
import { GlobalStyle, Content, Footer, Main } from '../styled'
import { Menu } from '../navigation'

const Page = ({ children, title }) => (
  <Main>
    <GlobalStyle />
    <HtmlHead title={title} />
    <Menu />
    <Content>{children}</Content>
    <Footer>
      <p>Created with love by TuxiMetal</p>
    </Footer>
  </Main>
)

export default Page
