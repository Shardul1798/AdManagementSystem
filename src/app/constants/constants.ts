import { SwaggerOptions } from "swagger-ui-express";

export const AUTH_TYPE = {
    BASIC_AUTH : 'Basic',
    BEARER_AUTH : 'Bearer'
}

export const SWAGGER_OPTIONS: SwaggerOptions = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.3', // present supported openapi version
        info: {
            title: 'Ad management system',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
        // parameters: {
        //     DeviceId: {
        //         name: 'device_id',
        //         in: 'header',
        //         description: 'device id of the user',
        //         type: 'string',
        //         example: '123-321-213-333',
        //     },
        //     Browser: {
        //         name: 'browser',
        //         in: 'header',
        //         description: 'User agent',
        //         type: 'string',
        //         example: 'Chrome',
        //     },
        // },
    },
    apis: ['./src/swagger/*'], // files containing annotations as above
};

