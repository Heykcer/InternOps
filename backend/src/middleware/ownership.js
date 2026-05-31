const { checkHierarchyAccess } = require('../utils/hierarchy');
function ownership(paramName='id') {
  return async (request, reply, done)=>{
    const target = request.params[paramName] || request.body?.user_id;
    if(!target) return reply.status(400).send({ error:'Missing target' });
    if(request.user.role==='ADMIN') return done();
    const ok = await checkHierarchyAccess(request.user.id, target);
    if(!ok) return reply.status(403).send({ error:'Not in your hierarchy' });
    done();
  };
}
module.exports = ownership;
