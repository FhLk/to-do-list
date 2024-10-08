/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        API:"https://todo-list-api-mfchjooefq-as.a.run.app/todo-list",
        DEFAULT_OFFSET: 0,
        DEFAULT_LIMIT : 10,
        USERNAME : "FhLk@pet-in.com",
        PASSWORD : "COZY_Day"
    },
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    // basePath: "/",
    images : {
        unoptimized : true
    }

};

export default nextConfig;
