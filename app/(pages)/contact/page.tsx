import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import type { FC } from "react";
import { LinkWrapper } from "@/components/LinkWrapper";
import { Card } from "@/components/Card";
import SocialLinks from "@/components/SocialLinks";
import { PageHeader } from "@/components/PageHeader";

const title = "📳 Contact";
const description =
  "Feel free to share your thoughts, and I'll get back to you as soon as possible! 💬";

export const metadata: Metadata = {
  title,
  description,
};

const Contact: FC = () => (
  <>
    <PageHeader title={title} description={description} />
    <br />
    <SocialLinks />
    <Card title="" className=" !mt-[-60px]">
      <div className="p-[20px] md:p-[48px] not-prose">
        <h3>
          <span className="text-gray-400 ">
            Want to hire me as a freelancer? Lets discuss.
          </span>
          <br />
        </h3>

        <div>
          <LinkWrapper
            href="https://api.whatsapp.com/send/?phone=7318757426&text=I+want+to+work+on+a+project+with+you&type=phone_number&app_absent=0"
            className="bg-primary-500 block font-semibold my-5 p-2 rounded-md text-center w-full text-gray-800 !no-underline  hover:text-gray-900"
          >
            {" "}
            Chat on WhatsApp
          </LinkWrapper>
        </div>
        <span className="flex flex-row justify-center">- Or -</span>
        <h3 className="mt-4 text-gray-400">
          Drop in your details and I will get back to you.
        </h3>
        <ContactForm />
      </div>
    </Card>
  </>
);

export default Contact;
