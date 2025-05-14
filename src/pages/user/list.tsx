// ----------------------------------------------------------------------

import { UserListView } from "@/sections/user";

const metadata = "Home";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <UserListView />
      </div>
    </>
  );
}
