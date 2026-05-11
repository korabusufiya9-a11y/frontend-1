import React from "react";

import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from "./App";

/* PAGES */
import Dashboard from "./pages/dashboard";
import AccountsPage from "./pages/Account";
import AnalyticsPage from "./pages/Analytic";
import BudgetPage from "./pages/Budget";
import CategoryPage from "./pages/Category";
import RecordsPage from "./pages/Record";
import TransactionsPage from "./pages/Transaction";
import ReportPage from "./pages/Report";
import BalanceTrendPage from "./pages/BalanceTrend";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import VerifyOtpPage from "./pages/Verify-Otp";
import label from "./pages/Label";

const router =
  createBrowserRouter([
    {
      path: "/",

      element: <App />,

      children: [
        {
          index: true,
          element: <Dashboard />,
        },

        {
          path: "dashboard",
          element: <Dashboard />,
        },

        {
          path: "accounts",
          element: <AccountsPage />,
        },

        {
          path: "analytics",
          element: <AnalyticsPage />,
        },

        {
          path: "budgets",
          element: <BudgetPage />,
        },

        {
          path: "categories",
          element: <CategoryPage />,
        },

        {
          path: "records",
          element: <RecordsPage />,
        },

        {
          path: "transactions",
          element: <TransactionsPage />,
        },

        {
          path: "reports",
          element: <ReportPage />,
        },

        {
          path: "balancetrend",
          element: <BalanceTrendPage />,
        },

        {
          path: "register",
          element: <RegisterPage />,
        },

        {
          path: "login",
          element: <LoginPage />,
        },

        {
          path: "verify-otp",
          element: <VerifyOtpPage />,
        },

        {
          path: "labels",
          element: <label />,
        },
      ],
    },
  ]);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
);