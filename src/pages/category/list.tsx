// ----------------------------------------------------------------------

import { CategoryListView } from "@/sections/category";

const metadata = "Home";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <CategoryListView />
      </div>
    </>
  );
}
