import { importShared } from './__federation_fn_import-BMdLx5XD.js';
import { j as jsxRuntimeExports } from './__federation_expose_UsersList-DirZe2-m.js';
import { r as reactDomExports } from './index-COvqqES_.js';
import App from './__federation_expose_UsersApp-BDb40af0.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
