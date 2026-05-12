import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utils/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

    // * All products get
    if (url === "/products" && method === "GET") {

        const products = readProduct();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "This is Products route",
            data: products
        }));
    }

    // * Single product get
    else if (method === "GET" && id !== null) {

        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);

        if(!product){
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "Product not found!",
                data: product
            }));
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "This is Products route",
            data: product
        }));
    }

    // Product create using post
    else if (method === "POST" && url === "/products") {

        const products = readProduct();
        const body = await parseBody(req);

        const newProduct = {
            id: Date.now(),
            ...body
        };

        products.push(newProduct);
        insertProduct(products)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product created successfully",
            data: products
        }))
    }

    // Put method using for product
    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);
        const products = readProduct();

        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "Product not found!",
                data: null
            }));
        }

        products[index] = { id: products[index].id, ...body };
        insertProduct(products);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product updated successfully",
            data: products[index]
        }))
    }

    // Product delete
    else if (method === "DELETE" && id !== null) {
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "Product not found!",
                data: null
            }));
        }

        products.splice(index, 1);
        insertProduct(products);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product deleted successfully",
            data: products[index]
        }))
    }
};
