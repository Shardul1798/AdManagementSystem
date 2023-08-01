import { Router } from "express";
import { addressRoutes } from "./address/address.routes";
import { imageRoutes } from "./images/images.routes";
import { userRoutes } from "./users/users.routes";
import { productRoutes } from "./products/products.routes";

class AppRoutes{
    public appRoute:Router;
    constructor() {
        this.appRoute = Router();
    }

    loadRoutes() {
        this.appRoute.use('/users', userRoutes.loadUserRoutes());
        this.appRoute.use('/address', addressRoutes.loadAddressRoutes());
        this.appRoute.use('/images',imageRoutes.loadImageRoutes());
        this.appRoute.use('/products', productRoutes.loadProductRoutes());
        // this.appRoute.use('/categories');
        return this.appRoute;
    }
}

export const appRoutes = new AppRoutes();