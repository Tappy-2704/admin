import { memo } from "react";

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M13 25a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM22 25a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM24.957 21.7l4-9a.5.5 0 0 0-.457-.7H25v1h2.73l-3.555 8h-14.1L7 13h4v-1H6.613l-.646-1.68A.5.5 0 0 0 5.5 10h-2a.5.5 0 0 0 0 1h1.657l4.876 12.68a.5.5 0 0 0 .467.32h17a.5.5 0 0 0 0-1H10.843l-.384-1H24.5a.5.5 0 0 0 .457-.3zM10.777 8.916 18 4.1l7.223 4.815a.5.5 0 1 0 .554-.832l-7.5-5a.5.5 0 0 0-.554 0l-7.5 5a.5.5 0 0 0 .554.832z" />
      <path d="M12.5 9a.5.5 0 0 0-.5.5v6a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5H20v-3a2 2 0 0 0-4 0v3h-2.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 0-.5-.5zm4.5 4a1 1 0 0 1 2 0v3h-2z" />
    </svg>
  );
}

export default memo(CartIcon);
