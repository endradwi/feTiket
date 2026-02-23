import AuthLayout from "../layout/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Field, FieldContent, FieldLabel } from "../components/ui/Field"
import { Separator } from "../components/ui/Separator"
import { Label } from "../components/ui/Label"
import { Checkbox } from "../components/ui/Checkbox"
import { Link } from "react-router"

function Register() {
  return (
    <AuthLayout>
      <Card className={"w-96"}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent className={"space-y-4 py-2"}>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input placeholder="John Doe" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input placeholder="john@example.com" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input variant={"password"} />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <FieldContent>
              <Input variant={"password"} />
            </FieldContent>
          </Field>
          <div className="flex items-center gap-2 py-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
          <Button className="w-full">Register</Button>
          <div className="flex items-center justify-center pt-2">
            <span className="text-sm text-muted-foreground mr-1">Already have an account?</span>
            <Link to="/login" className="text-sm text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Register
