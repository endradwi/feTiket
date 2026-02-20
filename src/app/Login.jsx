import AuthLayout from "../layout/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../components/ui/Field"
import { Separator } from "../components/ui/Separator"


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
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input variant={"password"}/>
            </FieldContent>
          </Field>
          <div className="flex items-center justify-center">
          <Separator/>
          <span className="text-muted-foreground">Or</span>
          <Separator/>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}

export default Login
