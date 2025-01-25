# Running the App on Localhost

## Steps to Set Up and Run the App

1. **Install Packages**  
   Run the following command to install the required packages:  
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Run Convex Backend**
   Start the Convex backend with:
   ```bash
   npx convex dev
   ```
3. **Run Next.js Frontend**
   Launch the frontend with:
   ```bash
   npm run dev
   ```
4. **Set Up Convex Backend**
    - Follow the Convex Documentation for detailed instructions. https://docs.convex.dev/quickstart/nextjs

5. **Configure OAuth Apps**
    - Create OAuth apps on the Google Cloud Console and GitHub for authentication.
    - Set up the necessary credentials/env variables for Google/GitHub Auth.
    - https://labs.convex.dev/auth/config/oauth
