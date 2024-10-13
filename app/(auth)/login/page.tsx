// import { userLoginWithEmail } from "@/actions/auth";
import Form from "@/components/ui/Form";
import { BiLock } from "react-icons/bi";

export default function LoginPage() {
  const inputs = [
    { type: "email", name: "email", label: "Email", placeholder: "Enter your email address" },
    { type: "password", name: "password", label: "Password", placeholder: "Enter your password" },
  ];
  
  return (
    <div className="h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="rounded-3 w-[80%] sm:w-[450px] bg-white p-5 rounded-xl">
        <h1 className="text-xl font-[500] mb-3 pb-3 border-b flex gap-2 items-center">
          <BiLock className="text-xl" />
          Login to your account
        </h1>
        {/* <Form formClasses="space-y-2" inputs={inputs} action={userLoginWithEmail} buttonText="Sign in" /> */}
      </div>
    </div>
  );
}
