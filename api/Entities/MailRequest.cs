using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class MailRequest
    {
        public List<MailboxAddress> To { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public IFormFileCollection Attachments { get; set; }

        //[Obsolete]
        //public MailRequest(IEnumerable<string> to, string subject, string body, IFormFileCollection attachments)
        //{
        //    To = new List<MailboxAddress>();

        //    To.AddRange(to.Select(x => new MailboxAddress(x)));
        //    Subject = subject;
        //    Body = body;
        //    Attachments = attachments;
        //}
    }
}
