/**
 * Send email to list users following
 * @param {Array[]} listUser
 * @param {Object} job
 * @param {Function} sendMailFunc
 * @returns {Boolean}
 */
 const seriesSendMail = async (listUser, job, sendMailFunc) => {
   await Promise.all(listUser.map(el => {
     const title = `${job.company.name} has posted a new job.`;
     const content = `${job.title} \n ${job.description} \n ${job.locations.join('\n')} \n Link: `;
     await sendMailFunc(el.email, title, content);
   }));
};

module.exports = seriesSendMail;
