// Just to get rid of the hydration error for walletbutton
// https://stackoverflow.com/questions/53139884/next-js-disable-server-side-rendering-on-some-pages

import dynamic from 'next/dynamic'
import React from 'react'

const NoSsr = (props: any) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})