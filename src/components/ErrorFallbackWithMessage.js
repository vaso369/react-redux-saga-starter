import React from 'react'

const ErrorFallback = ({ message, error, resetErrorBoundary }) => {
  const divStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
  }

  return (
    <div role="alert" style={divStyle}>
      <p>We are sorry! {message}</p>
      {/* <Button>Try again</Button> */}
      {/* <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  )
}

export default ErrorFallback
