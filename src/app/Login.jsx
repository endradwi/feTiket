import AuthLayout from "../layout/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../components/ui/Field"
import { Separator } from "../components/ui/Separator"
import { Label } from "../components/ui/Label"
import { Checkbox } from "../components/ui/Checkbox"
import { Link } from "react-router"

function Login() {

  return (
    <AuthLayout >
      <Card >
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className={"space-y-2 py-2"}>
          <Field className={""}>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input />
            </FieldContent>
          </Field>
          <Field className={""}>
              <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input variant={"password"}/>
            </FieldContent>
          </Field>
          <div className="flex items-center justify-end w-full">
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
          <Button className="w-full">Login</Button>
          
          <div className="flex items-center justify-center text-sm pt-2">
            <span className="text-muted-foreground mr-1">Don't have an account?</span>
            <Link to="/register" className="text-primary hover:underline">Register here</Link>
          </div>
          <div className="flex items-center justify-center pt-2 gap-2">
            <Separator className="flex-1"/>
            <span className="text-muted-foreground text-sm">Or</span>
            <Separator className="flex-1"/>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button>Login with Google</Button>
            <Button>Login with Facebook</Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Login
