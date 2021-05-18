using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(string fullName, string confirmedEmail, string confirmedUrl);
        Task SendForgotEmailAsync(string fullName, string passRecoveryEmail, string passRecoveryUrl);
        Task SendApproveCandidatelAsync(string fullName, string jobTitle, string emailCandidate);
        Task SendRejectCandidatelAsync(string fullName, string jobTitle, string emailCandidate);
    }
}