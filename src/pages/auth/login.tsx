// ----------------------------------------------------------------------

import { LoginView } from "@/sections/auth";

const metadata = "Login";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <LoginView />
      </div>
    </>
  );
}
