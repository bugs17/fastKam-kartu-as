'use client'
import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Provider = ({children}) => {
  return (
    <>
        <ProgressBar color={'#941dff'} shallowRouting options={{showSpinner:false}} />
        {children}
    </>
  )
}

export default Provider