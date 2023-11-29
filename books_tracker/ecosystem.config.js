module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'npm',
        args: 'run dev',
        cwd: './client',
        watch: true,
        env: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'backend',
        script: 'npm',
        args: 'run start',
        cwd: './backend',
        watch: true,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  