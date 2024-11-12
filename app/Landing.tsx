import React from 'react'

import { signIn, useSession } from "next-auth/react";
import Dashboard from './Dashboard';
import LoggedIn from './LoggedIn';
import Login from './Login';

function Landing() {
    const { data : session } = useSession()
  return (
    <div>
        {/* if the user has a session, i.e. they logged in, it will bring them to dashboard, otherwise the login page */}
      {session ? (
        <Dashboard></Dashboard>
      ) : (
        <Login></Login>
      )}
    
    </div>
  )
}

export default Landing