# 1. Use an official Node.js image as the base
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# 4. Copy dependencies and install them
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

# 5. Copy the source code
COPY . .

# 6. Build the project
RUN pnpm build

# 7. Set environment variables (optional)
ENV NODE_ENV=production

# 8. Expose the app port (adjust if needed)
EXPOSE 3000

# 9. Run the app
CMD ["node", "dist/main"]
