/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    s3: {
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'task-bonsai',
      region: 'us-east-1'
    },

    's3-index': {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'task-bonsai',
      region: 'us-east-1'
    },

    sentry: {
      publicUrl: 'https://alpha.taskbonsai.com',
      sentryUrl: 'https://c668761c1ea342e79cd15133f7433b69@app.getsentry.com/90249',
      sentryUrl: 'https://app.getsentry.com/api/0/projects/task-bonsai/task-bonsai-frontend/releases/',
      sentryOrganizationSlug: 'task-bonsai',
      sentryProjectSlug: 'task-bonsai-frontend',
      sentryApiKey: process.env.SENTRY_API_KEY
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
