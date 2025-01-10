import { deployCommands } from './deploy-commands';

async function main() {
    try {
        console.log('Starting command deployment...');
        await deployCommands();
        console.log('Command deployment completed successfully.');
    } catch (error) {
        console.error('Command deployment failed:', error);
    }
}

main();