import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";
  const isPublicPage = createRouteMatcher(["/auth"])
  const isSignInPage = createRouteMatcher(["/auth"]);
  //const isProtectedRoute = createRouteMatcher(["/product(.*)"]);
  const isProtectedRoute = createRouteMatcher(["/"]);
  export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    
    if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/");
    }
    if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
    /*
    if(!isPublicPage(request) && !(await convexAuth.isAuthenticated())){
      return nextjsMiddlewareRedirect(request, "/auth");
    }
    if(isPublicPage(request) && (await convexAuth.isAuthenticated())){
      return nextjsMiddlewareRedirect(request, "/");
    }
    */
  });
   
  export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };