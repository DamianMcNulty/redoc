import Layout from "../common/layout.jsx";
import Docs from "../common/docs/docs.jsx";
import ReactCookie from "react-cookie";

const {Route, IndexRoute} = ReactRouter;

const AppRoutes = (
  <Route component={Layout} path="/">
    <Route component={Docs} path="/:repo/:branch/:alias" />
    <IndexRoute component={Docs} />
  </Route>
);

ReactRouterSSR.Run(AppRoutes, {
  props: {
    onUpdate() {
      // Notify the page has been changed to Google Analytics
      ga("send", "pageview");
    }
  }
}, {
  preRender: (req, res) => {
    ReactCookie.plugToRequest(req, res);
  }
});

if (Meteor.isClient) {
  if (Meteor.settings.public.ga.account !== undefined) {
    // Load Google Analytics
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
    /* eslint-enable */

    ga("create", Meteor.settings.public.ga.account, "auto");
    ga("send", "pageview");
  }
}
