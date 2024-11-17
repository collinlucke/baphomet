import { execSync } from 'child_process';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  try {
    execSync('npm link phantomartist', {
      stdio: 'inherit'
    });
    console.log('Successfully linked phantomartist');
  } catch (error) {
    console.error('Failed to link phantomartist', error);
  }
}
