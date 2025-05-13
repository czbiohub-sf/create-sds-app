# Create SDS App Template

## Project Status

**⚠️ Unstable. Early, active development, and may lack sufficient end-user documentation, assistance, etc., for anything other than the earliest adopters.**

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Light Mode

<p align="center">
  <img width="800" alt="Light Mode" src="https://github.com/user-attachments/assets/ea144366-1fdb-4aad-95dc-e6e419abb0fa">
</p>

### Dark Mode

<p align="center">
  <img width="800" alt="Dark Mode" src="https://github.com/user-attachments/assets/8dd94480-35c0-4bd4-89b4-495fa4b1b67d">
</p>

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](https://github.com/chanzuckerberg/.github/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [opensource@chanzuckerberg.com](mailto:opensource@chanzuckerberg.com).

## Reporting Security Issues

If you believe you have found a security issue, please responsibly disclose by contacting us at [security@chanzuckerberg.com](mailto:security@chanzuckerberg.com).

## Development Setup

1.  **Set up Environment Variables:**
    Create a `.env` file in the project root and add the following variables:

    ```bash
    AUTH_SECRET="generate with npx auth"
    DATABASE_URL="postgresql://user:password@localhost:5432/dev_db" # to use dev docker db
    ```

2.  **Start the Database:**
    Ensure you have Docker installed and running. Then, start the PostgreSQL container:

    ```bash
    docker-compose up -d
    ```

3.  **Apply Database Schema:**
    Install dependencies if you haven't already (`yarn`). Then, apply the latest database schema changes defined in `db/schema.ts`:

    ```bash
    npx drizzle-kit push
    ```

4.  **Run the Development Server:**
    Start the application's development server (Next.js):

    ```bash
    yarn dev
    ```

    The application should now be running locally at `http://localhost:3000`, connected to the Dockerized PostgreSQL database.
