import AuthLayout from "../layout/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../components/ui/Field"
import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"

function ForgotPassword() {
  return (
    <AuthLayout>
      <Card className={"w-96"}>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent className={"space-y-4 py-2"}>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input placeholder="john@example.com" />
            </FieldContent>
          </Field>
          <Button className="w-full">Send Reset Link</Button>
          <div className="flex items-center justify-center pt-4">
            <Link to="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 size-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default ForgotPassword
