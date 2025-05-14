// ----------------------------------------------------------------------

import { ArticleListView } from "@/sections/articles";

const metadata = "Home";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <ArticleListView />
      </div>
    </>
  );
}
