using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetData()
        {
            using (TalentContext db = new TalentContext())
            {
                var data = db.Customer.ToList();
                return Json(data);
            }
        }

        [HttpGet]
        public JsonResult CreateUpdate(Customer customer)
        {
            using (TalentContext db = new TalentContext())
            {
                if (customer.Id == 0)
                {
                    db.Customer.Add(customer);
                    db.SaveChanges();
                }
                else
                {
                    var customerData = db.Customer.Where(x => x.Id == customer.Id).FirstOrDefault();
                    customerData.Name = customer.Name;
                    customerData.Address = customer.Address;
                    db.SaveChanges();
                }
                return Json(new
                {
                    redirectUrl = Url.Action("Index", "Customer"),
                    isRedirect = true
                });
            }

        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (TalentContext db = new TalentContext())
            {
                var customer = db.Customer.Where(x => x.Id == id).FirstOrDefault();
                db.Customer.Remove(customer);
                db.SaveChanges();
            }
            return Json(new
            {
                redirectUrl = Url.Action("Index", "Customer"),
                isRedirect = true
            });
        }
    }
}