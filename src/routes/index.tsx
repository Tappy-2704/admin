import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { paths } from "./paths";
import { SplashScreen } from "@/components/loading";
import OverviewLayout from "@/layouts/overview-layout";
const ArticlesListPage = lazy(() => import("@/pages/articles/list"));
const CategoryListPage = lazy(() => import("@/pages/category/list"));
const TopicListPage = lazy(() => import("@/pages/topic/list"));
const UserListPage = lazy(() => import("@/pages/user/list"));
const LoginPage = lazy(() => import("@/pages/auth/login"));

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <OverviewLayout>
              <Outlet />
            </OverviewLayout>
          ),
          children: [
            {
              path: paths.article.list,
              element: <ArticlesListPage />,
            },
            {
              path: paths.category.list,
              element: <CategoryListPage />,
            },
            {
              path: paths.topic.list,
              element: <TopicListPage />,
            },
            {
              path: paths.user.list,
              element: <UserListPage />,
            },
          ],
        },
      ],
    },

    // No match
    { path: "*", element: <Navigate to={paths.page404} replace /> },
  ]);
}
