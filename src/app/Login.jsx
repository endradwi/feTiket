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
      <Card className={"size-96"}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className={"h-96 space-y-2 py-2"}>
          <Field className={""}>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input />
            </FieldContent>
          </Field>
          <Field className={""}>
            <div className="flex items-center justify-between w-full">
              <FieldLabel>Password</FieldLabel>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <FieldContent>
              <Input variant={"password"}/>
            </FieldContent>
          </Field>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I agree to the terms and condition</Label>
          </div>
          <Button className="w-full">Login</Button>
          <div className="flex items-center justify-center pt-2 gap-2">
            <Separator className="flex-1"/>
            <span className="text-muted-foreground text-sm">Or</span>
            <Separator className="flex-1"/>
          </div>
          <div className="flex items-center justify-center text-sm pt-2">
            <span className="text-muted-foreground mr-1">Don't have an account?</span>
            <Link to="/register" className="text-primary hover:underline">Register here</Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Login
