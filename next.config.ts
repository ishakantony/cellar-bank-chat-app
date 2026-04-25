import type { NextConfig } from "next";
import { networkInterfaces } from "os";

function getLocalNetworkOrigins() {
  return Object.values(networkInterfaces())
    .flatMap((interfaces) => interfaces ?? [])
    .filter((networkInterface) => networkInterface.family === "IPv4" && !networkInterface.internal)
    .map((networkInterface) => networkInterface.address);
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: "standalone",
  allowedDevOrigins: getLocalNetworkOrigins(),
};

export default nextConfig;
