import React from 'react'
  import Header from './Header'
  import Footer from './Footer'
const Layout = ({ children, user, onLogout }) => {
  return (
    <div>
        <Header  user={user} onLogout={onLogout} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
