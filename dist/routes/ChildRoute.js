"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { CertificateSigningRequest} from '../models/CertificateSigningRequest';
/**
 * Route for processing posted certificate signing requests (CSR)
 * @param userContext - the user context of the db
 */
function ChildRoute(deviceContext) {
    const router = express_1.Router({ mergeParams: true });
    /**
     * Route for storing and processing binary/DER formatted CSR files
     * /api/certs/der/new/[CSR_FILENAME]
     */
    router.put('/new', async (req, res) => {
        //const der = await new CertificateSigningRequest(req.body);
        const child = await deviceContext.findOrCreate("test@test.com", "23231");
    });
    return router;
}
exports.default = ChildRoute;
//# sourceMappingURL=ChildRoute.js.map