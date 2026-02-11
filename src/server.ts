import { createApp }  from "./app";
import { config }  from "./config";


function startServer(): void {
    const app  = createApp();

    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    })
    
}

startServer();