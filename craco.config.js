const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@store": path.resolve(__dirname, "src/store"),
      "@style": path.resolve(__dirname, "src/style"),
      "@type": path.resolve(__dirname, "src/types"),
    },
  },
};
