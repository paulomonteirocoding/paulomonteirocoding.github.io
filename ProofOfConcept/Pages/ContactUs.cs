using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProofOfConcept.Pages
{
    public partial class ContactUs
    {

        public string name { get; set; } = string.Empty;
        public string capturedName { get; set; } = string.Empty;

        public void getFormData()
        {
            capturedName = "Hello " + name;
        }

    }
}
