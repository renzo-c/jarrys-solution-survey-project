import React from "react";
import {
  Home,
  Login,
  Register,
  Surveys,
  Users,
  ReportAnalytics,
  SurveyTemplates,
  ProtectedRoute,
  NotFound,
} from "../Components";
import {
  CreateSurveyTemplate,
  DisplaySurveyTemplate,
  UpdateSurveyTemplate,
} from "../Components/SurveyTemplates";
import { CreateUser, DisplayUser, UpdateUser } from "../Components/Users";
import { Survey } from "../Components/Surveys";
import { Route, Switch } from "react-router-dom";

const RouteWithSubRoutes = (route) => {
  if (route.protected) {
    return (
      <ProtectedRoute
        path={route.path}
        exact={route.exact}
        component={(props) => <route.component {...props} routes={route.routes} />}
      />
    );
  }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <NotFound />} />
    </Switch>
  );
};

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, protected: false, component: Home },
  {
    path: "/home",
    key: "HOME",
    exact: true,
    protected: false,
    component: Home,
  },
  {
    path: "/login",
    key: "LOGIN",
    exact: true,
    protected: false,
    component: Login,
  },
  {
    path: "/register",
    key: "REGISTER",
    exact: true,
    protected: false,
    component: Register,
  },
  {
    path: "/surveys",
    key: "SURVEYS",
    protected: false,
    component: RenderRoutes,
    routes: [
      {
        path: "/surveys",
        key: "SURVEYS_ROOT",
        exact: true,
        protected: false,
        component: Surveys,
      },
      {
        path: "/surveys/survey/:id",
        key: "DISPLAY_SURVEY",
        exact: true,
        protected: false,
        component: Survey,
      },
    ],
  },
  {
    path: "/users",
    key: "USERS",
    protected: true,
    component: RenderRoutes,
    routes: [
      {
        path: "/users",
        key: "USERS_ROOT",
        exact: true,
        protected: true,
        component: Users,
      },
      {
        path: "/users/create-users",
        key: "CREATE_USERS",
        exact: true,
        protected: true,
        component: CreateUser,
      },
      {
        path: "/users/display-user/:id",
        key: "DISPLAY_USER",
        exact: true,
        protected: true,
        component: DisplayUser,
      },
      {
        path: "/users/update-user/:id",
        key: "UPDATE_USER",
        exact: true,
        protected: true,
        component: UpdateUser,
      },
    ],
  },
  {
    path: "/survey-templates",
    key: "SURVEY_TEMPLATES",
    protected: true,
    component: RenderRoutes,
    routes: [
      {
        path: "/survey-templates",
        key: "SURVEY_TEMPLATES_ROOT",
        exact: true,
        protected: true,
        component: SurveyTemplates,
      },
      {
        path: "/survey-templates/display-survey-template/:surveyTemplateType/:id",
        key: "DISPLAY_SURVEY_TEMPLATES",
        exact: true,
        protected: true,
        component: DisplaySurveyTemplate,
      },
      {
        path: "/survey-templates/update-survey-template/:surveyTemplateType/:id",
        key: "UPDATE_SURVEY_TEMPLATES",
        exact: true,
        protected: true,
        component: UpdateSurveyTemplate,
      },
      {
        path: "/survey-templates/create-survey-template",
        key: "CREATE_SURVEY_TEMPLATES",
        exact: true,
        protected: true,
        component: CreateSurveyTemplate,
      },
    ],
  },
  {
    path: "/report-analytics",
    key: "REPORT_ANALYTICS",
    exact: true,
    protected: true,
    component: ReportAnalytics,
  },
];

export default ROUTES;
