const auth = require('../../middleware/auth');
const rbac = require('../../middleware/rbac');
const repo = require('./repository');
const { createAuditLog } = require('../../utils/audit');
async function routes(fastify) {
  fastify.post('/', { preHandler:[auth, rbac('ADMIN')] }, async (req,reply)=>{
    const { name } = req.body;
    if(!name) return reply.status(400).send({ error:'Name required' });
    const dept = await repo.createDepartment(name, req.user.id);
    await createAuditLog({ userId:req.user.id, action:'DEPARTMENT_CREATED', resourceType:'department', resourceId:dept.id });
    return dept;
  });
  fastify.get('/', { preHandler:[auth, rbac('ADMIN','SENIOR_TL')] }, async ()=> repo.getAll());
}
module.exports = routes;
