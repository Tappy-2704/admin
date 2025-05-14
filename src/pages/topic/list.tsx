// ----------------------------------------------------------------------

import { TopicListView } from "@/sections/topic";

const metadata = "Home";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <TopicListView />
      </div>
    </>
  );
}
