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

const ContextProvider = ({ children, authStatus }) => {
  return (
    <ProviderComposer contexts={[<UserProvider authStatus={authStatus} />]}>
      {children}
    </ProviderComposer>
  )
}

export { ContextProvider }
