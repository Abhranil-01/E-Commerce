module.exports = ({ env }) => ({
    // Upload configuration
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  
    // Redis configuration
    redis: {
      config: {
        connections: {
          default: {
            connection: {
              host: '127.0.0.1',
              port: 6379,
              db: 0,
            },
            settings: {
              debug: false,
            },
          },
        },
      },
    },
  
    // Rest-cache configuration
    "rest-cache": {
      config: {
        provider: {
          name: "redis",
          options: {
            max: 32767,
            connection: "default",
          },
        },
        strategy: {
          enableEtagSupport: true,
          logs: true,
          clearRelatedCache: true,
          maxAge: 3600000,
          contentTypes: [
            // List of Content-Types UID to cache
            "api::category.category",
            "api::add-to-cart.add-to-cart",
            "api::badminton.badminton",
            "api::cricket.cricket",
            "api::football.football",
            "api::order-list.order-list",
            "api::product.product",
            "api::review.review",
            "api::running.running",
            "api::user-address.user-address",

            {
              contentType: "api::category.category",
              maxAge: 3600000,
              hitpass: false,
              keys: {
                useQueryParams: false,
                useHeaders: ["accept-encoding"],
              },
              maxAge: 18000,
              method: "GET",
            },
          ],
        },
      },
    },
  });
  