import ContactForm from "@/components/User/ContactForm";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  return (
    <>
      <h2 className="mt-10 font-medium text-3xl mb-10">Love to hear from you, <br /> Get in touch 👋</h2>
      <ContactForm />
    </>
  );
}
