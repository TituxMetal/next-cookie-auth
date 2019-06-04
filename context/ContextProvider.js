import { UserProvider } from '../context'

const ProviderComposer = ({ contexts, children }) => {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  )
}

const ContextProvider = ({ children, authStatus, pathname }) => {
  return (
    <ProviderComposer contexts={[<UserProvider authStatus={authStatus} pathname={pathname} />]}>
      {children}
    </ProviderComposer>
  )
}

export { ContextProvider }
