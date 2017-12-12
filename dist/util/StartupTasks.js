"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
function initialize(context) {
    const parents = config.get('parents');
    const parentsCreated = parents.map((parent) => context.findOrCreateNewParent(parent.email, parent.name));
    return Promise.all(parentsCreated);
}
exports.initialize = initialize;
// export async function testCreateNewChild(context: ChildRepository) {
//   const child = await context.findOrCreate("test@test.com", "23231");
// }
//# sourceMappingURL=StartupTasks.js.map