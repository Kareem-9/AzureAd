namespace WebApiAngularAd.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Identity.Web.Resource;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes" )]
    public class ReportController : ControllerBase
    {
        //Access only by the Manager 
        [Authorize( Roles ="Manager")]
        [HttpGet("[action]")]
        public IActionResult GetReport()
        {
            return File(System.IO.File.ReadAllBytes(@"D:\AzureAD\AzureAd\Payroll_Dec.pdf"), "application/pdf");
        }

        //Any one can be Access 
        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetReportStatus()
        {
            return Ok(new { Status = @"Report Generated at - " + DateTime.Now.ToString("MM-dd-yyyy HH:mm:ss") });
        }
    }
}
