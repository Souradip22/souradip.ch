import type { FC, ReactNode } from "react";

type PageLayoutProperties = {
  readonly children: ReactNode;
};

const PageLayout: FC<PageLayoutProperties> = ({ children }) => (
  <main className="px-4 pt-24 pb-32 sm:pt-32">
    <div className="space-y-12 prose prose-neutral prose-primary mx-auto dark:prose-invert">
      {children}
    </div>
  </main>
);

export default PageLayout;
