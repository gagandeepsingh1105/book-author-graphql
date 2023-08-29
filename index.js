import { schema } from "./schema.js"
import { Server } from ".server.js"
import DataLoader from "dataloader"


function index() {
    const server = Server({ schema, context: { authorloader: new DataLoader(batchauthors) } });
    server.listen(8080, () => {
        console.info(`Server is running on http://localhost:8080/graphql`);
    });
}

index();