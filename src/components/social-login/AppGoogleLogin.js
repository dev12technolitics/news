// import GoogleLogin from 'react-google-login'

export const AppGoogleLogin = ({
  // title = 'Continue with Google',
  // ...otherProps
}) => {
  // const responseGoogle = (response) => {
  //   console.log(response)
  // }

  return (
    <div className="my-6 flex w-full items-center justify-center">
      {/* <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        render={(renderProps) => (
          <AppButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            {...otherProps}
            variant="outlined"
            fullWidth
            startIcon={<FcGoogle size={35} className="mr-3" />}
            title={title}
          />
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
      Google
    </div>
  )
}
