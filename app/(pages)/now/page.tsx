import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import type { FC } from "react";
import { LinkWrapper } from "@/components/LinkWrapper";
import { Card } from "@/components/Card";
import SocialLinks from "@/components/SocialLinks";
import { PageHeader } from "@/components/PageHeader";
import { Dot } from "lucide-react";

const title = "🌱 Now";
const description = "Current focus & activities update: what I'm doing now";

export const metadata: Metadata = {
  title,
  description,
};
const extraContent = (
  <button className=" border border-neutral-600 text-red-500 pl-1 pr-3  rounded-full text-sm font-semibold flex items-center">
    <Dot className="animate-pulse m-0" /> LIVE
  </button>
);
const Now: FC = () => (
  <>
    <PageHeader
      title={title}
      description={description}
      extraContent={extraContent}
    />
    <br />
    <div className="">
      <dl className="">
        {nowItems.map((item, index) => (
          <div key={index}>
            <dt className="text-base font-semibold leading-7 text-neutral-50">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  </>
);

const nowItems = [
  {
    label: (
      <span>
        🧑🏻‍💻 Software Engineer @{" "}
        <LinkWrapper href="https://www.griddynamics.com/">
          Grid Dynamics
        </LinkWrapper>
      </span>
    ),
    description: "",
  },
  {
    label: (
      <span>
        🔧 Re designing this website{" "}
        <LinkWrapper href="https://portfoliominute.in/">
          Portfolio Minute
        </LinkWrapper>
      </span>
    ),
    description: "",
  },
  {
    label: (
      <span>
        🚀 Working on a side project related to System Design concepts (Live
        soon)
      </span>
    ),
    description: "",
  },
  {
    label: <span>📕 Learning Vertex AI Search for Retail</span>,
    description: "",
  },
  {
    label: <span>📍 Living in Bangalore, India</span>,
    description: "",
  },
];

export default Now;
